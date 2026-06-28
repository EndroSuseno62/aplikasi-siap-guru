/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { AsesmenData, TeacherInputs } from "../types";
import { Check, Copy, Printer, CheckCircle, Eye, EyeOff, ShieldAlert, Award, FileText } from "lucide-react";

interface DocumentAsesmenProps {
  data: AsesmenData;
  inputs: TeacherInputs;
}

export default function DocumentAsesmen({ data, inputs }: DocumentAsesmenProps) {
  const [viewStyle, setViewStyle] = useState<"interactive" | "official">("interactive");
  const [copied, setCopied] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handleCopyHTML = async () => {
    if (!printAreaRef.current) return;
    try {
      const htmlContent = printAreaRef.current.innerHTML;
      const styledHtml = `
        <html>
          <head>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.15; color: black; }
              .test-title { text-align: center; font-weight: bold; font-size: 13pt; margin-bottom: 20px; }
              .question-block { margin-bottom: 12px; page-break-inside: avoid; }
              .options-list { margin-left: 20px; list-style-type: none; padding-left: 0; }
              .options-list li { margin-bottom: 3px; }
              .key-block { background-color: #f2f2f2; border: 1px solid black; padding: 6px; margin-top: 5px; font-size: 10.5pt; }
              .section-title { font-weight: bold; background-color: #dcdcdc; padding: 4px; border: 1px solid black; margin-top: 15px; margin-bottom: 10px; font-size: 11pt; text-transform: uppercase; }
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
            <title>Asesmen Formatif - ${inputs.materiPembelajaran}</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; padding: 30px; line-height: 1.3; color: black; }
              .test-title { text-align: center; font-weight: bold; font-size: 13pt; margin-bottom: 20px; }
              .question-block { margin-bottom: 15px; page-break-inside: avoid; }
              .options-list { margin-left: 25px; list-style-type: none; padding-left: 0; }
              .key-block { background-color: #f2f2f2; border: 1px solid black; padding: 6px; margin-top: 5px; font-size: 10.5pt; }
              .section-title { font-weight: bold; background-color: #dcdcdc; padding: 4px; border: 1px solid black; margin-top: 15px; margin-bottom: 10px; text-transform: uppercase; }
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
          <Award className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-700 text-sm">Evaluasi & Asesmen</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Show/Hide Keys in interactive */}
          {viewStyle === "interactive" && (
            <button
              onClick={() => setShowKeys(!showKeys)}
              className="flex items-center gap-1.5 bg-white text-slate-700 hover:text-slate-900 font-medium text-xs px-3 py-1.5 rounded-lg border border-slate-200 active:scale-[0.98] transition-all cursor-pointer"
            >
              {showKeys ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sembunyikan Kunci</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tampilkan Kunci Guru</span>
                </>
              )}
            </button>
          )}

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
            <span>Cetak Soal</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
        {viewStyle === "interactive" ? (
          /* INTERACTIVE DASHBOARD VIEW */
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Warning badge if keys are shown */}
            {showKeys && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-lg flex items-center gap-2 text-xs leading-normal">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong>Mode Kunci Jawaban Guru Aktif!</strong> Kunci jawaban dan pembahasan ditunjukkan secara eksplisit di bawah setiap soal. Sembunyikan mode ini jika Anda ingin menampilkan soal di depan LCD proyektor kelas.
                </div>
              </div>
            )}

            {/* Part 1: PILIHAN GANDA (10 Items) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-blue-600 rounded" />
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">BAGIAN A: PILIHAN GANDA (10 BUTIR FORMATIF)</h3>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  Skor Maksimal: 100
                </span>
              </div>
              <div className="p-5 space-y-5 text-xs sm:text-sm">
                {data.pilihanGanda.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl border border-slate-100 hover:border-blue-100 transition-all space-y-3">
                    <div className="font-semibold text-slate-800 flex gap-2">
                      <span className="text-blue-600 font-bold">{q.nomor}.</span>
                      <p className="text-slate-800 font-medium">{q.pertanyaan}</p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                      {Object.entries(q.opsi).map(([key, label]) => {
                        const isCorrect = q.kunci === key;
                        return (
                          <div 
                            key={key} 
                            className={`p-2.5 rounded border text-xs flex items-center gap-2 transition-all ${
                              showKeys && isCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                : "bg-slate-50 border-slate-100 text-slate-600"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                              showKeys && isCorrect
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-600"
                            }`}>
                              {key}
                            </span>
                            <span>{label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pembahasan Box */}
                    {showKeys && (
                      <div className="ml-6 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs leading-relaxed text-slate-600 border-l-4 border-l-emerald-600 space-y-1">
                        <div>
                          <strong className="text-emerald-700">Kunci Jawaban: {q.kunci}</strong>
                        </div>
                        <p><strong>Pembahasan:</strong> {q.pembahasan}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: ESAI (5 Items) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-blue-600 rounded" />
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">BAGIAN B: SOAL ESAI (5 BUTIR ANALITIS)</h3>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  Formatif Esai HOTS
                </span>
              </div>
              <div className="p-5 space-y-5 text-xs sm:text-sm">
                {data.esai.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 hover:border-blue-100 transition-all space-y-3 leading-relaxed">
                    <div className="font-semibold text-slate-800 flex gap-2">
                      <span className="text-blue-600 font-bold">{q.nomor}.</span>
                      <p className="text-slate-800 font-medium">{q.pertanyaan}</p>
                    </div>

                    {showKeys && (
                      <div className="bg-blue-50/25 border border-blue-100 rounded-lg p-4 text-xs space-y-2 text-slate-700">
                        <div>
                          <strong className="text-blue-900 block mb-0.5">Kunci Jawaban Guru:</strong>
                          <p className="whitespace-pre-wrap">{q.kunciJawaban}</p>
                        </div>
                        <div className="pt-2 border-t border-blue-100/50 text-[11px] text-slate-500">
                          <strong className="text-slate-700 font-semibold">Rubrik Penilaian Skor 1-4:</strong> {q.rubrikPenilaian}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* WORD / OFFICIAL PRINT VIEW */
          <div className="max-w-4xl mx-auto bg-white p-12 border border-slate-300 shadow-lg min-h-[11in] text-black">
            <div ref={printAreaRef} className="asesmen-word-document font-serif text-black" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: "12pt", lineHeight: "1.3", color: "black" }}>
              
              {/* LEMBAR SOAL */}
              <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: "0", fontSize: "12pt", fontWeight: "bold" }}>SOAL ASESMEN FORMATIF SISWA</h3>
                <h4 style={{ margin: "2px 0 0 0", fontSize: "11pt", fontWeight: "bold" }}>KOMPETENSI KEAHLIAN: {inputs.mataPelajaran.toUpperCase()}</h4>
                <p style={{ margin: "2px 0", fontSize: "10pt" }}>Materi Pokok: {inputs.materiPembelajaran}</p>
                <hr style={{ border: "0", borderTop: "1px solid black", margin: "10px 0" }} />
              </div>

              {/* metadata block */}
              <table style={{ width: "100%", borderCollapse: "collapse", border: "none", marginBottom: "15px" }} className="no-border-table">
                <tbody>
                  <tr style={{ fontSize: "10pt" }}>
                    <td style={{ width: "15%", padding: "2px 0" }}><strong>Nama Siswa</strong></td>
                    <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                    <td style={{ width: "32%", padding: "2px 0" }}>..................................</td>
                    <td style={{ width: "15%", padding: "2px 0" }}><strong>Hari / Tanggal</strong></td>
                    <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                    <td style={{ width: "32%", padding: "2px 0" }}>..................................</td>
                  </tr>
                  <tr style={{ fontSize: "10pt" }}>
                    <td style={{ padding: "2px 0" }}><strong>Kelas / Smt</strong></td>
                    <td>:</td>
                    <td>{inputs.faseKelasSemester}</td>
                    <td style={{ padding: "2px 0" }}><strong>Waktu Ujian</strong></td>
                    <td>:</td>
                    <td>60 Menit</td>
                  </tr>
                </tbody>
              </table>

              {/* Petunjuk Soal */}
              <p style={{ fontSize: "10pt", fontStyle: "italic", marginBottom: "15px" }}>
                <strong>Petunjuk Umum:</strong> Pilihlah salah satu jawaban yang paling tepat pada bagian A, dan jawablah pertanyaan esai secara analitis, ilmiah, dan jujur pada lembar jawaban bagian B!
              </p>

              {/* Bagian A Soal */}
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#dcdcdc", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "10px", fontSize: "11pt", textTransform: "uppercase" }}>
                BAGIAN A: PILIHAN GANDA
              </div>

              {data.pilihanGanda.map((q, idx) => (
                <div key={idx} className="question-block" style={{ marginBottom: "12px", pageBreakInside: "avoid" }}>
                  <div style={{ fontSize: "11pt" }}>
                    <strong>{q.nomor}.</strong> {q.pertanyaan}
                  </div>
                  <div className="options-list" style={{ marginLeft: "20px", paddingLeft: "0" }}>
                    {Object.entries(q.opsi).map(([key, value]) => (
                      <div key={key} style={{ fontSize: "11pt" }}>
                        {key}. {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Bagian B Soal */}
              <div style={{ pageBreakBefore: "always" }} />
              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#dcdcdc", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "10px", fontSize: "11pt", textTransform: "uppercase" }}>
                BAGIAN B: ESAI HOTS (SISTEM TROUBLESHOOTING)
              </div>
              {data.esai.map((q, idx) => (
                <div key={idx} className="question-block" style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
                  <div style={{ fontSize: "11pt" }}>
                    <strong>{q.nomor}.</strong> {q.pertanyaan}
                  </div>
                  <br /><br /><br /><br />
                </div>
              ))}

              {/* KUNCI JAWABAN GURU */}
              <div style={{ pageBreakBefore: "always" }} />
              <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: "0", fontSize: "12pt", fontWeight: "bold" }}>KUNCI JAWABAN & PEDOMAN PENSKORAN GURU</h3>
                <h4 style={{ margin: "2px 0 0 0", fontSize: "11pt", fontWeight: "bold" }}>RAHASIA ADMINISTRASI SEKOLAH</h4>
                <hr style={{ border: "0", borderTop: "2px solid black", margin: "10px 0" }} />
              </div>

              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#dcdcdc", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "10px", fontSize: "11pt", textTransform: "uppercase" }}>
                KUNCI PILIHAN GANDA & PEMBAHASAN
              </div>
              {data.pilihanGanda.map((q, idx) => (
                <div key={idx} className="key-block" style={{ backgroundColor: "#f2f2f2", border: "1px solid black", padding: "6px", marginTop: "5px", fontSize: "10.5pt", marginBottom: "10px", pageBreakInside: "avoid" }}>
                  <strong>Soal Nomor {q.nomor}: Kunci {q.kunci}</strong>
                  <p style={{ margin: "3px 0 0 0" }}><strong>Pembahasan:</strong> {q.pembahasan}</p>
                </div>
              ))}

              <div className="section-title" style={{ fontWeight: "bold", backgroundColor: "#dcdcdc", padding: "4px 8px", border: "1px solid black", marginTop: "15px", marginBottom: "10px", fontSize: "11pt", textTransform: "uppercase" }}>
                KUNCI ESAI & RUBRIK SKOR (1-4)
              </div>
              {data.esai.map((q, idx) => (
                <div key={idx} className="question-block" style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
                  <div style={{ fontSize: "11pt" }}>
                    <strong>Nomor {q.nomor}.</strong> {q.pertanyaan}
                  </div>
                  <div style={{ marginTop: "5px", paddingLeft: "15px", fontSize: "11pt" }}>
                    <strong>Jawaban Ideal:</strong> {q.kunciJawaban}
                    <div style={{ fontStyle: "italic", fontSize: "10pt", color: "#444", marginTop: "4px" }}>
                      <strong>Pedoman Rubrik Skor 1-4:</strong> {q.rubrikPenilaian}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
