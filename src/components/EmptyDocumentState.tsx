/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, ArrowLeft, FileText, FileDown, RefreshCw } from "lucide-react";

interface EmptyDocumentStateProps {
  title: string;
  onLoadDemo: () => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function EmptyDocumentState({
  title,
  onLoadDemo,
  isGenerating,
  onGenerate,
}: EmptyDocumentStateProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-slate-950 text-slate-300 select-none overflow-y-auto">
      <div className="max-w-md space-y-6">
        {/* Decorative Icon */}
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md animate-bounce">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Dokumen {title} Belum Disusun
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Silakan masukkan data administrasi guru Anda pada formulir di sebelah kiri, kemudian mulailah menyusun administrasi kurikulum SMK terintegrasi nilai integritas.
          </p>
        </div>

        {/* Quick Instructions Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-3">
          <div className="font-semibold text-slate-200 uppercase tracking-wider text-[10px]">
            Langkah-langkah Mudah:
          </div>
          <ul className="space-y-2.5 text-slate-400 list-decimal list-inside">
            <li>
              <span className="text-slate-300">Isi formulir identitas</span> sekolah, guru, mata pelajaran, & materi pokok di panel kiri.
            </li>
            <li>
              <span className="text-slate-300">Pilih nilai karakter & integritas</span> yang relevan untuk diintegrasikan ke kegiatan kelas.
            </li>
            <li>
              Klik tombol <span className="text-blue-400 font-semibold">Mulai Susun dengan AI</span> di bawah formulir untuk menghasilkan draf profesional.
            </li>
            <li>
              Gunakan <span className="text-indigo-400 font-semibold">Asisten AI (Kanan)</span> untuk melakukan revisi atau penyesuaian khusus.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:cursor-not-allowed text-white text-xs font-semibold py-2.5 px-5 rounded-lg shadow-lg hover:shadow-blue-900/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Sedang Menyusun...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mulai Susun {title}</span>
              </>
            )}
          </button>

          <button
            onClick={onLoadDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 px-5 rounded-lg border border-slate-700 hover:border-slate-600 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Muat Contoh VoIP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
