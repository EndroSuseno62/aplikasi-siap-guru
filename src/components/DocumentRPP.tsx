/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { RPPData, TeacherInputs } from "../types";
import { FileText, Copy, Printer, CheckCircle, Sparkles, AlertCircle } from "lucide-react";

interface DocumentRPPProps {
  data: RPPData;
  inputs: TeacherInputs;
}

export default function DocumentRPP({ data, inputs }: DocumentRPPProps) {
  const [viewStyle, setViewStyle] = useState<"interactive" | "official">("interactive");
  const [copied, setCopied] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handleCopyHTML = async () => {
    if (!printAreaRef.current) return;
    try {
      const htmlContent = printAreaRef.current.innerHTML;
      
      // Inject some styles into the copied HTML to ensure borders look perfect in MS Word
      const styledHtml = `
        <html>
          <head>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.15; }
              table { border-collapse: collapse; width: 100%; margin-bottom: 12px; }
              th, td { border: 1px solid black; padding: 6px; text-align: left; vertical-align: top; font-size: 11pt; }
              th { background-color: #f2f2f2; font-weight: bold; }
              .signature-table td { border: none !important; padding: 4px; }
              .section-title { font-weight: bold; background-color: #e6e6e6; padding: 4px; border: 1px solid black; margin-top: 14px; text-transform: uppercase; }
              .no-border-table td { border: none !important; }
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
      console.error("Gagal menyalin HTML ke Clipboard:", err);
      // Fallback
      navigator.clipboard.writeText(printAreaRef.current?.innerText || "");
    }
  };

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    // Create printable window
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>RPP - ${inputs.materiPembelajaran}</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; padding: 20px; line-height: 1.3; }
              table { border-collapse: collapse; width: 100%; margin-top: 10px; margin-bottom: 15px; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; font-size: 11pt; }
              th { background-color: #f2f2f2; }
              .signature-table td { border: none !important; }
              h1, h2, h3 { text-align: center; margin: 5px 0; }
              .section-title { font-weight: bold; background-color: #e6e6e6; padding: 6px; border: 1px solid black; margin-top: 15px; text-transform: uppercase; font-size: 11pt; }
              .no-border-table td { border: none !important; }
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
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
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-700 text-sm">Modul Ajar (RPP)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggles */}
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

          {/* Action Buttons */}
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
            <span>Cetak RPP</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
        {viewStyle === "interactive" ? (
          /* INTERACTIVE DASHBOARD VIEW */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-blue-400 font-bold tracking-widest text-[10px] uppercase mb-1">
                RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
                {inputs.materiPembelajaran}
              </h2>
              <p className="text-slate-300 text-xs font-light max-w-2xl leading-relaxed">
                Dirancang khusus untuk {inputs.namaSekolah} oleh guru {inputs.namaGuru}. Mengintegrasikan penguatan karakter nilai integritas KPK dan kurikulum berorientasi pembelajaran mendalam.
              </p>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="block text-blue-400/80 font-medium">MATA PELAJARAN</span>
                  <span className="font-semibold text-white">{inputs.mataPelajaran}</span>
                </div>
                <div>
                  <span className="block text-blue-400/80 font-medium">FASE/KELAS/SMT</span>
                  <span className="font-semibold text-white">{inputs.faseKelasSemester}</span>
                </div>
                <div>
                  <span className="block text-blue-400/80 font-medium">ALOKASI WAKTU</span>
                  <span className="font-semibold text-white">{inputs.alokasiWaktu}</span>
                </div>
                <div>
                  <span className="block text-blue-400/80 font-medium">MODEL BELAJAR</span>
                  <span className="font-semibold text-white">{inputs.modelPembelajaran}</span>
                </div>
              </div>
            </div>

            {/* Section: IDENTIFIKASI */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">I. Identifikasi Pembelajaran</h3>
              </div>
              <div className="p-5 space-y-4 text-xs leading-relaxed text-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block font-bold text-slate-800 mb-1 text-[11px]">Karakteristik Peserta Didik</span>
                    <p>{data.identifikasi.pesertaDidik}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block font-bold text-slate-800 mb-1 text-[11px]">Latar Belakang & Lintas Disiplin</span>
                    <p>{data.identifikasi.lintasDisiplinIlmu}</p>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-1.5 mb-1.5 text-blue-800 font-bold text-[11px]">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>DPL (Dimensi Profil Lulusan) Terpilih</span>
                  </div>
                  <span className="font-bold text-slate-800 block mb-1">{data.identifikasi.dimensiProfilLulusan.dpl}</span>
                  <p className="text-slate-700">{data.identifikasi.dimensiProfilLulusan.alasan}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">Capaian Pembelajaran (CP)</span>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1 leading-relaxed">
                      {data.identifikasi.capaianPembelajaran}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">Tujuan Pembelajaran (Format ABCD + Integritas)</span>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1 leading-relaxed font-medium text-slate-800 border-l-4 border-l-blue-600">
                      {data.identifikasi.tujuanPembelajaran}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: DESAIN PEMBELAJARAN */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">II. Desain Pembelajaran</h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-600">
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">Topik Pembelajaran</span>
                    <p className="bg-slate-50 p-2.5 rounded border border-slate-100 mt-1">{data.desainPembelajaran.topikPembelajaran}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">Praktik Pedagogis (Model Belajar)</span>
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-100 mt-1 space-y-1">
                      <span className="font-bold text-blue-700">{data.desainPembelajaran.praktikPedagogis.model}</span>
                      <p className="text-slate-600">{data.desainPembelajaran.praktikPedagogis.alasan}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">Kemitraan Jaringan / Industri</span>
                    <p className="bg-slate-50 p-2.5 rounded border border-slate-100 mt-1">{data.desainPembelajaran.kemitraanPembelajaran}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">Pemanfaatan Digital & Lingkungan</span>
                    <p className="bg-slate-50 p-2.5 rounded border border-slate-100 mt-1">
                      <strong>Lingkungan:</strong> {data.desainPembelajaran.lingkunganPembelajaran}<br />
                      <strong>Aplikasi:</strong> {data.desainPembelajaran.pemanfaatanDigital}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: PENGALAMAN BELAJAR */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-blue-600 rounded" />
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">III. Pengalaman Belajar Mendalam</h3>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full uppercase">
                  Berkesadaran, Bermakna, Menggembirakan
                </span>
              </div>
              <div className="p-5 space-y-6">
                {data.pengalamanBelajar.map((p, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-sm text-slate-800">Pertemuan Ke-{p.pertemuanKe} ({p.alokasiWaktu})</span>
                    </div>

                    <div className="space-y-4">
                      {p.kegiatan.map((k, kIdx) => (
                        <div key={kIdx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all space-y-2 text-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                            <span className="font-bold text-slate-800">{k.tahap}</span>
                            <div className="flex gap-1.5">
                              <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 font-medium rounded text-[10px] capitalize">
                                {k.nilaiIntegritas.split(":")[0] || "Integritas"}
                              </span>
                              <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 font-medium rounded text-[10px]">
                                {k.prinsipDeepLearning.includes("Mindful") ? "Mindful" : k.prinsipDeepLearning.includes("Meaningful") ? "Meaningful" : "Joyful"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-slate-600 leading-relaxed">
                            <div>
                              <strong className="text-[10px] text-slate-400 block mb-0.5">AKTIVITAS GURU</strong>
                              <p className="text-slate-700">{k.aktivitasGuru}</p>
                            </div>
                            <div>
                              <strong className="text-[10px] text-slate-400 block mb-0.5">AKTIVITAS SISWA</strong>
                              <p className="text-slate-700">{k.aktivitasSiswa}</p>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t border-dashed border-slate-100 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                            <div>
                              <strong className="text-slate-700 font-semibold">Aksi Integritas:</strong> {k.nilaiIntegritas}
                            </div>
                            <div>
                              <strong className="text-slate-700 font-semibold">Filosofi Belajar:</strong> {k.prinsipDeepLearning}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: ASESMEN */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">IV. Asesmen Pembelajaran</h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-600">
                <div className="bg-blue-50/30 p-3.5 rounded-lg border border-blue-100/50">
                  <span className="block font-bold text-blue-950 mb-1 text-[11px]">Assessment AS Learning (Awal)</span>
                  <p className="text-blue-900/90">{data.asesmenPembelajaran.asesmenAwal}</p>
                </div>
                <div className="bg-blue-50/30 p-3.5 rounded-lg border border-blue-100/50">
                  <span className="block font-bold text-blue-950 mb-1 text-[11px]">Assessment FOR Learning (Proses)</span>
                  <p className="text-blue-900/90">{data.asesmenPembelajaran.asesmenProses}</p>
                </div>
                <div className="bg-blue-50/30 p-3.5 rounded-lg border border-blue-100/50">
                  <span className="block font-bold text-blue-950 mb-1 text-[11px]">Assessment OF Learning (Akhir)</span>
                  <p className="text-blue-900/90">{data.asesmenPembelajaran.asesmenAkhir}</p>
                </div>
              </div>
            </div>

            {/* Section: RUBRIK PENILAIAN */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">V. Lampiran Rubrik Penilaian (Skala 1-4)</h3>
              </div>
              <div className="p-5 space-y-4">
                {Object.entries(data.lampiran).map(([key, rubrik]) => {
                  const title = key === "rubrikAwal" ? "Rubrik Asesmen Awal" :
                                key === "rubrikObservasi" ? "Rubrik Observasi Sikap & Integritas" :
                                key === "rubrikKinerja" ? "Rubrik Kinerja Praktik VoIP" :
                                key === "rubrikTesTulis" ? "Rubrik Tes Tulis Pengetahuan" : "Rubrik Diskusi Kelompok";
                  return (
                    <div key={key} className="space-y-2 text-xs">
                      <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">{title}</span>
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="min-w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                              <th className="p-2.5 w-1/4">Kriteria Penilaian</th>
                              <th className="p-2.5">Skor 4 (Sangat Baik)</th>
                              <th className="p-2.5">Skor 3 (Baik)</th>
                              <th className="p-2.5">Skor 2 (Cukup)</th>
                              <th className="p-2.5">Skor 1 (Perlu Bimbingan)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 text-slate-600 leading-normal">
                            {rubrik.map((row: any, rIdx: number) => (
                              <tr key={rIdx} className="hover:bg-slate-50/50">
                                <td className="p-2.5 font-bold text-slate-800">{row.kriteria}</td>
                                <td className="p-2.5 text-blue-800 bg-blue-50/10">{row.skor4}</td>
                                <td className="p-2.5">{row.skor3}</td>
                                <td className="p-2.5">{row.skor2}</td>
                                <td className="p-2.5 text-rose-800 bg-rose-50/10">{row.skor1}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* WORD / OFFICIAL PRINT VIEW */
          <div className="max-w-4xl mx-auto bg-white p-12 border border-slate-300 shadow-lg min-h-[11in] text-black">
            <div ref={printAreaRef} id="official-rpp-print-area" className="rpp-word-document font-serif" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: "12pt", lineHeight: "1.2 text-black" }}>
              
              {/* Kop Administrasi */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "14pt", fontWeight: "bold" }}>RENCANA PELAKSANAAN PEMBELAJARAN (RPP) / MODUL AJAR</h3>
                <h4 style={{ margin: "0 0 2px 0", fontSize: "12pt", fontWeight: "bold" }}>{inputs.namaSekolah.toUpperCase()}</h4>
                <p style={{ margin: "0", fontSize: "10pt", fontStyle: "italic" }}>Jl. Terusan, Kota Tegal, Jawa Tengah. Administrasi Kurikulum SMK Pusat Keunggulan</p>
                <hr style={{ border: "0", borderTop: "2px double black", margin: "10px 0" }} />
              </div>

              {/* Tabel Identitas */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "15px" }} className="no-border-table">
                <tbody>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ width: "20%", padding: "2px 0" }}><strong>Sekolah</strong></td>
                    <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                    <td style={{ width: "32%", padding: "2px 0" }}>{inputs.namaSekolah}</td>
                    <td style={{ width: "20%", padding: "2px 0" }}><strong>Kelas/Semester</strong></td>
                    <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                    <td style={{ width: "22%", padding: "2px 0" }}>{inputs.faseKelasSemester}</td>
                  </tr>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ padding: "2px 0" }}><strong>Guru Pengampu</strong></td>
                    <td>:</td>
                    <td>{inputs.namaGuru}</td>
                    <td style={{ padding: "2px 0" }}><strong>Alokasi Waktu</strong></td>
                    <td>:</td>
                    <td>{inputs.alokasiWaktu}</td>
                  </tr>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ padding: "2px 0" }}><strong>Mata Pelajaran</strong></td>
                    <td>:</td>
                    <td>{inputs.mataPelajaran}</td>
                    <td style={{ padding: "2px 0" }}><strong>Model Belajar</strong></td>
                    <td>:</td>
                    <td>{inputs.modelPembelajaran}</td>
                  </tr>
                </tbody>
              </table>

              {/* RPP Bagian I: IDENTIFIKASI */}
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#e6e6e6", padding: "4px 8px", border: "1px solid black", marginTop: "14px", textTransform: "uppercase", fontSize: "11pt" }}>
                I. IDENTIFIKASI PEMBELAJARAN
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "5px", marginBottom: "15px" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "30%", border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Sasaran Peserta Didik</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{data.identifikasi.pesertaDidik}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Capaian Pembelajaran (CP)</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{data.identifikasi.capaianPembelajaran}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Dimensi Profil Lulusan (DPL)</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>
                      <strong>{data.identifikasi.dimensiProfilLulusan.dpl}</strong><br />
                      <em>Alasan:</em> {data.identifikasi.dimensiProfilLulusan.alasan}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Lintas Disiplin Ilmu</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{data.identifikasi.lintasDisiplinIlmu}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Tujuan Pembelajaran (ABCD)</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{data.identifikasi.tujuanPembelajaran}</td>
                  </tr>
                </tbody>
              </table>

              {/* RPP Bagian II: DESAIN */}
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#e6e6e6", padding: "4px 8px", border: "1px solid black", marginTop: "14px", textTransform: "uppercase", fontSize: "11pt" }}>
                II. DESAIN PEMBELAJARAN
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "5px", marginBottom: "15px" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "30%", border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Topik Pembelajaran</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{data.desainPembelajaran.topikPembelajaran}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Praktik Pedagogis (Model)</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>
                      <strong>{data.desainPembelajaran.praktikPedagogis.model}</strong><br />
                      <em>Justifikasi:</em> {data.desainPembelajaran.praktikPedagogis.alasan}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Kemitraan Dunia Kerja</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{data.desainPembelajaran.kemitraanPembelajaran}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}><strong>Lingkungan Belajar & Digital</strong></td>
                    <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>
                      <strong>Fasilitas:</strong> {data.desainPembelajaran.lingkunganPembelajaran}<br />
                      <strong>Media Digital:</strong> {data.desainPembelajaran.pemanfaatanDigital}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* RPP Bagian III: PENGALAMAN BELAJAR */}
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#e6e6e6", padding: "4px 8px", border: "1px solid black", marginTop: "14px", textTransform: "uppercase", fontSize: "11pt" }}>
                III. PENGALAMAN BELAJAR MENDALAM (DEEP LEARNING)
              </div>
              {data.pengalamanBelajar.map((p, pIdx) => (
                <div key={pIdx} style={{ marginTop: "8px" }}>
                  <div style={{ fontSize: "11pt", fontWeight: "bold", marginBottom: "4px" }}>Pertemuan Ke-{p.pertemuanKe} ({p.alokasiWaktu})</div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f2f2f2", fontSize: "10pt" }}>
                        <th style={{ border: "1px solid black", padding: "5px", width: "15%" }}>Tahap Kegiatan</th>
                        <th style={{ border: "1px solid black", padding: "5px", width: "30%" }}>Aktivitas Guru</th>
                        <th style={{ border: "1px solid black", padding: "5px", width: "30%" }}>Aktivitas Peserta Didik</th>
                        <th style={{ border: "1px solid black", padding: "5px", width: "12%" }}>Nilai Integritas</th>
                        <th style={{ border: "1px solid black", padding: "5px", width: "13%" }}>Prinsip Deep Learning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.kegiatan.map((k, kIdx) => (
                        <tr key={kIdx} style={{ fontSize: "10pt" }}>
                          <td style={{ border: "1px solid black", padding: "5px", fontWeight: "bold" }}>{k.tahap}</td>
                          <td style={{ border: "1px solid black", padding: "5px" }}>{k.aktivitasGuru}</td>
                          <td style={{ border: "1px solid black", padding: "5px" }}>{k.aktivitasSiswa}</td>
                          <td style={{ border: "1px solid black", padding: "5px" }}>{k.nilaiIntegritas}</td>
                          <td style={{ border: "1px solid black", padding: "5px" }}>{k.prinsipDeepLearning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

              {/* RPP Bagian IV: ASESMEN */}
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#e6e6e6", padding: "4px 8px", border: "1px solid black", marginTop: "14px", textTransform: "uppercase", fontSize: "11pt" }}>
                IV. ASESMEN PEMBELAJARAN (ASSESSMENT AS, FOR, OF LEARNING)
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "5px", marginBottom: "15px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2", fontSize: "11pt" }}>
                    <th style={{ border: "1px solid black", padding: "6px", width: "33%" }}>Assessment As Learning (Awal)</th>
                    <th style={{ border: "1px solid black", padding: "6px", width: "33%" }}>Assessment For Learning (Proses)</th>
                    <th style={{ border: "1px solid black", padding: "6px", width: "34%" }}>Assessment Of Learning (Akhir)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ border: "1px solid black", padding: "6px" }}>{data.asesmenPembelajaran.asesmenAwal}</td>
                    <td style={{ border: "1px solid black", padding: "6px" }}>{data.asesmenPembelajaran.asesmenProses}</td>
                    <td style={{ border: "1px solid black", padding: "6px" }}>{data.asesmenPembelajaran.asesmenAkhir}</td>
                  </tr>
                </tbody>
              </table>

              {/* RPP Bagian V: LAMPIRAN RUBRIK */}
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#e6e6e6", padding: "4px 8px", border: "1px solid black", marginTop: "14px", textTransform: "uppercase", fontSize: "11pt" }}>
                V. LAMPIRAN RUBRIK PENILAIAN (SKALA 1-4)
              </div>
              
              {/* Loop lampiran */}
              {Object.entries(data.lampiran).map(([key, rubrik]) => {
                const title = key === "rubrikAwal" ? "Rubrik Asesmen Awal (Kesiapan Belajar)" :
                              key === "rubrikObservasi" ? "Rubrik Observasi Sikap & Integritas Siswa" :
                              key === "rubrikKinerja" ? "Rubrik Kinerja Praktikum VoIP" :
                              key === "rubrikTesTulis" ? "Rubrik Kriteria Pengetahuan / Tes Tulis" : "Rubrik Penilaian Diskusi Kelompok";
                return (
                  <div key={key} style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "10.5pt", fontWeight: "bold", marginBottom: "4px" }}>{title.toUpperCase()}</div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f2f2f2", fontSize: "10pt" }}>
                          <th style={{ border: "1px solid black", padding: "5px", width: "20%" }}>Kriteria</th>
                          <th style={{ border: "1px solid black", padding: "5px" }}>Skor 4 (Sangat Baik)</th>
                          <th style={{ border: "1px solid black", padding: "5px" }}>Skor 3 (Baik)</th>
                          <th style={{ border: "1px solid black", padding: "5px" }}>Skor 2 (Cukup)</th>
                          <th style={{ border: "1px solid black", padding: "5px" }}>Skor 1 (Perlu Bimbingan)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rubrik.map((row: any, rIdx: number) => (
                          <tr key={rIdx} style={{ fontSize: "9.5pt" }}>
                            <td style={{ border: "1px solid black", padding: "5px", fontWeight: "bold" }}>{row.kriteria}</td>
                            <td style={{ border: "1px solid black", padding: "5px" }}>{row.skor4}</td>
                            <td style={{ border: "1px solid black", padding: "5px" }}>{row.skor3}</td>
                            <td style={{ border: "1px solid black", padding: "5px" }}>{row.skor2}</td>
                            <td style={{ border: "1px solid black", padding: "5px" }}>{row.skor1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}

              {/* Tanda Tangan Halaman Pengesahan (Borderless Table) */}
              <div style={{ marginTop: "50px", pageBreakInside: "avoid" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "none" }} className="signature-table">
                  <tbody>
                    <tr style={{ border: "none" }}>
                      <td style={{ width: "50%", border: "none", padding: "0", fontSize: "11pt", verticalAlign: "top" }}>
                        Mengetahui,<br />
                        Ketua Program Keahlian TKJ
                        <br /><br /><br /><br /><br />
                        <span style={{ textDecoration: "underline", fontWeight: "bold" }}>Drs. H. Mulyono, M.T.</span><br />
                        NIP. 19710815 199803 1 004
                      </td>
                      <td style={{ width: "50%", border: "none", padding: "0", fontSize: "11pt", verticalAlign: "top" }}>
                        Tegal, 28 Juni 2026<br />
                        Guru Mata Pelajaran
                        <br /><br /><br /><br /><br />
                        <span style={{ textDecoration: "underline", fontWeight: "bold" }}>{inputs.namaGuru}</span><br />
                        NIP. 19820420 200902 1 002
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
