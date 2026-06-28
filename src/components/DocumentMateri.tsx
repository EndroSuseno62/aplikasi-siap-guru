/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { MateriData, TeacherInputs } from "../types";
import { BookOpen, Copy, CheckCircle, Printer, Compass, Layers, Info } from "lucide-react";

interface DocumentMateriProps {
  data: MateriData;
  inputs: TeacherInputs;
}

export default function DocumentMateri({ data, inputs }: DocumentMateriProps) {
  const [viewStyle, setViewStyle] = useState<"interactive" | "official">("interactive");
  const [copied, setCopied] = useState(false);
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
              .header-title { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 15px; text-transform: uppercase; }
              .section-header { font-weight: bold; background-color: #f2f2f2; padding: 4px; border-bottom: 2px solid black; margin-top: 15px; margin-bottom: 8px; text-transform: uppercase; font-size: 11pt; }
              .content-p { text-align: justify; margin-bottom: 10px; font-size: 11pt; text-indent: 0.5in; }
              .code-block { font-family: 'Courier New', Courier, monospace; background-color: #f9f9f9; padding: 8px; border: 1px dashed #666; font-size: 10pt; white-space: pre-wrap; margin: 8px 0; }
              .glossary-table { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .glossary-table td { border: 1px solid black; padding: 6px; font-size: 11pt; vertical-align: top; }
              .concept-list { margin-left: 20px; margin-bottom: 10px; font-size: 11pt; }
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
            <title>Materi Ajar - ${inputs.materiPembelajaran}</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; padding: 30px; line-height: 1.3; color: black; }
              .header-title { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 15px; text-transform: uppercase; }
              .section-header { font-weight: bold; background-color: #f2f2f2; padding: 4px; border-bottom: 2px solid black; margin-top: 15px; margin-bottom: 8px; text-transform: uppercase; }
              .content-p { text-align: justify; margin-bottom: 10px; text-indent: 0.5in; }
              .code-block { font-family: 'Courier New', Courier, monospace; background-color: #f9f9f9; padding: 8px; border: 1px dashed #666; font-size: 10pt; white-space: pre; margin: 8px 0; }
              .glossary-table { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .glossary-table td { border: 1px solid black; padding: 6px; }
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
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-700 text-sm">Buku Materi Ajar</span>
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
            <span>Cetak Materi</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
        {viewStyle === "interactive" ? (
          /* INTERACTIVE DASHBOARD VIEW */
          <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm">
            {/* Intro Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-blue-400 font-bold tracking-widest text-[10px] uppercase mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> BAHAN AJAR TEKNOLOGI JARINGAN
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{data.judul}</h2>
              <p className="text-blue-100/90 leading-relaxed font-light text-xs">
                {data.ringkasanMateri}
              </p>
            </div>

            {/* Sub-section: Penjabaran TP & Karakteristik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" /> Penjabaran Capaian & Tujuan Pembelajaran
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {data.penjabaranTujuan}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-blue-950 space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>PETA KONSEP INTI</span>
                </div>
                <ul className="space-y-2 text-xs">
                  {(data.petaKonsep || []).map((p, pIdx) => (
                    <li key={pIdx} className="flex gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                      <span className="font-medium text-blue-900">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sub-chapters Map */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider pl-1">Materi Pembelajaran Utama</h3>
              
              {(data.subBab || []).map((sub, sIdx) => (
                <div key={sIdx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div>
                    <h4 className="font-bold text-blue-900 text-base mb-2">{sub.judul}</h4>
                    <p className="text-slate-600 leading-relaxed text-xs whitespace-pre-line">
                      {sub.konten}
                    </p>
                  </div>

                  {sub.visualHighlight && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mt-0.5 shrink-0">
                        i
                      </div>
                      <div className="text-xs">
                        <strong className="text-slate-700 block mb-0.5">Penjelasan Visual & Sintaks Jaringan:</strong>
                        <span className="text-slate-500 italic block mb-1">{sub.visualHighlight}</span>
                        {/* If it looks like code, render as monospaced CLI */}
                        {sub.konten.includes("Router(") || sub.visualHighlight.includes("Router(") ? (
                          <div className="bg-slate-900 text-slate-100 rounded p-2.5 font-mono text-[10px] mt-1.5 border border-slate-800 leading-normal">
                            {sub.visualHighlight.includes("ip dhcp") 
                              ? sub.visualHighlight 
                              : `Router> enable\nRouter# configure terminal\nRouter(config)# telephony-service\nRouter(config-telephony)# max-ephones 5\nRouter(config-telephony)# max-dn 5`}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Glossary (Glosarium) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Glosarium Telekomunikasi IP</h3>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {(data.glosarium || []).map((g, gIdx) => (
                  <div key={gIdx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong className="text-blue-900 block mb-1 font-bold">{g.istilah}</strong>
                    <p className="text-slate-600 leading-relaxed">{g.definisi}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* WORD / OFFICIAL PRINT VIEW */
          <div className="max-w-4xl mx-auto bg-white p-12 border border-slate-300 shadow-lg min-h-[11in] text-black">
            <div ref={printAreaRef} className="materi-word-document font-serif" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: "12pt", lineHeight: "1.3", color: "black" }}>
              
              {/* Header */}
              <div className="header-title" style={{ textAlign: "center", fontWeight: "bold", fontSize: "14pt", marginBottom: "20px", textTransform: "uppercase" }}>
                RINGKASAN MATERI AJAR ADMINISTRASI PEMBELAJARAN
                <br />
                MATA PELAJARAN: {inputs.mataPelajaran.toUpperCase()}
              </div>

              {/* metadata table */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "15px" }} className="no-border-table">
                <tbody>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ width: "20%", padding: "2px 0" }}><strong>Materi Pembelajaran</strong></td>
                    <td style={{ width: "3%", padding: "2px 0" }}>:</td>
                    <td style={{ width: "77%", padding: "2px 0" }}>{inputs.materiPembelajaran}</td>
                  </tr>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ padding: "2px 0" }}><strong>Guru Pengampu</strong></td>
                    <td>:</td>
                    <td>{inputs.namaGuru}</td>
                  </tr>
                  <tr style={{ fontSize: "11pt" }}>
                    <td style={{ padding: "2px 0" }}><strong>Fase / Kelas / Smt</strong></td>
                    <td>:</td>
                    <td>{inputs.faseKelasSemester}</td>
                  </tr>
                </tbody>
              </table>

              {/* Ringkasan */}
              <div className="section-header" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", borderBottom: "2px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                I. RINGKASAN MATERI UTAMA
              </div>
              <p className="content-p" style={{ textAlign: "justify", marginBottom: "10px", fontSize: "11pt", textIndent: "0.5in" }}>
                {data.ringkasanMateri}
              </p>

              {/* Penjabaran Tujuan */}
              <div className="section-header" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", borderBottom: "2px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                II. PENJABARAN TUJUAN, LITERASI, DAN INTEGRITAS SIKAP
              </div>
              <p className="content-p" style={{ textAlign: "justify", marginBottom: "10px", fontSize: "11pt", textIndent: "0.5in" }}>
                {data.penjabaranTujuan}
              </p>

              {/* Peta Konsep */}
              <div className="section-header" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", borderBottom: "2px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                III. PETA KONSEP INTI PEMBELAJARAN
              </div>
              <ul style={{ paddingLeft: "20px", marginBottom: "10px", fontSize: "11pt" }}>
                {(data.petaKonsep || []).map((p, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>{p}</li>
                ))}
              </ul>

              {/* Sub Bab Map */}
              <div className="section-header" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", borderBottom: "2px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                IV. PENJABARAN SUB-BAB MATERI KOMPREHENSIF
              </div>
              {(data.subBab || []).map((sub, idx) => (
                <div key={idx} style={{ marginTop: "10px", marginBottom: "15px" }}>
                  <div style={{ fontStyle: "normal", fontWeight: "bold", fontSize: "11.5pt", marginBottom: "4px" }}>{sub.judul}</div>
                  <p className="content-p" style={{ textAlign: "justify", marginBottom: "8px", fontSize: "11pt", textIndent: "0.5in" }}>
                    {sub.konten}
                  </p>
                  {sub.visualHighlight && (
                    <div style={{ marginLeft: "0.5in", fontStyle: "italic", fontSize: "10pt", color: "#444", borderLeft: "3px solid #ccc", paddingLeft: "8px" }}>
                      <strong>Ilustrasi Visual / Konfigurasi CLI:</strong> {sub.visualHighlight}
                    </div>
                  )}
                </div>
              ))}

              {/* Glosarium */}
              <div className="section-header" style={{ fontWeight: "bold", backgroundColor: "#f2f2f2", padding: "4px 8px", borderBottom: "2px solid black", marginTop: "15px", marginBottom: "8px", textTransform: "uppercase", fontSize: "11pt" }}>
                V. GLOSARIUM TELEKOMUNIKASI JARINGAN IP
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }} className="glossary-table">
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th style={{ border: "1px solid black", padding: "6px", width: "30%", fontSize: "11pt" }}>Istilah Teknik</th>
                    <th style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>Definisi & Penjelasan Administrasi</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.glosarium || []).map((g, idx) => (
                    <tr key={idx}>
                      <td style={{ border: "1px solid black", padding: "6px", fontWeight: "bold", fontSize: "11pt" }}>{g.istilah}</td>
                      <td style={{ border: "1px solid black", padding: "6px", fontSize: "11pt" }}>{g.definisi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
