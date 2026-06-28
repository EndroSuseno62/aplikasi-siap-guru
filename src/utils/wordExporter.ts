/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SIAPGURUData } from "../types";

export function downloadAllDocumentsAsWord(data: SIAPGURUData) {
  const { inputs, rpp, materi, lkpd, asesmen } = data;

  // Header and layout setup for Word (using CSS for standard Word styling)
  const headStyle = `
    <style>
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt;
        line-height: 1.25;
        color: #000000;
        margin: 1.0in;
      }
      h1, h2, h3, h4 {
        color: #000000;
        text-align: center;
        margin: 10px 0;
      }
      .kop-title {
        text-align: center;
        margin-bottom: 20px;
      }
      .kop-title h3 {
        margin: 0 0 4px 0;
        font-size: 14pt;
        font-weight: bold;
      }
      .kop-title h4 {
        margin: 0 0 2px 0;
        font-size: 12pt;
        font-weight: bold;
      }
      .kop-title p {
        margin: 0;
        font-size: 10pt;
        font-style: italic;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        margin-bottom: 15px;
        font-size: 11pt;
      }
      th, td {
        border: 1px solid #000000;
        padding: 6px;
        text-align: left;
        vertical-align: top;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      .no-border-table th, .no-border-table td {
        border: none !important;
        padding: 2px 0;
      }
      .section-title {
        font-weight: bold;
        background-color: #e6e6e6;
        padding: 4px 8px;
        border: 1px solid #000000;
        margin-top: 15px;
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 11pt;
      }
      .section-header {
        font-weight: bold;
        background-color: #f2f2f2;
        padding: 4px 8px;
        border-bottom: 2px solid #000000;
        margin-top: 15px;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-size: 11pt;
      }
      .content-p {
        text-align: justify;
        margin-bottom: 10px;
        font-size: 11pt;
        text-indent: 0.5in;
      }
      .list-item {
        margin-bottom: 4px;
        font-size: 11pt;
      }
      .page-break {
        page-break-before: always;
        clear: both;
      }
    </style>
  `;

  // === DOKUMEN 1: RPP ===
  let rppHtml = `
    <div className="kop-title">
      <h3>RENCANA PELAKSANAAN PEMBELAJARAN (RPP) / MODUL AJAR</h3>
      <h4>${inputs.namaSekolah ? inputs.namaSekolah.toUpperCase() : "SEKOLAH SMK"}</h4>
      <p>Administrasi Kurikulum SMK Pusat Keunggulan - Integrasi Nilai Karakter</p>
      <hr style="border: 0; border-top: 2px double black; margin: 10px 0;" />
    </div>

    <table className="no-border-table" style="width: 100%; margin-bottom: 15px;">
      <tbody>
        <tr style="font-size: 11pt;">
          <td style="width: 20%;"><strong>Sekolah</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 32%;">${inputs.namaSekolah || "-"}</td>
          <td style="width: 20%;"><strong>Kelas/Semester</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 22%;">${inputs.faseKelasSemester || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td style="padding: 2px 0;"><strong>Guru Pengampu</strong></td>
          <td>:</td>
          <td>${inputs.namaGuru || "-"}</td>
          <td style="padding: 2px 0;"><strong>Alokasi Waktu</strong></td>
          <td>:</td>
          <td>${inputs.alokasiWaktu || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td style="padding: 2px 0;"><strong>Mata Pelajaran</strong></td>
          <td>:</td>
          <td>${inputs.mataPelajaran || "-"}</td>
          <td style="padding: 2px 0;"><strong>Model Belajar</strong></td>
          <td>:</td>
          <td>${inputs.modelPembelajaran || "-"}</td>
        </tr>
      </tbody>
    </table>

    <div className="section-title">I. IDENTIFIKASI PEMBELAJARAN</div>
    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 30%;"><strong>Sasaran Peserta Didik</strong></td>
          <td>${rpp.identifikasi.pesertaDidik || "-"}</td>
        </tr>
        <tr>
          <td><strong>Capaian Pembelajaran (CP)</strong></td>
          <td>${rpp.identifikasi.capaianPembelajaran || "-"}</td>
        </tr>
        <tr>
          <td><strong>Dimensi Profil Lulusan (DPL)</strong></td>
          <td>
            <strong>${rpp.identifikasi.dimensiProfilLulusan?.dpl || "-"}</strong><br />
            <em>Alasan:</em> ${rpp.identifikasi.dimensiProfilLulusan?.alasan || "-"}
          </td>
        </tr>
        <tr>
          <td><strong>Lintas Disiplin Ilmu</strong></td>
          <td>${rpp.identifikasi.lintasDisiplinIlmu || "-"}</td>
        </tr>
        <tr>
          <td><strong>Tujuan Pembelajaran (ABCD)</strong></td>
          <td>${rpp.identifikasi.tujuanPembelajaran || "-"}</td>
        </tr>
      </tbody>
    </table>

    <div className="section-title">II. DESAIN PEMBELAJARAN</div>
    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 30%;"><strong>Topik Pembelajaran</strong></td>
          <td>${rpp.desainPembelajaran.topikPembelajaran || "-"}</td>
        </tr>
        <tr>
          <td><strong>Praktik Pedagogis (Model)</strong></td>
          <td>
            <strong>${rpp.desainPembelajaran.praktikPedagogis?.model || "-"}</strong><br />
            <em>Justifikasi:</em> ${rpp.desainPembelajaran.praktikPedagogis?.alasan || "-"}
          </td>
        </tr>
        <tr>
          <td><strong>Kemitraan Dunia Kerja</strong></td>
          <td>${rpp.desainPembelajaran.kemitraanPembelajaran || "-"}</td>
        </tr>
        <tr>
          <td><strong>Lingkungan Belajar & Digital</strong></td>
          <td>
            <strong>Fasilitas:</strong> ${rpp.desainPembelajaran.lingkunganPembelajaran || "-"}<br />
            <strong>Media Digital:</strong> ${rpp.desainPembelajaran.pemanfaatanDigital || "-"}
          </td>
        </tr>
      </tbody>
    </table>

    <div className="section-title">III. PENGALAMAN BELAJAR MENDALAM (DEEP LEARNING)</div>
  `;

  if (rpp.pengalamanBelajar && rpp.pengalamanBelajar.length > 0) {
    rpp.pengalamanBelajar.forEach((p) => {
      rppHtml += `
        <div style="font-size: 11pt; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Pertemuan Ke-${p.pertemuanKe} (${p.alokasiWaktu})</div>
        <table style="width: 100%;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="width: 15%;">Tahapan</th>
              <th style="width: 35%;">Aktivitas Guru (Mengajar Mandiri)</th>
              <th style="width: 35%;">Aktivitas Siswa (Belajar Mendalam)</th>
              <th style="width: 15%;">Nilai Karakter & Integritas</th>
            </tr>
          </thead>
          <tbody>
      `;
      if (p.kegiatan && p.kegiatan.length > 0) {
        p.kegiatan.forEach((k) => {
          rppHtml += `
            <tr>
              <td><strong>${k.tahap}</strong></td>
              <td>${k.aktivitasGuru}</td>
              <td>${k.aktivitasSiswa}</td>
              <td>
                <em>${k.nilaiIntegritas}</em><br />
                <span style="font-size: 9pt; color: #444;">(${k.prinsipDeepLearning})</span>
              </td>
            </tr>
          `;
        });
      }
      rppHtml += `
          </tbody>
        </table>
      `;
    });
  } else {
    rppHtml += `<p style="font-style: italic;">Belum ada draf pengalaman belajar.</p>`;
  }

  rppHtml += `
    <div className="section-title">IV. EVALUASI DAN ASESMEN</div>
    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 30%;"><strong>Asesmen Awal</strong></td>
          <td>${rpp.asesmenPembelajaran.asesmenAwal || "-"}</td>
        </tr>
        <tr>
          <td><strong>Asesmen Proses</strong></td>
          <td>${rpp.asesmenPembelajaran.asesmenProses || "-"}</td>
        </tr>
        <tr>
          <td><strong>Asesmen Akhir</strong></td>
          <td>${rpp.asesmenPembelajaran.asesmenAkhir || "-"}</td>
        </tr>
      </tbody>
    </table>
  `;

  // Rubriks
  const rubrikList = [
    { label: "Rubrik Asesmen Awal (Kesiapan Belajar)", data: rpp.lampiran?.rubrikAwal },
    { label: "Rubrik Observasi Sikap & Integritas", data: rpp.lampiran?.rubrikObservasi },
    { label: "Rubrik Kinerja Praktik / Keterampilan", data: rpp.lampiran?.rubrikKinerja },
    { label: "Rubrik Tes Tulis Konsep", data: rpp.lampiran?.rubrikTesTulis },
    { label: "Rubrik Kolaborasi Diskusi Kelompok", data: rpp.lampiran?.rubrikDiskusi },
  ];

  rppHtml += `<div className="section-title">V. LAMPIRAN RUBRIK PENILAIAN SECARA RINCI</div>`;
  rubrikList.forEach((rub) => {
    if (rub.data && rub.data.length > 0) {
      rppHtml += `
        <div style="font-size: 11pt; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">${rub.label}</div>
        <table style="width: 100%;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="width: 20%;">Kriteria Penilaian</th>
              <th>Skor 4 (Sangat Baik)</th>
              <th>Skor 3 (Baik)</th>
              <th>Skor 2 (Cukup)</th>
              <th>Skor 1 (Perlu Bimbingan)</th>
            </tr>
          </thead>
          <tbody>
      `;
      rub.data.forEach((row) => {
        rppHtml += `
          <tr>
            <td><strong>${row.kriteria}</strong></td>
            <td>${row.skor4}</td>
            <td>${row.skor3}</td>
            <td>${row.skor2}</td>
            <td>${row.skor1}</td>
          </tr>
        `;
      });
      rppHtml += `
          </tbody>
        </table>
      `;
    }
  });


  // === DOKUMEN 2: MATERI AJAR ===
  let materiHtml = `
    <div className="kop-title">
      <h3>RINGKASAN BUKU MATERI AJAR SISWA</h3>
      <h4>MATA PELAJARAN: ${inputs.mataPelajaran ? inputs.mataPelajaran.toUpperCase() : "MATA PELAJARAN"}</h4>
      <p>Administrasi Kurikulum SMK Pusat Keunggulan - Integrasi Nilai Karakter</p>
      <hr style="border: 0; border-top: 2px double black; margin: 10px 0;" />
    </div>

    <table className="no-border-table" style="width: 100%; margin-bottom: 15px;">
      <tbody>
        <tr style="font-size: 11pt;">
          <td style="width: 20%;"><strong>Materi Pokok</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 77%;">${inputs.materiPembelajaran || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td><strong>Guru Pengampu</strong></td>
          <td>:</td>
          <td>${inputs.namaGuru || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td><strong>Fase / Kelas / Smt</strong></td>
          <td>:</td>
          <td>${inputs.faseKelasSemester || "-"}</td>
        </tr>
      </tbody>
    </table>

    <div className="section-header">I. RINGKASAN MATERI UTAMA</div>
    <p className="content-p">${materi.ringkasanMateri || "-"}</p>

    <div className="section-header">II. PENJABARAN TUJUAN, LITERASI, DAN INTEGRITAS SIKAP</div>
    <p className="content-p">${materi.penjabaranTujuan || "-"}</p>

    <div className="section-header">III. PETA KONSEP INTI PEMBELAJARAN</div>
    <ul style="padding-left: 20px; margin-bottom: 15px;">
  `;

  if (materi.petaKonsep && materi.petaKonsep.length > 0) {
    materi.petaKonsep.forEach((p) => {
      materiHtml += `<li className="list-item">${p}</li>`;
    });
  } else {
    materiHtml += `<li className="list-item">-</li>`;
  }

  materiHtml += `
    </ul>

    <div className="section-header">IV. PENJABARAN SUB-BAB MATERI KOMPREHENSIF</div>
  `;

  if (materi.subBab && materi.subBab.length > 0) {
    materi.subBab.forEach((sub) => {
      materiHtml += `
        <div style="margin-top: 10px; margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 11pt; margin-bottom: 4px;">${sub.judul}</div>
          <p className="content-p">${sub.konten}</p>
          ${sub.visualHighlight ? `
            <div style="margin-left: 0.5in; font-style: italic; font-size: 10pt; color: #333; border-left: 3px solid #ccc; padding-left: 8px; margin-top: 5px; margin-bottom: 10px;">
              <strong>Ilustrasi Visual / Konfigurasi CLI:</strong> ${sub.visualHighlight}
            </div>
          ` : ""}
        </div>
      `;
    });
  }

  materiHtml += `
    <div className="section-header">V. GLOSARIUM TELEKOMUNIKASI JARINGAN IP</div>
    <table style="width: 100%;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="width: 30%;">Istilah Teknik</th>
          <th>Definisi & Penjelasan Administrasi</th>
        </tr>
      </thead>
      <tbody>
  `;

  if (materi.glosarium && materi.glosarium.length > 0) {
    materi.glosarium.forEach((g) => {
      materiHtml += `
        <tr>
          <td><strong>${g.istilah}</strong></td>
          <td>${g.definisi}</td>
        </tr>
      `;
    });
  } else {
    materiHtml += `
      <tr>
        <td colspan="2" style="text-align: center; font-style: italic;">Glosarium kosong.</td>
      </tr>
    `;
  }

  materiHtml += `
      </tbody>
    </table>
  `;


  // === DOKUMEN 3: LKPD ===
  let lkpdHtml = `
    <div className="kop-title">
      <h3>LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL</h3>
      <h4>MATA PELAJARAN: ${inputs.mataPelajaran ? inputs.mataPelajaran.toUpperCase() : "MATA PELAJARAN"}</h4>
      <p>Administrasi Kurikulum SMK Pusat Keunggulan - Integrasi Nilai Karakter</p>
      <hr style="border: 0; border-top: 2px double black; margin: 10px 0;" />
    </div>

    <table className="no-border-table" style="width: 100%; margin-bottom: 15px;">
      <tbody>
        <tr style="font-size: 11pt;">
          <td style="width: 20%;"><strong>Sekolah</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 32%;">${inputs.namaSekolah || "-"}</td>
          <td style="width: 20%;"><strong>Kelas/Semester</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 22%;">${inputs.faseKelasSemester || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td style="padding: 2px 0;"><strong>Mata Pelajaran</strong></td>
          <td>:</td>
          <td>${inputs.mataPelajaran || "-"}</td>
          <td style="padding: 2px 0;"><strong>Alokasi Waktu</strong></td>
          <td>:</td>
          <td>${lkpd.identitas?.alokasiWaktu || inputs.alokasiWaktu || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td style="padding: 2px 0;"><strong>Materi Pokok</strong></td>
          <td>:</td>
          <td>${lkpd.identitas?.materiPokok || inputs.materiPembelajaran || "-"}</td>
          <td style="padding: 2px 0;"><strong>Siswa / Kelompok</strong></td>
          <td>:</td>
          <td>_______________________</td>
        </tr>
      </tbody>
    </table>

    <div className="section-header">I. PETUNJUK BELAJAR DAN KESELAMATAN KERJA (K3)</div>
    <ul style="padding-left: 20px; margin-bottom: 15px;">
  `;

  if (lkpd.petunjukBelajar && lkpd.petunjukBelajar.length > 0) {
    lkpd.petunjukBelajar.forEach((p) => {
      lkpdHtml += `<li className="list-item">${p}</li>`;
    });
  }

  lkpdHtml += `
    </ul>

    <div className="section-header">II. TUJUAN PRAKTIKUM TERUKUR</div>
    <p className="content-p">${lkpd.tujuanPraktikum || "-"}</p>

    <div className="section-header">III. STUDI KASUS DUNIA KERJA (SOP INDUSTRI)</div>
    <p className="content-p">${lkpd.skenarioDuniaNyata || "-"}</p>

    <div className="section-header">IV. ALAT DAN BAHAN</div>
    <ul style="padding-left: 20px; margin-bottom: 15px;">
  `;

  if (lkpd.alatBahan && lkpd.alatBahan.length > 0) {
    lkpd.alatBahan.forEach((a) => {
      lkpdHtml += `<li className="list-item">${a}</li>`;
    });
  }

  lkpdHtml += `
    </ul>

    <div className="section-header">V. LANGKAH KERJA & FOKUS INTEGRITAS NYATA</div>
  `;

  if (lkpd.langkahKerja && lkpd.langkahKerja.length > 0) {
    lkpd.langkahKerja.forEach((l) => {
      lkpdHtml += `
        <div style="margin-top: 10px; margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 11pt; margin-bottom: 4px;">${l.langkah}</div>
          <p className="content-p">${l.detail}</p>
          ${l.visualHint ? `
            <div style="margin-left: 0.5in; font-style: italic; font-size: 10pt; color: #444;">
              <strong>Petunjuk Visual / Skema:</strong> ${l.visualHint}
            </div>
          ` : ""}
          ${l.fokusIntegritas ? `
            <div style="margin-left: 0.5in; font-size: 10pt; color: #003366; background-color: #f0f7ff; padding: 4px; border-left: 3px solid #0056b3; margin-top: 5px;">
              🛡️ <strong>Integritas Praktikum:</strong> ${l.fokusIntegritas}
            </div>
          ` : ""}
        </div>
      `;
    });
  }

  lkpdHtml += `
    <div className="section-header">VI. TANTANGAN BERPIKIR KRITIS (SOAL HOTS)</div>
  `;

  if (lkpd.pertanyaanHots && lkpd.pertanyaanHots.length > 0) {
    lkpd.pertanyaanHots.forEach((q) => {
      lkpdHtml += `
        <div style="margin-top: 10px; margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 11pt; margin-bottom: 2px;">Soal No. ${q.nomor} (HOTS Analitis)</div>
          <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Pertanyaan:</strong> ${q.soal}</p>
          <p style="font-size: 10pt; font-style: italic; color: #555; margin: 0 0 5px 0;"><strong>Skenario Masalah:</strong> ${q.skenarioKasus}</p>
          <p style="font-size: 10pt; color: #003300; margin: 0;"><strong>Petunjuk Analisis Guru:</strong> ${q.petunjukAnalisis}</p>
        </div>
      `;
    });
  }

  lkpdHtml += `
    <div className="section-header">VII. REFLEKSI KARAKTER & INTEGRITAS GURU DAN SISWA</div>
  `;

  if (lkpd.refleksiIntegritas && lkpd.refleksiIntegritas.length > 0) {
    lkpd.refleksiIntegritas.forEach((r, idx) => {
      lkpdHtml += `
        <div style="margin-top: 10px; margin-bottom: 10px;">
          <div style="font-weight: bold; font-size: 11pt; margin-bottom: 2px;">Refleksi ${idx + 1}</div>
          <p style="font-size: 11pt; margin: 0 0 4px 0;"><strong>Pertanyaan Refleksi:</strong> ${r.pertanyaan}</p>
          <p style="font-size: 10.5pt; font-style: italic; color: #333; margin: 0;"><strong>Harapan Penerapan Nyata:</strong> ${r.penjelasanPenerapan}</p>
        </div>
      `;
    });
  }


  // === DOKUMEN 4: EVALUASI & ASESMEN ===
  let asesmenHtml = `
    <div className="kop-title">
      <h3>INSTRUMEN EVALUASI & ASESMEN PEMBELAJARAN</h3>
      <h4>MATA PELAJARAN: ${inputs.mataPelajaran ? inputs.mataPelajaran.toUpperCase() : "MATA PELAJARAN"}</h4>
      <p>Administrasi Kurikulum SMK Pusat Keunggulan - Kunci Jawaban Lengkap Guru</p>
      <hr style="border: 0; border-top: 2px double black; margin: 10px 0;" />
    </div>

    <table className="no-border-table" style="width: 100%; margin-bottom: 15px;">
      <tbody>
        <tr style="font-size: 11pt;">
          <td style="width: 20%;"><strong>Mata Pelajaran</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 32%;">${inputs.mataPelajaran || "-"}</td>
          <td style="width: 20%;"><strong>Kelas/Semester</strong></td>
          <td style="width: 3%;">:</td>
          <td style="width: 22%;">${inputs.faseKelasSemester || "-"}</td>
        </tr>
        <tr style="font-size: 11pt;">
          <td style="padding: 2px 0;"><strong>Materi Pokok</strong></td>
          <td>:</td>
          <td>${inputs.materiPembelajaran || "-"}</td>
          <td style="padding: 2px 0;"><strong>Guru Pengampu</strong></td>
          <td>:</td>
          <td>${inputs.namaGuru || "-"}</td>
        </tr>
      </tbody>
    </table>

    <div className="section-header">BAGIAN A: PILIHAN GANDA (10 BUTIR FORMATIF INTEGRATIF)</div>
  `;

  if (asesmen.pilihanGanda && asesmen.pilihanGanda.length > 0) {
    asesmen.pilihanGanda.forEach((q) => {
      asesmenHtml += `
        <div style="margin-top: 10px; margin-bottom: 15px; page-break-inside: avoid;">
          <div style="font-weight: bold; font-size: 11pt; margin-bottom: 4px;">${q.nomor}. ${q.pertanyaan}</div>
          <div style="margin-left: 20px; font-size: 11pt; line-height: 1.3;">
            A. ${q.opsi?.A || ""}<br />
            B. ${q.opsi?.B || ""}<br />
            C. ${q.opsi?.C || ""}<br />
            D. ${q.opsi?.D || ""}<br />
            E. ${q.opsi?.E || ""}
          </div>
          <div style="margin-top: 5px; margin-left: 20px; font-size: 10.5pt; color: #004d00; background-color: #f2fff2; border-left: 3px solid #008000; padding: 4px;">
            <strong>Kunci Jawaban:</strong> ${q.kunci}<br />
            <strong>Pembahasan Rinci:</strong> ${q.pembahasan}
          </div>
        </div>
      `;
    });
  }

  asesmenHtml += `
    <div className="section-header" style="margin-top: 20px;">BAGIAN B: SOAL ESAI (5 BUTIR ANALITIS TINGKAT TINGGI / HOTS)</div>
  `;

  if (asesmen.esai && asesmen.esai.length > 0) {
    asesmen.esai.forEach((q) => {
      asesmenHtml += `
        <div style="margin-top: 10px; margin-bottom: 15px; page-break-inside: avoid;">
          <div style="font-weight: bold; font-size: 11pt; margin-bottom: 4px;">${q.nomor}. ${q.pertanyaan}</div>
          <div style="margin-left: 20px; font-size: 10.5pt; color: #4d0000; background-color: #fff2f2; border-left: 3px solid #800000; padding: 6px; margin-top: 5px;">
            <strong>Kunci Jawaban Guru:</strong><br />
            <span style="white-space: pre-wrap;">${q.kunciJawaban}</span>
            <hr style="border: 0; border-top: 1px solid #d9c5c5; margin: 5px 0;" />
            <strong>Rubrik Penilaian:</strong> ${q.rubrikPenilaian}
          </div>
        </div>
      `;
    });
  }


  // === Tanda Tangan Pengesahan ===
  const ttdHtml = `
    <div className="page-break"></div>
    <div style="margin-top: 40px; text-align: center;">
      <h3 style="font-size: 12pt; font-weight: bold;">HALAMAN PENGESAHAN ADMINISTRASI PEMBELAJARAN</h3>
      <p style="font-size: 11pt;">Telah diperiksa, divalidasi, dan disahkan untuk digunakan dalam KBM di kelas.</p>
    </div>

    <table className="no-border-table" style="width: 100%; margin-top: 40px; border: none;">
      <tbody>
        <tr style="font-size: 11pt; border: none;">
          <td style="width: 50%; border: none; text-align: center;">
            Mengetahui,<br />
            Kepala Sekolah ${inputs.namaSekolah || "SMK"}<br /><br /><br /><br /><br />
            <strong>__________________________</strong><br />
            NIP. _______________________
          </td>
          <td style="width: 50%; border: none; text-align: center;">
            Tegal, 28 Juni 2026<br />
            Guru Mata Pelajaran,<br /><br /><br /><br /><br />
            <strong>${inputs.namaGuru || "_____________________"}</strong><br />
            NIP. _______________________
          </td>
        </tr>
      </tbody>
    </table>
  `;

  // Combine into a cohesive Word Document template
  const finalHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>Administrasi Guru Terintegrasi - SIAP GURU</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        ${headStyle}
      </head>
      <body>
        <div class="Section1">
          <!-- SECTION 1: RPP -->
          ${rppHtml}
          
          <div class="page-break"></div>
          
          <!-- SECTION 2: MATERI AJAR -->
          ${materiHtml}
          
          <div class="page-break"></div>
          
          <!-- SECTION 3: LKPD -->
          ${lkpdHtml}
          
          <div class="page-break"></div>
          
          <!-- SECTION 4: ASESMEN -->
          ${asesmenHtml}
          
          <!-- SECTION 5: SIGNATURES -->
          ${ttdHtml}
        </div>
      </body>
    </html>
  `;

  // Create standard file blob and trigger browser download
  const blob = new Blob(["\ufeff" + finalHtml], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const defaultFileName = `SIAP_GURU_Administrasi_${inputs.materiPembelajaran ? inputs.materiPembelajaran.replace(/\s+/g, "_") : "Lengkap"}.doc`;
  a.href = url;
  a.download = defaultFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
