/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { LKPDData, TeacherInputs } from "../types";
import { Copy, Printer, CheckCircle, HelpCircle, ClipboardCheck, Network, CheckSquare } from "lucide-react";

interface DocumentLKPDProps {
  data: LKPDData;
  inputs: TeacherInputs;
}

export default function DocumentLKPD({ data, inputs }: DocumentLKPDProps) {
  const [viewStyle, setViewStyle] = useState<"interactive" | "official">("interactive");
  const [copied, setCopied] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const printAreaRef = useRef<HTMLDivElement>(null);

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyHTML = async () => {
    if (!printAreaRef.current) return;
    try {
      const htmlContent = printAreaRef.current.innerHTML;
      const styledHtml = `
        <html>
          <head>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.15; color: black; }
              .lkpd-header { border: 2px solid black; padding: 12px; margin-bottom: 20px; }
              .lkpd-title { text-align: center; font-weight: bold; font-size: 14pt; margin-top: 5px; margin-bottom: 10px; }
              .section-heading { font-weight: bold; background-color: #f2f2f2; padding: 4px; border: 1px solid black; margin-top: 15px; margin-bottom: 8px; font-size: 11pt; text-transform: uppercase; }
              .step-table { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .step-table td, .step-table th { border: 1px solid black; padding: 6px; font-size: 11pt; vertical-align: top; }
              .hots-card { border: 1px solid black; padding: 10px; background-color: #fcfcfc; margin-top: 10px; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
      const blob = new Blob([styledHtml], { type: "text/html" });
      const plainBlob = new Blob([printAreaRef.current.innerText], { type: "text/plain" });

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": plainBlob
        })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
      navigator.clipboard.writeText(printAreaRef.current?.innerText || "");
    }
  };

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>LKPD - ${inputs.materiPembelajaran}</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; padding: 25px; line-height: 1.3; color: black; }
              .lkpd-header { border: 2px solid black; padding: 12px; margin-bottom: 20px; }
              .lkpd-title { text-align: center; font-weight: bold; font-size: 14pt; }
              .section-heading { font-weight: bold; background-color: #f2f2f2; padding: 4px; border: 1px solid black; margin-top: 15px; margin-bottom: 8px; text-transform: uppercase; }
              .step-table { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .step-table td, .step-table th { border: 1px solid black; padding: 6px; }
              .hots-card { border: 1px solid black; padding: 10px; background-color: #fcfcfc; margin: 10px 0; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* Header Toolbar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <ClipboardCheck className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-700 text-sm">LKPD Praktikum Terinci</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-0.5 rounded-lg flex text-xs">
            <button
              onClick={() => setViewStyle("interactive")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                viewStyle === "interactive"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Interactive UI
            </button>
            <button
              onClick={() => setViewStyle("official")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                viewStyle === "official"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Word / Print Layout
            </button>
          </div>

          <button
            onClick={handleCopyHTML}
            className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-xs px-3 py-1.5 rounded-lg border border-blue-200 active:scale-[0.98] transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin ke Word</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-xs px-3 py-1.5 rounded-lg border border-slate-200 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak LKPD</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
        {viewStyle === "interactive" ? (
          /* INTERACTIVE DASHBOARD VIEW */
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header / Intro Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
              <div className="text-blue-400 font-bold tracking-widest text-[10px] uppercase mb-1">
                LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
                Praktikum Jaringan: {inputs.materiPembelajaran}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-[11px] font-medium">
                <div>
                  <span className="block text-blue-400/80">SEKOLAH:</span>
                  <span className="text-white">{inputs.namaSekolah}</span>
                </div>
                <div>
                  <span className="block text-blue-400/80">MAPEL:</span>
                  <span className="text-white">{inputs.mataPelajaran}</span>
                </div>
                <div>
                  <span className="block text-blue-400/80">FASE/KELAS/SMT:</span>
                  <span className="text-white">{inputs.faseKelasSemester}</span>
                </div>
                <div>
                  <span className="block text-blue-400/80">ALOKASI WAKTU:</span>
                  <span className="text-white">{data.identitas.alokasiWaktu || inputs.alokasiWaktu}</span>
                </div>
              </div>
            </div>

            {/* Skenario Dunia Nyata / Case Study */}
            <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-16 h-16 bg-blue-500/5 rounded-full pointer-events-none" />
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <Network className="w-5 h-5 text-blue-600" />
                <span>STUDI KASUS DUNIA KERJA (SOP INDUSTRI)</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed leading-normal bg-blue-50/30 p-3 rounded-lg border border-blue-100/30">
                {data.skenarioDuniaNyata}
              </p>
              
              {/* Petunjuk Belajar */}
              <div className="space-y-1.5 pt-1 text-xs">
                <span className="font-bold text-slate-800 block">Petunjuk Belajar Siswa:</span>
                <ul className="list-decimal list-inside pl-1 space-y-1 text-slate-600 leading-normal">
                  {data.petunjukBelajar.map((petunjuk, pIdx) => (
                    <li key={pIdx}>{petunjuk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Network Topology Visualizer (Custom SVG Diagram) */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-xs space-y-3">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">Skema Topologi Jaringan Cisco Packet Tracer</span>
              
              <div className="bg-slate-900 rounded-lg p-6 flex flex-col items-center justify-center border border-slate-800 text-white relative overflow-hidden">
                <div className="absolute top-2 left-3 font-mono text-[9px] text-slate-500">CISCO PACKET TRACER SIMULATOR</div>
                
                {/* SVG Network Drawing */}
                <svg viewBox="0 0 500 200" className="w-full max-w-md h-auto">
                  {/* Connecting lines */}
                  <line x1="250" y1="50" x2="250" y2="110" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="250" y1="110" x2="130" y2="150" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="250" y1="110" x2="370" y2="150" stroke="#3b82f6" strokeWidth="2.5" />

                  {/* Router */}
                  <circle cx="250" cy="50" r="22" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                  <text x="250" y="54" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">Fa0/0</text>
                  <text x="250" y="22" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Router 2811 (Gateway)</text>
                  <text x="250" y="80" fill="#a7f3d0" fontSize="8" textAnchor="middle">IP: 192.168.10.1</text>

                  {/* Switch */}
                  <rect x="225" y="100" width="50" height="20" rx="3" fill="#334155" stroke="#64748b" strokeWidth="2" />
                  <text x="250" y="113" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">SWITCH</text>
                  <text x="250" y="132" fill="#cbd5e1" fontSize="8" textAnchor="middle">VLAN 10 Voice</text>

                  {/* IP Phone 1 */}
                  <g>
                    <rect x="100" y="140" width="60" height="30" rx="3" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="130" y="152" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">IP Phone 1</text>
                    <text x="130" y="164" fill="#a7f3d0" fontSize="8" textAnchor="middle">Ext: 101/1001</text>
                  </g>

                  {/* IP Phone 2 */}
                  <g>
                    <rect x="340" y="140" width="60" height="30" rx="3" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="370" y="152" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">IP Phone 2</text>
                    <text x="370" y="164" fill="#a7f3d0" fontSize="8" textAnchor="middle">Ext: 102/1002</text>
                  </g>
                </svg>

                <div className="flex gap-4 mt-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" /> Status: Port Active Fa0/0.10</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" /> Protokol VoIP: SCCP (Cisco)</span>
                </div>
              </div>
            </div>

            {/* Interactive Progress Checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-blue-600 rounded" />
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Aktivitas Praktikum (Checklist Langkah Kerja)</h3>
                </div>
                <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  Klik kotak jika langkah selesai
                </span>
              </div>
              <div className="p-5 space-y-4">
                {data.langkahKerja.map((l, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border transition-all ${
                    checkedSteps[idx] 
                      ? "bg-slate-50 border-slate-200 opacity-65" 
                      : "bg-blue-50/10 border-blue-100 hover:border-blue-200"
                  }`}>
                    <div className="flex items-start gap-3">
                      <button 
                        onClick={() => toggleStep(idx)}
                        className="mt-0.5 text-blue-600 hover:text-blue-700 cursor-pointer shrink-0"
                      >
                        <CheckSquare className={`w-5 h-5 ${checkedSteps[idx] ? "fill-blue-600 text-white" : ""}`} />
                      </button>
                      <div className="flex-1 text-xs leading-relaxed space-y-1.5">
                        <strong className={`text-sm ${checkedSteps[idx] ? "line-through text-slate-500" : "text-slate-800"}`}>
                          {l.langkah}
                        </strong>
                        <p className={`${checkedSteps[idx] ? "text-slate-400" : "text-slate-600"}`}>
                          {l.detail}
                        </p>
                        
                        {l.visualHint && (
                          <div className="text-[11px] text-slate-500 italic flex items-center gap-1 bg-white p-2 rounded border border-slate-100 mt-1">
                            <span>💡 <strong>Visual:</strong> {l.visualHint}</span>
                          </div>
                        )}

                        {l.fokusIntegritas && (
                          <div className="text-[11px] text-blue-800 font-medium bg-blue-50 p-2 rounded border border-blue-100/60 mt-1">
                            <span>🛡️ <strong>Integritas:</strong> {l.fokusIntegritas}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pertanyaan HOTS Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Tantangan Berpikir Kritis (Soal HOTS)</h3>
              </div>
              <div className="p-5 space-y-4">
                {data.pertanyaanHots.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs leading-relaxed">
                    <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                      <HelpCircle className="w-4 h-4 text-rose-500" />
                      <span>Masalah Analitis #{q.nomor}</span>
                    </div>
                    <div className="bg-rose-50 border border-rose-100 rounded p-2.5 text-[11px] text-rose-950 font-medium">
                      <strong>Skenario Kasus:</strong> {q.skenarioKasus}
                    </div>
                    <p className="font-semibold text-slate-800 text-xs">
                      {q.soal}
                    </p>
                    <div className="text-[11px] text-slate-500">
                      <strong>Petunjuk Analisis:</strong> {q.petunjukAnalisis}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Refleksi Nilai Integritas */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Refleksi Integritas & Karakter Siswa</h3>
              </div>
              <div className="p-5 space-y-4 text-xs leading-relaxed text-slate-600">
                {data.refleksiIntegritas.map((r, idx) => (
                  <div key={idx} className="bg-blue-50/20 border border-blue-100 rounded-lg p-4 space-y-1.5">
                    <strong className="text-blue-950 font-bold block">{r.pertanyaan}</strong>
                    <p className="text-slate-600 italic">
                      <strong>Harapan Penerapan Nyata:</strong> {r.penjelasanPenerapan}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* WORD / OFFICIAL PRINT VIEW */
          <div className="max-w-4xl mx-auto bg-white p-12 border border-slate-300 shadow-lg min-h-[11in] text-black">
            <div ref={printAreaRef} className="lkpd-word-document font-serif" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: "12pt", lineHeight: "1.3", color: "black" }}>
              
              {/* Kop RPP/LKPD */}
              <div className="lkpd-header" style={{ border: "2px solid black", padding: "12px", marginBottom: "20px" }}>
                <div className="lkpd-title" style={{ textAlign: "center", fontWeight: "bold", fontSize: "14pt" }}>
                  LEMBAR KERJA PESERTA DIDIK (LKPD) PRAKTIKUM VOIP
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "none", marginTop: "10px" }} className="no-border-table">
                  <tbody>
                    <tr style={{ fontSize: "11pt" }}>
                      <td style={{ width: "20%", padding: "2px 0" }}><strong>Sekolah</strong></td>
                      <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                      <td style={{ width: "32%", padding: "2px 0" }}>{inputs.namaSekolah}</td>
                      <td style={{ width: "20%", padding: "2px 0" }}><strong>Nama Siswa</strong></td>
                      <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                      <td style={{ width: "22%", padding: "2px 0" }}>..................................</td>
                    </tr>
                    <tr style={{ fontSize: "11pt" }}>
                      <td style={{ padding: "2px 0" }}><strong>Mata Pelajaran</strong></td>
                      <td>:</td>
                      <td>{inputs.mataPelajaran}</td>
                      <td style={{ padding: "2px 0" }}><strong>Kelas/Semester</strong></td>
                      <td>:</td>
                      <td>{inputs.faseKelasSemester}</td>
                    </tr>
                    <tr style={{ fontSize: "11pt" }}>
                      <td style={{ padding: "2px 0" }}><strong>Materi Pembelajaran</strong></td>
                      <td>:</td>
                      <td>{inputs.materiPembelajaran}</td>
                      <td style={{ padding: "2px 0" }}><strong>Alokasi Waktu</strong></td>
                      <td>:</td>
                      <td>{data.identitas.alokasiWaktu || "4 JP @ 45 menit"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Petunjuk Belajar */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                I. PETUNJUK BELAJAR SISWA
              </div>
              <ul style={{ paddingLeft: "20px", marginBottom: "15px", fontSize: "11pt" }}>
                {data.petunjukBelajar.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>{item}</li>
                ))}
              </ul>

              {/* Skenario Kasus */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                II. SKENARIO INDUSTRI & STUDI KASUS DUNIA KERJA
              </div>
              <p style={{ textAlign: "justify", textIndent: "0.5in", fontSize: "11pt", marginBottom: "12px" }}>
                {data.skenarioDuniaNyata}
              </p>

              {/* Tujuan */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                III. TUJUAN PRAKTIKUM
              </div>
              <p style={{ fontSize: "11pt", marginBottom: "12px" }}>{data.tujuanPraktikum}</p>

              {/* Alat & Bahan */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                IV. DAFTAR ALAT DAN BAHAN
              </div>
              <ul style={{ paddingLeft: "20px", marginBottom: "15px", fontSize: "11pt" }}>
                {data.alatBahan.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "3px" }}>{item}</li>
                ))}
              </ul>

              {/* Langkah Kerja */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                V. DETAIL LANGKAH KERJA PRAKTIKUM
              </div>
              <table className="step-table" style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2", fontSize: "10pt" }}>
                    <th style={{ border: "1px solid black", padding: "6px", width: "25%" }}>Langkah Kerja</th>
                    <th style={{ border: "1px solid black", padding: "6px", width: "45%" }}>Instruksi Detail & CLI Cisco</th>
                    <th style={{ border: "1px solid black", padding: "6px", width: "30%" }}>Fokus Sikap & Integritas Nyata</th>
                  </tr>
                </thead>
                <tbody>
                  {data.langkahKerja.map((l, idx) => (
                    <tr key={idx} style={{ fontSize: "10pt" }}>
                      <td style={{ border: "1px solid black", padding: "6px", fontWeight: "bold" }}>{l.langkah}</td>
                      <td style={{ border: "1px solid black", padding: "6px" }}>
                        {l.detail}
                        {l.visualHint && (
                          <div style={{ marginTop: "4px", fontSize: "9pt", fontStyle: "italic", color: "#444" }}>
                            * {l.visualHint}
                          </div>
                        )}
                      </td>
                      <td style={{ border: "1px solid black", padding: "6px" }}>{l.fokusIntegritas || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* HOTS */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                VI. PERTANYAAN ANALISIS JARINGAN (HOTS)
              </div>
              {data.pertanyaanHots.map((q, idx) => (
                <div key={idx} className="hots-card" style={{ border: "1px solid black", padding: "10px", backgroundColor: "#fcfcfc", marginTop: "10px", marginBottom: "10px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "11pt", marginBottom: "4px" }}>Masalah #{q.nomor}: {q.skenarioKasus}</div>
                  <p style={{ fontSize: "11pt", margin: "0 0 8px 0" }}><strong>Pertanyaan:</strong> {q.soal}</p>
                  <p style={{ fontSize: "10pt", fontStyle: "italic", margin: "0" }}><strong>Petunjuk Analisis:</strong> {q.petunjukAnalisis}</p>
                </div>
              ))}

              {/* Refleksi */}
              <div className="section-heading" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                VII. REFLEKSI SIKAP DAN NILAI INTEGRITAS
              </div>
              {data.refleksiIntegritas.map((r, idx) => (
                <div key={idx} style={{ marginTop: "8px", marginBottom: "8px", fontSize: "11pt" }}>
                  <p style={{ margin: "0 0 2px 0" }}><strong>{idx + 1}. {r.pertanyaan}</strong></p>
                  <p style={{ margin: "0", fontStyle: "italic", textIndent: "0.2in" }}>Jawab: ........................................................................................................................................................................</p>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
