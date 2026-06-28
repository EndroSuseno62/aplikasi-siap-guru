/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeacherInputs {
  namaSekolah: string;
  namaGuru: string;
  mataPelajaran: string;
  faseKelasSemester: string;
  alokasiWaktu: string;
  capaianPembelajaran: string;
  materiPembelajaran: string;
  topikPembelajaran: string;
  tujuanPembelajaran: string;
  modelPembelajaran: string;
  nilaiIntegritas: string[];
  karakteristikPesertaDidik: string;
}

export interface RubrikKriteria {
  kriteria: string;
  skor4: string; // Sangat Baik
  skor3: string; // Baik
  skor2: string; // Cukup
  skor1: string; // Perlu Bimbingan
}

export interface KegiatanBelajar {
  tahap: string;
  aktivitasGuru: string;
  aktivitasSiswa: string;
  nilaiIntegritas: string;
  prinsipDeepLearning: string;
}

export interface RPPData {
  identifikasi: {
    pesertaDidik: string;
    materiPelajaran: string;
    dimensiProfilLulusan: {
      dpl: string;
      alasan: string;
    };
    capaianPembelajaran: string;
    lintasDisiplinIlmu: string;
    tujuanPembelajaran: string; // format ABCD
  };
  desainPembelajaran: {
    topikPembelajaran: string;
    praktikPedagogis: {
      model: string;
      alasan: string;
    };
    kemitraanPembelajaran: string;
    lingkunganPembelajaran: string;
    pemanfaatanDigital: string;
  };
  pengalamanBelajar: {
    pertemuanKe: number;
    alokasiWaktu: string;
    kegiatan: KegiatanBelajar[];
  }[];
  asesmenPembelajaran: {
    asesmenAwal: string;
    asesmenProses: string;
    asesmenAkhir: string;
  };
  lampiran: {
    rubrikAwal: RubrikKriteria[];
    rubrikObservasi: RubrikKriteria[];
    rubrikKinerja: RubrikKriteria[];
    rubrikTesTulis: RubrikKriteria[];
    rubrikDiskusi: RubrikKriteria[];
  };
}

export interface SubBabMateri {
  judul: string;
  konten: string;
  visualHighlight?: string; // Penjelasan visual / ilustrasi
}

export interface GlosariumItem {
  istilah: string;
  definisi: string;
}

export interface MateriData {
  judul: string;
  ringkasanMateri: string;
  penjabaranTujuan: string;
  petaKonsep: string[];
  subBab: SubBabMateri[];
  glosarium: GlosariumItem[];
}

export interface LangkahKerjaLKPD {
  langkah: string;
  detail: string;
  visualHint?: string; // Tip bergambar / deskripsi diagram packet tracer
  fokusIntegritas?: string; // Bagaimana nilai integritas dipraktikkan di langkah ini
}

export interface PertanyaanHotsLKPD {
  nomor: number;
  soal: string;
  skenarioKasus: string;
  petunjukAnalisis: string;
}

export interface LKPDData {
  identitas: {
    namaSekolah: string;
    mataPelajaran: string;
    kelasSemester: string;
    materiPokok: string;
    alokasiWaktu: string;
    namaSiswaAtauKelompok: string;
  };
  petunjukBelajar: string[];
  tujuanPraktikum: string;
  skenarioDuniaNyata: string;
  alatBahan: string[];
  langkahKerja: LangkahKerjaLKPD[];
  pertanyaanHots: PertanyaanHotsLKPD[];
  refleksiIntegritas: {
    pertanyaan: string;
    penjelasanPenerapan: string;
  }[];
}

export interface PilihanGandaSoal {
  nomor: number;
  pertanyaan: string;
  opsi: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  kunci: string;
  pembahasan: string;
}

export interface EsaiSoal {
  nomor: number;
  pertanyaan: string;
  kunciJawaban: string;
  rubrikPenilaian: string;
}

export interface AsesmenData {
  pilihanGanda: PilihanGandaSoal[];
  esai: EsaiSoal[];
}

export interface SIAPGURUData {
  inputs: TeacherInputs;
  rpp: RPPData;
  materi: MateriData;
  lkpd: LKPDData;
  asesmen: AsesmenData;
}
