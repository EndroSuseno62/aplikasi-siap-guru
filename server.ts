/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

// Initialize GoogleGenAI server-side with key and User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper system instructions for SIAP GURU curriculum builder
const SYSTEM_INSTRUCTIONS = `
Anda adalah sistem ahli pembuat kurikulum dan administrasi guru sekolah kejuruan (SMK) di Indonesia.
Tugas Anda adalah menghasilkan dokumen administrasi pembelajaran (RPP, Materi Ajar, LKPD, atau Asesmen) yang sangat detail, profesional, terstruktur, dan siap pakai sesuai dengan kurikulum nasional.

Anda harus mematuhi aturan berikut secara ketat:
1. Seluruh respon harus dalam bahasa Indonesia yang formal, baku, dan sesuai dengan administrasi sekolah Indonesia (Times New Roman style, terstruktur).
2. Terapkan prinsip Deep Learning secara eksplisit: Berkesadaran (Mindful Learning), Bermakna (Meaningful Learning), dan Menggembirakan (Joyful Learning) di setiap aktivitas.
3. Integrasikan Nilai Integritas Sekolah secara nyata di dalam tujuan, aktivitas, LKPD, refleksi, dan rubrik. Buat aksi konkret yang dilakukan peserta didik (bukan sekadar teori).
4. Sesuai dengan data input yang diberikan guru. Jangan mengarang data sekolah atau nama guru yang melenceng dari input.
5. Gunakan format ABCD (Audience, Behavior, Condition, Degree) untuk tujuan pembelajaran dengan kata kerja operasional yang terukur (KKO Bloom), serta mengandung literasi, numerasi, dan nilai integritas.
6. Hasilkan data dalam format JSON yang valid dan bersih sesuai dengan struktur skema yang diminta.
`;

// Helper to compile prompts for sections
function getPromptForSection(section: string, inputs: any, customPrompt?: string, currentData?: any): string {
  const inputsStr = JSON.stringify(inputs, null, 2);
  const customStr = customPrompt ? `\n\nCATATAN PERBAIKAN GURU (PENTING! Terapkan instruksi ini): ${customPrompt}` : "";
  const currentStr = currentData ? `\n\nDATA SAAT INI (Gunakan ini sebagai basis untuk diedit/direvisi jika ada catatan perbaikan): ${JSON.stringify(currentData, null, 2)}` : "";

  if (section === "rpp") {
    return `
Berdasarkan data input guru berikut:
${inputsStr}
${customStr}
${currentStr}

Hasilkan dokumen RPP (Modul Ajar) dalam struktur JSON yang tepat sesuai tipe RPPData berikut:

{
  "identifikasi": {
    "pesertaDidik": "Penjelasan rinci karakteristik peserta didik sesuai input dan penyesuaian materi",
    "materiPelajaran": "Nama mata pelajaran dan cakupan materi",
    "dimensiProfilLulusan": {
      "dpl": "Pilih DPL yang paling sesuai (misal: DPL 3 Penalaran Kritis & DPL 5 Kolaborasi) dari 8 pilihan DPL di panduan",
      "alasan": "Berikan alasan pedagogis mengapa DPL tersebut dipilih dan bagaimana mencapainya"
    },
    "capaianPembelajaran": "Salin Capaian Pembelajaran (CP) yang relevan sesuai input",
    "lintasDisiplinIlmu": "Keterkaitan materi ini dengan mata pelajaran lain (misal: Bahasa Inggris teknis, Matematika)",
    "tujuanPembelajaran": "Tujuan Pembelajaran menggunakan format ABCD (Audience, Behavior, Condition, Degree) yang terukur. Sertakan Kompetensi, Literasi, Numerasi (jika relevan), dan Integrasi Nilai Integritas."
  },
  "desainPembelajaran": {
    "topikPembelajaran": "Topik spesifik pembelajaran",
    "praktikPedagogis": {
      "model": "Model pembelajaran yang dipilih (PBL, PjBL, discovery, inquiry, atau cooperative) sesuai input",
      "alasan": "Alasan pemilihan model pembelajaran tersebut berdasarkan karakteristik materi"
    },
    "kemitraanPembelajaran": "Kemitraan dengan dunia kerja/industri (SOP industri rujukan)",
    "lingkunganPembelajaran": "Kebutuhan ruangan lab, alat, dan media",
    "pemanfaatanDigital": "Aplikasi simulator/digital yang digunakan (misal Cisco Packet Tracer, Google Classroom)"
  },
  "pengalamanBelajar": [
    {
      "pertemuanKe": 1,
      "alokasiWaktu": "Alokasi waktu pertemuan ini (misal: 4 JP @ 45 menit)",
      "kegiatan": [
        {
          "tahap": "Awal (Pendahuluan - Alokasi Waktu)",
          "aktivitasGuru": "Aktivitas guru secara rinci memuat salam, apersepsi, tantangan, dan prinsip Mindful/Joyful",
          "aktivitasSiswa": "Aktivitas peserta didik secara rinci merespons guru",
          "nilaiIntegritas": "Penerapan konkret nilai integritas (misal: Disiplin - hadir tepat waktu)",
          "prinsipDeepLearning": "Penjelasan eksplisit bagaimana tahapan ini memenuhi prinsip Mindful / Meaningful / Joyful"
        },
        {
          "tahap": "Inti - Orientasi Masalah (Pemahaman - Alokasi Waktu)",
          "aktivitasGuru": "Guru menyajikan masalah riil industri dan memandu pemahaman materi dasar",
          "aktivitasSiswa": "Siswa menyimak, mencatat, dan menganalisis masalah",
          "nilaiIntegritas": "Penerapan nilai integritas (misal: Jujur - mengakui kesulitan)",
          "prinsipDeepLearning": "Penjelasan eksplisit prinsip Deep Learning"
        },
        {
          "tahap": "Inti - Penyelidikan (Aplikasi - Alokasi Waktu)",
          "aktivitasGuru": "Guru memandu jalannya praktikum/aktivitas di simulator Cisco Packet Tracer",
          "aktivitasSiswa": "Siswa secara berpasangan/mandiri mengonfigurasi CLI router, troubleshooting",
          "nilaiIntegritas": "Penerapan nilai integritas (misal: Kerja Keras, Mandiri, Tanggung Jawab dalam penulisan CLI)",
          "prinsipDeepLearning": "Penjelasan eksplisit prinsip Deep Learning"
        },
        {
          "tahap": "Inti - Menyajikan Hasil (Merefleksi - Alokasi Waktu)",
          "aktivitasGuru": "Guru memandu presentasi demo panggilan VoIP dan memberikan penguatan",
          "aktivitasSiswa": "Siswa mempresentasikan hasil, melakukan demo panggilan ring/connected, menjawab pertanyaan",
          "nilaiIntegritas": "Penerapan nilai integritas (Berani, Jujur atas hasil)",
          "prinsipDeepLearning": "Penjelasan eksplisit prinsip Deep Learning"
        },
        {
          "tahap": "Penutup (Refleksi & Evaluasi - Alokasi Waktu)",
          "aktivitasGuru": "Guru membimbing kesimpulan, refleksi nilai integritas, doa penutup",
          "aktivitasSiswa": "Siswa menyimpulkan, mengisi lembar refleksi diri, mematikan PC sesuai SOP",
          "nilaiIntegritas": "Penerapan nilai integritas (Tanggung Jawab - menjaga kebersihan lab)",
          "prinsipDeepLearning": "Penjelasan eksplisit prinsip Deep Learning"
        }
      ]
    }
  ],
  "asesmenPembelajaran": {
    "asesmenAwal": "Penjelasan instrumen untuk Assessment As/For Learning di awal kelas",
    "asesmenProses": "Penjelasan instrumen selama praktikum (observasi sikap, diskusi)",
    "asesmenAkhir": "Penjelasan instrumen di akhir (tes praktik kinerja, tes tertulis)"
  },
  "lampiran": {
    "rubrikAwal": [
      { "kriteria": "Kriteria 1", "skor4": "Sangat Baik...", "skor3": "Baik...", "skor2": "Cukup...", "skor1": "Perlu Bimbingan..." }
    ],
    "rubrikObservasi": [
      { "kriteria": "Kriteria Sikap/Integritas 1", "skor4": "Sangat Baik...", "skor3": "Baik...", "skor2": "Cukup...", "skor1": "Perlu Bimbingan..." }
    ],
    "rubrikKinerja": [
      { "kriteria": "Kriteria Kinerja Praktik 1", "skor4": "Sangat Baik...", "skor3": "Baik...", "skor2": "Cukup...", "skor1": "Perlu Bimbingan..." }
    ],
    "rubrikTesTulis": [
      { "kriteria": "Penguasaan Konsep", "skor4": "Sangat Baik...", "skor3": "Baik...", "skor2": "Cukup...", "skor1": "Perlu Bimbingan..." }
    ],
    "rubrikDiskusi": [
      { "kriteria": "Kolaborasi & Komunikasi", "skor4": "Sangat Baik...", "skor3": "Baik...", "skor2": "Cukup...", "skor1": "Perlu Bimbingan..." }
    ]
  }
}

Buat lampiran rubrik dengan skala 1-4 yang memuat deskripsi lengkap untuk masing-masing kriteria. Rubrik harus mencakup aspek Pengetahuan, Keterampilan, Sikap, dan Nilai Integritas yang dipilih secara konkret.
Kembalikan HANYA objek JSON tersebut tanpa teks pengantar atau markdown block.
`;
  } else if (section === "materi") {
    return `
Berdasarkan data input guru berikut:
${inputsStr}
${customStr}
${currentStr}

Hasilkan dokumen Materi Ajar (ringkasan materi dari penjabaran tujuan pembelajaran dan materi pembelajaran) dalam struktur JSON yang tepat sesuai tipe MateriData berikut:

{
  "judul": "Judul materi yang menarik",
  "ringkasanMateri": "Ringkasan komprehensif mengenai konsep dasar, arsitektur, dan langkah penting materi pembelajaran.",
  "penjabaranTujuan": "Penjelasan bagaimana materi ini mewujudkan tujuan pembelajaran, mengintegrasikan literasi teknik, numerasi konfigurasi, dan nilai integritas sekolah secara nyata.",
  "petaKonsep": [
    "Butir peta konsep 1",
    "Butir peta konsep 2",
    "Butir peta konsep 3"
  ],
  "subBab": [
    {
      "judul": "Sub-Bab 1 (Teori Dasar & Protokol)",
      "konten": "Penjelasan teoretis mendalam mengenai cara kerja, protokol (SIP, RTP, dll), segmentasi jaringan.",
      "visualHighlight": "Deskripsi atau panduan visual diagram yang mempermudah pemahaman"
    },
    {
      "judul": "Sub-Bab 2 (Konfigurasi Kritis & Parameter)",
      "konten": "Penjelasan mengenai konfigurasi penting (misalnya peran Option 150, sub-interface router, DHCP voice). Berikan contoh sintaks CLI Cisco yang benar.",
      "visualHighlight": "Contoh potongan kode atau alur data konfigurasi"
    },
    {
      "judul": "Sub-Bab 3 (Voice VLAN & Quality of Service)",
      "konten": "Penjelasan pentingnya pemisahan jalur data dan suara pada switch port, prioritas trafik 802.1Q.",
      "visualHighlight": "Panduan interkoneksi switch-ephone-PC"
    }
  ],
  "glosarium": [
    { "istilah": "Istilah 1", "definisi": "Definisi istilah 1" },
    { "istilah": "Istilah 2", "definisi": "Definisi istilah 2" }
  ]
}

Kembalikan HANYA objek JSON tersebut tanpa teks pengantar atau markdown block.
`;
  } else if (section === "lkpd") {
    return `
Berdasarkan data input guru berikut:
${inputsStr}
${customStr}
${currentStr}

Hasilkan dokumen Lembar Kerja Peserta Didik (LKPD) yang menarik, colorful, dan terperinci untuk kegiatan praktik. Format dalam struktur JSON sesuai tipe LKPDData berikut:

{
  "identitas": {
    "namaSekolah": "${inputs.namaSekolah}",
    "mataPelajaran": "${inputs.mataPelajaran}",
    "kelasSemester": "${inputs.faseKelasSemester}",
    "materiPokok": "${inputs.materiPembelajaran}",
    "alokasiWaktu": "Alokasi waktu praktik (misal: 2 JP)",
    "namaSiswaAtauKelompok": "Kolompok / Nama Siswa"
  },
  "petunjukBelajar": [
    "Petunjuk belajar 1",
    "Petunjuk belajar 2"
  ],
  "tujuanPraktikum": "Tujuan khusus kegiatan praktik ini",
  "skenarioDuniaNyata": "Studi kasus / skenario kontekstual dunia nyata / industri yang memotivasi siswa untuk memecahkan masalah ini",
  "alatBahan": [
    "Alat/bahan 1 (misal simulator Cisco Packet Tracer)",
    "Alat/bahan 2"
  ],
  "langkahKerja": [
    {
      "langkah": "Langkah 1: Nama Langkah",
      "detail": "Penjelasan instruksi CLI atau tindakan fisik secara mendalam dan berurutan.",
      "visualHint": "Deskripsi layout visual, topologi kabel, atau indikator lampu hijau/merah di simulator",
      "fokusIntegritas": "Penjelasan bagaimana nilai integritas (seperti disiplin atau teliti) dipraktikkan pada langkah ini"
    }
  ],
  "pertanyaanHots": [
    {
      "nomor": 1,
      "soal": "Pertanyaan HOTS (analisis, evaluasi, atau kreasi) mengenai troubleshoot jaringan atau skenario error (misal: Option 150 lupa dikonfigurasi, atau salah pasang port voice vlan).",
      "skenarioKasus": "Kasus kegagalan sistem",
      "petunjukAnalisis": "Petunjuk berpikir kritis bagi siswa"
    },
    {
      "nomor": 2,
      "soal": "Pertanyaan HOTS kedua mengenai efisiensi, QoS, atau keamanan paket.",
      "skenarioKasus": "Skenario keamanan/sniffing data",
      "petunjukAnalisis": "Petunjuk berpikir"
    }
  ],
  "refleksiIntegritas": [
    {
      "pertanyaan": "Pertanyaan reflektif mengenai penerapan nilai tanggung jawab/jujur selama praktikum",
      "penjelasanPenerapan": "Aksi konkret yang diharapkan dari siswa sebagai wujud refleksi nilai tersebut"
    }
  ]
}

Pastikan langkah kerja dirancang dengan sangat terperinci dan instruksional agar siswa SMK dapat mengikuti praktikum secara mandiri.
Kembalikan HANYA objek JSON tersebut tanpa teks pengantar atau markdown block.
`;
  } else if (section === "asesmen") {
    return `
Berdasarkan data input guru berikut:
${inputsStr}
${customStr}
${currentStr}

Hasilkan dokumen Asesmen (berisi soal formatif pilihan ganda 10 butir dan esai 5 butir beserta kunci jawaban serta pembahasan mendalam). Format dalam struktur JSON sesuai tipe AsesmenData berikut:

{
  "pilihanGanda": [
    {
      "nomor": 1,
      "pertanyaan": "Pertanyaan pilihan ganda tingkat kognitif C3-C5 mengenai konsep, protokol, atau troubleshooting materi",
      "opsi": {
        "A": "Pilihan A",
        "B": "Pilihan B",
        "C": "Pilihan C",
        "D": "Pilihan D",
        "E": "Pilihan E"
      },
      "kunci": "C",
      "pembahasan": "Penjelasan teoretis mengapa opsi tersebut benar dan mengapa opsi lainnya kurang tepat."
    }
  ],
  "esai": [
    {
      "nomor": 1,
      "pertanyaan": "Pertanyaan esai HOTS menganalisis/membandingkan/memecahkan masalah konfigurasi",
      "kunciJawaban": "Jawaban lengkap, ilmiah, dan berbobot yang diharapkan",
      "rubrikPenilaian": "Deskripsi pembagian skor 1 s.d. 4 untuk penilaian jawaban siswa"
    }
  ]
}

Hasilkan persis 10 soal pilihan ganda (dengan opsi A s.d. E) dan 5 soal esai beserta kunci jawaban dan pembahasan/rubrik yang mendalam.
Kembalikan HANYA objek JSON tersebut tanpa teks pengantar atau markdown block.
`;
  }

  return "";
}

// Helper to clean markdown block wrappers from JSON string if any, then parse it
function cleanAndParseJson(text: string): any {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  }
  return JSON.parse(cleaned);
}

// Helper function to generate content with retries and a fallback model in case of rate limits or unavailable status (503)
async function generateWithRetryAndFallback(
  prompt: string,
  systemInstruction: string,
  retriesPerModel = 2
): Promise<any> {
  // Ordered list of models to try. We prioritize gemini-3.5-flash as it is recommended for basic text,
  // then fall back to gemini-flash-latest and gemini-3.1-flash-lite if 503/429/UNAVAILABLE occurs.
  const models = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 0; attempt <= retriesPerModel; attempt++) {
      try {
        console.log(
          `[AI SIAP GURU] Attempting generation with model "${model}" (attempt ${attempt + 1}/${retriesPerModel + 1})...`
        );
        
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.2, // Low temperature for consistent administrative outputs
          },
        });

        const textOutput = response.text;
        if (!textOutput) {
          throw new Error("No text output received from Gemini API");
        }

        // Clean and validate JSON structure
        const parsedData = cleanAndParseJson(textOutput);
        console.log(`[AI SIAP GURU] Successfully generated document using model "${model}".`);
        return parsedData;
      } catch (error: any) {
        lastError = error;
        const errMsg = error.message || String(error);
        console.warn(
          `[AI SIAP GURU] Warning: Attempt with model "${model}" (attempt ${attempt + 1}) failed:`,
          errMsg
        );

        // If we still have retries remaining for this model, wait with exponential backoff + jitter
        if (attempt < retriesPerModel) {
          const delay = Math.pow(2, attempt) * 1500 + Math.random() * 500;
          console.log(`[AI SIAP GURU] Retrying in ${delay.toFixed(0)}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    console.warn(`[AI SIAP GURU] Model "${model}" failed all attempts. Trying next fallback...`);
  }

  throw lastError || new Error("All model attempts and fallbacks failed.");
}

// REST API for curriculum generation/refinement
app.post("/api/generate", async (req, res) => {
  try {
    const { section, inputs, customPrompt, currentData } = req.body;

    if (!section || !inputs) {
      return res.status(400).json({ error: "Missing section or inputs" });
    }

    const prompt = getPromptForSection(section, inputs, customPrompt, currentData);

    console.log(`Generating curriculum section: ${section}...`);
    const parsedData = await generateWithRetryAndFallback(prompt, SYSTEM_INSTRUCTIONS);
    
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({
      error: "Gagal menghasilkan dokumen kurikulum. Silakan coba lagi.",
      details: error.message || error,
    });
  }
});

// Vite middleware and asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIAP GURU Server running on http://localhost:${PORT}`);
  });
}

startServer();
