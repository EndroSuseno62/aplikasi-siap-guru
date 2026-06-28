/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { defaultSIAPGURUData, emptySIAPGURUData, demoVoIPData } from "./data";
import { SIAPGURUData, TeacherInputs } from "./types";
import SidebarInputs from "./components/SidebarInputs";
import AIChatAssistant from "./components/AIChatAssistant";
import DocumentRPP from "./components/DocumentRPP";
import DocumentMateri from "./components/DocumentMateri";
import DocumentLKPD from "./components/DocumentLKPD";
import DocumentAsesmen from "./components/DocumentAsesmen";
import EmptyDocumentState from "./components/EmptyDocumentState";
import { downloadAllDocumentsAsWord } from "./utils/wordExporter";
import { 
  FileText, 
  BookOpen, 
  ClipboardCheck, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Clock,
  Briefcase,
  RotateCcw,
  FileDown
} from "lucide-react";

export default function App() {
  // Main States
  const [data, setData] = useState<SIAPGURUData>(defaultSIAPGURUData);
  const [activeTab, setActiveTab] = useState<"rpp" | "materi" | "lkpd" | "asesmen">("rpp");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Handle Input Changes from Sidebar
  const handleInputsChange = (newInputs: TeacherInputs) => {
    setData(prev => ({
      ...prev,
      inputs: newInputs
    }));
  };

  // Load Demo data
  const handleLoadDemo = () => {
    setData(demoVoIPData);
    setGlobalError(null);
  };

  // Reset all states
  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mengosongkan semua isian dan hasil dokumen untuk memulai administrasi baru?")) {
      setData(emptySIAPGURUData);
      setGlobalError(null);
    }
  };

  // Download all as Word document (.doc)
  const handleDownloadAll = () => {
    try {
      downloadAllDocumentsAsWord(data);
    } catch (err: any) {
      console.error(err);
      setGlobalError("Gagal mengunduh dokumen Word: " + (err.message || String(err)));
    }
  };

  // Main API Call to Regenerate or Polish via AI
  const handleGeneration = async (section: string, customPrompt?: string) => {
    setIsGenerating(true);
    setGlobalError(null);
    try {
      // Collect current section data to provide context to Gemini during edits
      const currentSectionData = data[section as keyof Omit<SIAPGURUData, "inputs">];

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          inputs: data.inputs,
          customPrompt,
          currentData: currentSectionData
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Terjadi kegagalan sewaktu memproses data.");
      }

      // Update state dynamically based on section
      setData(prev => ({
        ...prev,
        [section]: result.data
      }));

    } catch (err: any) {
      console.error(err);
      setGlobalError(err.message || "Gagal menghubungi server AI. Pastikan kunci API Anda terpasang di panel Secrets.");
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  // Triggered by AI Chat Assistant for refinement
  const handleAiRefinement = async (userInstruction: string) => {
    await handleGeneration(activeTab, userInstruction);
  };

  // Triggered by Sidebar for section regeneration
  const handleSectionRegenerate = async (sectionToGenerate: string) => {
    await handleGeneration(sectionToGenerate);
  };

  // Check if everything is empty to disable the Global Download button
  const isAllEmpty = 
    !data.rpp.identifikasi.pesertaDidik && 
    !data.materi.judul && 
    !data.lkpd.tujuanPraktikum && 
    data.asesmen.pilihanGanda.length === 0;

  // Render correct Active Document component
  const renderActiveDocument = () => {
    let isEmpty = false;
    let tabTitle = "";

    switch (activeTab) {
      case "rpp":
        isEmpty = !data.rpp.identifikasi.pesertaDidik || data.rpp.pengalamanBelajar.length === 0;
        tabTitle = "Modul Ajar (RPP)";
        break;
      case "materi":
        isEmpty = !data.materi.judul || !data.materi.ringkasanMateri;
        tabTitle = "Materi Ajar";
        break;
      case "lkpd":
        isEmpty = !data.lkpd.tujuanPraktikum || data.lkpd.langkahKerja.length === 0;
        tabTitle = "LKPD Praktikum";
        break;
      case "asesmen":
        isEmpty = data.asesmen.pilihanGanda.length === 0 && data.asesmen.esai.length === 0;
        tabTitle = "Asesmen";
        break;
    }

    if (isEmpty) {
      return (
        <EmptyDocumentState
          title={tabTitle}
          onLoadDemo={handleLoadDemo}
          isGenerating={isGenerating}
          onGenerate={() => handleGeneration(activeTab)}
        />
      );
    }

    switch (activeTab) {
      case "rpp":
        return <DocumentRPP data={data.rpp} inputs={data.inputs} />;
      case "materi":
        return <DocumentMateri data={data.materi} inputs={data.inputs} />;
      case "lkpd":
        return <DocumentLKPD data={data.lkpd} inputs={data.inputs} />;
      case "asesmen":
        return <DocumentAsesmen data={data.asesmen} inputs={data.inputs} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 font-sans text-slate-800" id="siap-guru-root">
      
      {/* Sidebar - Parameter Inputs */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full shrink-0 relative"
          >
            <SidebarInputs
              inputs={data.inputs}
              onChange={handleInputsChange}
              onRegenerate={handleSectionRegenerate}
              isGenerating={isGenerating}
              activeTab={activeTab}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative">
        
        {/* Top Navbar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 z-10 shrink-0">
          <div className="flex items-center gap-2">
            {/* Toggle Sidebar Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Toggle Form Input"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {/* App Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">SIAP GURU</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-300 font-bold capitalize">{data.inputs.namaSekolah}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-400">{data.inputs.materiPembelajaran}</span>
            </div>
          </div>

          {/* Quick Menu Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 text-xs">
            <button
              onClick={() => setActiveTab("rpp")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === "rpp"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Modul Ajar (RPP)</span>
              <span className="md:hidden">RPP</span>
            </button>

            <button
              onClick={() => setActiveTab("materi")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === "materi"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Materi Ajar</span>
              <span className="md:hidden">Materi</span>
            </button>

            <button
              onClick={() => setActiveTab("lkpd")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === "lkpd"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">LKPD Praktikum</span>
              <span className="md:hidden">LKPD</span>
            </button>

            <button
              onClick={() => setActiveTab("asesmen")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === "asesmen"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Asesmen</span>
              <span className="md:hidden">Asesmen</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 active:scale-[0.98] transition-all cursor-pointer"
              title="Reset Isian dan Dokumen Baru"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Word Download All Button */}
            <button
              onClick={handleDownloadAll}
              disabled={isAllEmpty}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:border-slate-800 disabled:cursor-not-allowed text-white transition-all cursor-pointer shadow-lg hover:shadow-blue-900/20"
              title="Unduh Semua Dokumen Administrasi ke Word (.doc)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh Semua (Word)</span>
              <span className="sm:hidden">Unduh (.doc)</span>
            </button>

            {/* Toggle AI Assistant Drawer */}
            <button
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                aiAssistantOpen
                  ? "bg-blue-950/40 border-blue-800 text-blue-400 shadow-lg"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden lg:inline">Asisten AI</span>
            </button>
          </div>
        </header>

        {/* Global Error Banner */}
        {globalError && (
          <div className="bg-rose-950 border-b border-rose-800 p-3 flex items-center justify-between px-6 z-10 shrink-0 text-xs text-rose-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{globalError}</span>
            </div>
            <button 
              onClick={() => setGlobalError(null)}
              className="font-bold underline hover:text-white cursor-pointer ml-4"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Dynamic Document Showcase */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full"
            >
              {renderActiveDocument()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* AI Assistant Chat Drawer */}
      <AnimatePresence initial={false}>
        {aiAssistantOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 330, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full shrink-0 relative"
          >
            <AIChatAssistant
              onRefine={handleAiRefinement}
              isGenerating={isGenerating}
              activeTab={activeTab}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
