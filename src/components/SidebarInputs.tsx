/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TeacherInputs } from "../types";
import { 
  School, 
  User, 
  BookOpen, 
  Layers, 
  Clock, 
  FileText, 
  Cpu, 
  Target, 
  CheckSquare, 
  Users2,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface SidebarInputsProps {
  inputs: TeacherInputs;
  onChange: (inputs: TeacherInputs) => void;
  onRegenerate: (section: string) => void;
  isGenerating: boolean;
  activeTab: string;
}

const MODELS_OPTIONS = [
  "Problem Based Learning",
  "Project Based Learning",
  "Discovery Learning",
  "Inquiry Learning",
  "Cooperative Learning",
  "Teaching Factory",
  "Case Method",
  "Contextual Teaching Learning"
];

const INTEGRITY_OPTIONS = [
  { value: "jujur", label: "Jujur" },
  { value: "tanggung jawab", label: "Tanggung Jawab" },
  { value: "disiplin", label: "Disiplin" },
  { value: "mandiri", label: "Mandiri" },
  { value: "peduli", label: "Peduli" },
  { value: "kerja keras", label: "Kerja Keras" },
  { value: "berani", label: "Berani" },
  { value: "sederhana", label: "Sederhana" },
  { value: "adil", label: "Adil" }
];

export default function SidebarInputs({
  inputs,
  onChange,
  onRegenerate,
  isGenerating,
  activeTab
}: SidebarInputsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...inputs,
      [name]: value
    });
  };

  const handleIntegrityChange = (val: string) => {
    const newVals = inputs.nilaiIntegritas.includes(val)
      ? inputs.nilaiIntegritas.filter(v => v !== val)
      : [...inputs.nilaiIntegritas, val];
    onChange({
      ...inputs,
      nilaiIntegritas: newVals
    });
  };

  const getSectionName = () => {
    switch (activeTab) {
      case "rpp": return "Modul Ajar (RPP)";
      case "materi": return "Materi Ajar";
      case "lkpd": return "LKPD Praktikum";
      case "asesmen": return "Asesmen Pembelajaran";
      default: return "Semua Dokumen";
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            SG
          </div>
          <div>
            <h1 className="font-semibold text-white tracking-tight leading-none text-base">SIAP GURU</h1>
            <span className="text-[10px] text-slate-400">Admin Kurikulum SMK</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        <div>
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">IDENTITAS ADMINISTRASI</h2>
          
          {/* Nama Sekolah */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-blue-500" /> Nama Sekolah
            </label>
            <input
              type="text"
              name="namaSekolah"
              value={inputs.namaSekolah}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Nama Guru */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-blue-500" /> Nama Guru
            </label>
            <input
              type="text"
              name="namaGuru"
              value={inputs.namaGuru}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Kelas/Fase */}
            <div className="mb-3">
              <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-500" /> Kelas/Fase
              </label>
              <input
                type="text"
                name="faseKelasSemester"
                value={inputs.faseKelasSemester}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>

            {/* Alokasi Waktu */}
            <div className="mb-3">
              <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" /> Alokasi Waktu
              </label>
              <input
                type="text"
                name="alokasiWaktu"
                value={inputs.alokasiWaktu}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
          </div>

          {/* Mata Pelajaran */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Mata Pelajaran
            </label>
            <input
              type="text"
              name="mataPelajaran"
              value={inputs.mataPelajaran}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">KURIKULUM & MATERI</h2>

          {/* Materi Pokok */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-blue-500" /> Materi Pembelajaran
            </label>
            <input
              type="text"
              name="materiPembelajaran"
              value={inputs.materiPembelajaran}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Topik Pembelajaran */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Topik Praktikum
            </label>
            <input
              type="text"
              name="topikPembelajaran"
              value={inputs.topikPembelajaran}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Tujuan Pembelajaran */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-500" /> Tujuan Pembelajaran
            </label>
            <input
              type="text"
              name="tujuanPembelajaran"
              value={inputs.tujuanPembelajaran}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* Capaian Pembelajaran */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-500" /> Capaian Pembelajaran (CP)
            </label>
            <textarea
              name="capaianPembelajaran"
              value={inputs.capaianPembelajaran}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white leading-relaxed resize-none"
            />
          </div>

          {/* Model Pembelajaran */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Model Pembelajaran
            </label>
            <select
              name="modelPembelajaran"
              value={inputs.modelPembelajaran}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white"
            >
              {MODELS_OPTIONS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">INTEGRASI NILAI KARAKTER</h2>
          
          {/* Nilai Integritas */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-2 font-medium flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-blue-500" /> Nilai Integritas KPK
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded border border-slate-800 max-h-40 overflow-y-auto">
              {INTEGRITY_OPTIONS.map((opt) => {
                const checked = inputs.nilaiIntegritas.includes(opt.value);
                return (
                  <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleIntegrityChange(opt.value)}
                      className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <span className="capitalize">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Karakteristik Murid */}
          <div className="mb-3">
            <label className="block text-slate-400 mb-1 font-medium flex items-center gap-1">
              <Users2 className="w-3.5 h-3.5 text-blue-500" /> Karakteristik Murid (Opsional)
            </label>
            <textarea
              name="karakteristikPesertaDidik"
              value={inputs.karakteristikPesertaDidik}
              onChange={handleInputChange}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white leading-relaxed resize-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <button
          onClick={() => onRegenerate(activeTab)}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg shadow-lg hover:shadow-blue-900/20 active:scale-[0.98] transition-all"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
              <span>Memproses AI...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Regenerasi {getSectionName()}</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-slate-500 text-center mt-2 leading-normal">
          Menggunakan AI Gemini 3.5 Flash untuk menyusun administrasi terintegrasi.
        </p>
      </div>
    </div>
  );
}
