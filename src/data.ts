/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SIAPGURUData } from "./types";

export const emptySIAPGURUData: SIAPGURUData = {
  inputs: {
    namaSekolah: "",
    namaGuru: "",
    mataPelajaran: "",
    faseKelasSemester: "",
    alokasiWaktu: "",
    capaianPembelajaran: "",
    materiPembelajaran: "",
    topikPembelajaran: "",
    tujuanPembelajaran: "",
    modelPembelajaran: "Problem Based Learning",
    nilaiIntegritas: [],
    karakteristikPesertaDidik: ""
  },
  rpp: {
    identifikasi: {
      pesertaDidik: "",
      materiPelajaran: "",
      dimensiProfilLulusan: {
        dpl: "",
        alasan: ""
      },
      capaianPembelajaran: "",
      lintasDisiplinIlmu: "",
      tujuanPembelajaran: ""
    },
    desainPembelajaran: {
      topikPembelajaran: "",
      praktikPedagogis: {
        model: "",
        alasan: ""
      },
      kemitraanPembelajaran: "",
      lingkunganPembelajaran: "",
      pemanfaatanDigital: ""
    },
    pengalamanBelajar: [],
    asesmenPembelajaran: {
      asesmenAwal: "",
      asesmenProses: "",
      asesmenAkhir: ""
    },
    lampiran: {
      rubrikAwal: [],
      rubrikObservasi: [],
      rubrikKinerja: [],
      rubrikTesTulis: [],
      rubrikDiskusi: []
    }
  },
  materi: {
    judul: "",
    ringkasanMateri: "",
    penjabaranTujuan: "",
    petaKonsep: [],
    subBab: [],
    glosarium: []
  },
  lkpd: {
    identitas: {
      namaSekolah: "",
      mataPelajaran: "",
      kelasSemester: "",
      materiPokok: "",
      alokasiWaktu: "",
      namaSiswaAtauKelompok: ""
    },
    petunjukBelajar: [],
    tujuanPraktikum: "",
    skenarioDuniaNyata: "",
    alatBahan: [],
    langkahKerja: [],
    pertanyaanHots: [],
    refleksiIntegritas: []
  },
  asesmen: {
    pilihanGanda: [],
    esai: []
  }
};

export const defaultSIAPGURUData: SIAPGURUData = emptySIAPGURUData;

export const demoVoIPData: SIAPGURUData = {
  inputs: {
    namaSekolah: "SMK Negeri 2 Tegal",
    namaGuru: "Endro Suseno",
    mataPelajaran: "Teknologi Jaringan Kabel dan Nirkabel",
    faseKelasSemester: "F / XI / Genap",
    alokasiWaktu: "4 JP @ 45 menit",
    capaianPembelajaran: "Pada akhir fase F, peserta didik mampu menginstalasi jaringan kabel dan nirkabel, melakukan perawatan dan perbaikan jaringan kabel dan nirkabel, memahami standar jaringan nirkabel, memilih teknologi jaringan nirkabel indoor dan outdoor sesuai kebutuhan, melakukan instalasi perangkat jaringan nirkabel, menguji instalasi perangkat jaringan nirkabel, menjelaskan konsep layanan Voice over IP (VoIP), mengkonfigurasi layanan Voice over IP (VoIP), memahami jaringan fiber optic, memahami jenis-jenis kabel fiber optic, memilih kabel fiber optic, menerapkan fungsi alat kerja fiber optic, menggunakan alat kerja fiber optic, melakukan sambungan fiber optic, dan melakukan perbaikan jaringan fiber optic.",
    materiPembelajaran: "Konfigurasi VoIP dengan Router",
    topikPembelajaran: "Praktikum VoIP",
    tujuanPembelajaran: "Menerapkan instalasi dan konfigurasi layanan Voice over IP (VoIP) dengan Router",
    modelPembelajaran: "Problem Based Learning",
    nilaiIntegritas: ["jujur", "tanggung jawab", "disiplin", "mandiri", "kerja keras"],
    karakteristikPesertaDidik: "Murid telah memahami aplikasi cisco packet tracert pada mata pelajaran yang lain pada fase sebelumnya"
  },
  rpp: {
    identifikasi: {
      pesertaDidik: "Peserta didik kelas XI Konsentrasi Keahlian Teknik Komputer dan Jaringan (TKJ) yang telah memahami dasar-dasar pengalamatan IP, subnetting, dan penggunaan simulator Cisco Packet Tracer pada semester sebelumnya.",
      materiPelajaran: "Teknologi Jaringan Kabel dan Nirkabel - Konfigurasi VoIP dengan Router (Sub-Materi: IP Phone, Dial Peer, Voice VLAN, DHCP Pool Voice).",
      dimensiProfilLulusan: {
        dpl: "DPL 3 Penalaran Kritis & DPL 5 Kolaborasi",
        alasan: "Penalaran Kritis (DPL 3) dipilih karena peserta didik harus menganalisis skema pengalamatan IP dan merancang rute dial-peer agar paket suara terkirim secara tepat. Kolaborasi (DPL 5) dipilih karena peserta didik bekerja berpasangan dalam menguji komunikasi suara antardua segmen jaringan VoIP yang berbeda, menguatkan empati dan komunikasi profesional."
      },
      capaianPembelajaran: "Pada akhir fase F, peserta didik mampu menjelaskan konsep layanan Voice over IP (VoIP), mengkonfigurasi layanan Voice over IP (VoIP), menginstalasi perangkat jaringan nirkabel, menguji instalasi perangkat jaringan nirkabel, dan menerapkan fungsi alat kerja serta melakukan sambungan jaringan komunikasi.",
      lintasDisiplinIlmu: "Bahasa Inggris (istilah teknis telekomunikasi seperti Dial Peer, Voice VLAN, IP Routing) dan Matematika Terapan (penghitungan kapasitas bandwidth panggilan suara dan subnetting jaringan).",
      tujuanPembelajaran: "Melalui model Problem Based Learning (Condition), peserta didik kelas XI (Audience) dapat merancang dan mengonfigurasi layanan VoIP menggunakan Router Cisco di Cisco Packet Tracer (Behavior) dengan tingkat keberhasilan panggilan (dial-in) 100% lancar dan jernih tanpa loss (Degree), dengan menjunjung tinggi nilai Tanggung Jawab dalam ketepatan kabel interkoneksi, serta Jujur dan Mandiri dalam pengerjaan lembar kerja tanpa menjiplak."
    },
    desainPembelajaran: {
      topikPembelajaran: "Instalasi dan Uji Konfigurasi Layanan Voice over IP (VoIP) menggunakan Router Cisco dan IP Phone.",
      praktikPedagogis: {
        model: "Problem Based Learning (PBL)",
        alasan: "VoIP memiliki kompleksitas konfigurasi yang tinggi di mana error sekecil apa pun pada DHCP atau VLAN akan menggagalkan register IP Phone. Model PBL merangsang peserta didik memecahkan masalah nyata kegagalan registrasi IP Phone (studi kasus telepon 'unconfigured' atau 'discovering router') melalui proses penyelidikan mandiri, eksperimen konfigurasi, dan analisis log debug."
      },
      kemitraanPembelajaran: "Pembelajaran diselaraskan dengan standar industri PT Telkom Indonesia divisi Network Operation, memperkenalkan standar SOP instalasi infrastruktur telekomunikasi IP.",
      lingkunganPembelajaran: "Laboratorium Komputer Jaringan komputer berbasis Client-Server, dilengkapi dengan proyektor untuk demonstrasi, papan tulis interaktif, dan software Cisco Packet Tracer terpasang di masing-masing PC.",
      pemanfaatanDigital: "Simulator Cisco Packet Tracer (Virtual Laboratorium), Google Classroom untuk pendistribusian LKPD digital, dan aplikasi Mentimeter untuk refleksi interaktif di akhir sesi pembelajaran."
    },
    pengalamanBelajar: [
      {
        pertemuanKe: 1,
        alokasiWaktu: "4 JP @ 45 Menit",
        kegiatan: [
          {
            tahap: "Awal (Pendahuluan - 15 Menit)",
            aktivitasGuru: "Guru membuka kelas dengan salam hangat, menanyakan kabar siswa secara tulus, memimpin doa bersama, dan memeriksa kehadiran siswa. Guru menampilkan video singkat tentang bagaimana panggilan telepon jarak jauh via internet (VoIP) menghemat biaya industri telekomunikasi (Apersepsi). Guru menantang siswa dengan pertanyaan pemantik: 'Mengapa kabel telepon lama bisa digantikan dengan kabel LAN data saat ini? Bagaimana suara kita diubah menjadi data digital di router?'",
            aktivitasSiswa: "Peserta didik merespons salam, berdoa dengan khidmat (pembiasaan religius), dan menyimak paparan guru dengan penuh antusias. Siswa menjawab pertanyaan pemantik secara aktif berdasarkan pemahaman awal mereka, menyadari pentingnya efisiensi teknologi VoIP di dunia industri.",
            nilaiIntegritas: "Disiplin: Hadir tepat waktu di lab jaringan. Peduli: Saling menyapa dan mendoakan kesembuhan rekan yang sakit sebelum belajar dimulai.",
            prinsipDeepLearning: "Mindful Learning (Berkesadaran): Siswa diajak menyadari napas dan memusatkan fokus sebelum masuk materi teknologi pelik. Joyful Learning (Menggembirakan): Video apersepsi dikemas menarik dan menantang rasa ingin tahu siswa secara seru."
          },
          {
            tahap: "Inti - Orientasi Masalah (Pemahaman - 30 Menit)",
            aktivitasGuru: "Guru memaparkan skenario masalah industri: 'Kantor SMK Negeri 2 Tegal baru saja membangun gedung B. Kepala sekolah ingin staf di gedung A dan gedung B dapat saling teleponan secara gratis menggunakan infrastruktur LAN yang ada tanpa membeli pulsa telepon PSTN. Namun, setelah tim IT memasang IP Phone, statusnya selalu \"Discovering Router...\" dan tidak mendapatkan nomor ekstensi.' Guru mendemonstrasikan dasar konfigurasi VoIP Router Cisco (telephony-service, max-dn, ip source-address).",
            aktivitasSiswa: "Peserta didik menyimak skenario masalah nyata, mencatat parameter-parameter penting (seperti IP Network, Range Extensi, Jumlah Kebutuhan IP Phone). Siswa menganalisis letak kesalahan pada simulasi awal yang ditampilkan oleh guru, mengajukan pertanyaan kritis mengenai konsep DHCP Voice dan Voice VLAN.",
            nilaiIntegritas: "Jujur: Mengakui jika belum paham saat sesi tanya jawab teori tanpa takut dinilai buruk. Tanggung Jawab: Mencatat materi instruksional dengan rapi.",
            prinsipDeepLearning: "Meaningful Learning (Bermakna): Masalah yang disajikan sangat kontekstual dengan lingkungan sekolah mereka sendiri, membuat teknologi VoIP terasa sangat dekat dan berguna untuk kehidupan mereka."
          },
          {
            tahap: "Inti - Mengorganisasi & Membimbing Penyelidikan (Aplikasi - 90 Menit)",
            aktivitasGuru: "Guru membagikan LKPD Praktikum VoIP kepada peserta didik (berpasangan namun laporan mandiri). Guru berkeliling memantau aktivitas konfigurasi, memotivasi peserta didik untuk mencari solusi dari kegagalan register IP Phone melalui pembacaan Command Line Interface (CLI) log. Guru menekankan pentingnya konfigurasi IP DHCP pool Option 150.",
            aktivitasSiswa: "Siswa membuka Cisco Packet Tracer dan mendesain topologi sesuai LKPD (1 Router, 1 Switch, 2 IP Phone). Siswa melakukan konfigurasi CLI langkah demi langkah: mengatur IP Address interface router, membuat DHCP pool untuk voice, mengaktifkan telephony service, dan mendistribusikan nomor telepon. Siswa mendiagnosis jika ada kabel yang salah tipe (misal crossover vs straight-through) atau port switch yang belum dikonfigurasi 'switchport voice vlan'.",
            nilaiIntegritas: "Mandiri: Mengonfigurasi CLI secara mandiri berdasarkan pemahaman sendiri, tidak asal menyalin script teman. Kerja Keras: Berusaha memecahkan error CLI secara tekun hingga IP Phone berstatus 'Connected' dan menampilkan nomor ekstensi.",
            prinsipDeepLearning: "Meaningful Learning (Bermakna): Siswa mempraktikkan langsung pengetahuan teoritis ke dalam simulasi yang mendekati kondisi perangkat keras riil. Joyful Learning (Menggembirakan): Terjadi momen kepuasan emosional yang tinggi saat IP phone virtual berhasil register dan berbunyi 'Ring' ketika dihubungi."
          },
          {
            tahap: "Inti - Mengembangkan & Menyajikan Hasil Karya (Merefleksi - 30 Menit)",
            aktivitasGuru: "Guru meminta perwakilan pasangan peserta didik untuk melakukan demo panggilan VoIP di depan kelas dan menjelaskan alur konfigurasi IP DHCP Pool Option 150 serta fungsi command 'telephony-service'. Guru memberikan penguatan teoretis.",
            aktivitasSiswa: "Perwakilan siswa mempresentasikan hasil simulasinya, menunjukkan proses 'dialing', 'ringing', dan 'connected' antardua IP Phone dengan nomor ekstensi yang berbeda (misal Ext 1001 memanggil Ext 1002). Siswa menjawab pertanyaan dari guru dan rekan-rekan kelas dengan sopan.",
            nilaiIntegritas: "Berani: Tampil mempresentasikan hasil karya di depan kelas dengan penuh percaya diri dan sopan santun. Jujur: Menunjukkan hasil konfigurasi apa adanya termasuk jika terdapat bug kecil yang belum tuntas.",
            prinsipDeepLearning: "Meaningful & Mindful: Siswa merefleksikan proses belajar mereka, mengaitkan antara sintaks CLI dengan hasil fisik (telepon berdering), memvalidasi logika penalarannya sendiri."
          },
          {
            tahap: "Penutup (Refleksi & Evaluasi - 15 Menit)",
            aktivitasGuru: "Guru bersama siswa merangkum pembelajaran hari ini. Guru memandu refleksi menggunakan pertanyaan: 'Nilai integritas apa yang paling kalian rasakan penting saat mengonfigurasi VoIP tadi? Bagaimana ketelitian memengaruhi keberhasilan sistem?' Guru memberikan apresiasi atas kerja keras semua siswa dan menutup dengan doa bersama.",
            aktivitasSiswa: "Peserta didik menyimpulkan materi bersama guru. Siswa mengisi refleksi nilai integritas (misal: pentingnya Tanggung Jawab dalam ketelitian sintaks CLI agar VoIP berjalan). Kelas ditutup dengan doa bersama dan siswa merapikan kembali lab komputer.",
            nilaiIntegritas: "Tanggung Jawab: Merapikan kursi, mematikan komputer sesuai SOP lab, dan membuang sampah pada tempatnya sebelum meninggalkan ruang laboratorium.",
            prinsipDeepLearning: "Mindful Learning: Menutup kelas dengan hening sejenak, mensyukuri ilmu baru yang didapat, menyelaraskan pikiran sebelum beralih ke aktivitas selanjutnya."
          }
        ]
      }
    ],
    asesmenPembelajaran: {
      asesmenAwal: "Tes lisan singkat di awal kelas mengenai pemahaman dasar IP Address dan fungsi Cisco Packet Tracer pada pertemuan sebelumnya untuk mengukur kesiapan belajar siswa (Readiness).",
      asesmenProses: "Observasi aktivitas praktikum terbimbing menggunakan Rubrik Observasi Sikap & Integritas serta Rubrik Diskusi Kelompok saat siswa melakukan troubleshooting mandiri konfigurasi VoIP.",
      asesmenAkhir: "Tes praktik terstruktur (menguji hasil konfigurasi VoIP pada simulator) dinilai dengan Rubrik Kinerja Praktik, ditambah tes tertulis berupa 10 butir pilihan ganda dan 5 butir esai di akhir unit pembelajaran."
    },
    lampiran: {
      rubrikAwal: [
        {
          kriteria: "Pemahaman IP Addressing",
          skor4: "Sangat memahami pembagian subnet, mampu menjelaskan fungsi default gateway dan network ID dengan lancar tanpa ragu.",
          skor3: "Memahami pembagian subnet, mampu mengonfigurasi IP statis pada PC klien dengan benar namun butuh sedikit bimbingan pada subnet mask non-default.",
          skor2: "Cukup memahami konsep IP Address, namun masih kebingungan membedakan IP Router dengan IP Client dalam satu network.",
          skor1: "Belum memahami konsep IP Address, tidak bisa menentukan IP yang berada dalam satu segmen jaringan."
        },
        {
          kriteria: "Keterampilan Cisco Packet Tracer",
          skor4: "Sangat mahir mencari device, menghubungkan kabel straight/cross dengan tepat, dan mahir menggunakan CLI router secara mandiri.",
          skor3: "Mampu merancang topologi dasar dan menghubungkan device dengan kabel yang benar, serta tahu cara masuk ke menu CLI.",
          skor2: "Mampu menyusun device namun sering keliru memilih jenis kabel (misalnya keliru menggunakan kabel console untuk LAN).",
          skor1: "Belum bisa mengoperasikan menu Cisco Packet Tracer dasar, membutuhkan bimbingan penuh untuk meletakkan device."
        }
      ],
      rubrikObservasi: [
        {
          kriteria: "Tanggung Jawab & Kemandirian",
          skor4: "Menunjukkan tanggung jawab luar biasa atas tugasnya, menyelesaikan praktikum mandiri tanpa bergantung pada pekerjaan orang lain, dan merapikan lab.",
          skor3: "Bertanggung jawab menyelesaikan praktikum tepat waktu, berusaha memecahkan error sendiri sebelum bertanya ke teman.",
          skor2: "Menyelesaikan praktikum namun butuh dorongan terus-menerus, sering melihat konfigurasi teman tanpa memahaminya.",
          skor1: "Tidak menyelesaikan tugas praktikum, membiarkan simulator kosong dan mengganggu konsentrasi rekan kerja lainnya."
        },
        {
          kriteria: "Kedisiplinan & Kejujuran",
          skor4: "Sangat disiplin mengikuti instruksi K3 di lab, menuliskan konfigurasi orisinal hasil usahanya, serta mengakui kesalahan konfigurasi secara jujur.",
          skor3: "Disiplin mengikuti instruksi, menuliskan laporan konfigurasi orisinal, mengumpulkan tugas tepat waktu.",
          skor2: "Cukup disiplin, namun sempat menyalin beberapa baris CLI teman tanpa memahami kegunaan baris perintah tersebut.",
          skor1: "Tidak disiplin, masuk lab terlambat tanpa alasan logis, dan menyalin mentah-mentah file simulator (.pkt) milik teman lain."
        }
      ],
      rubrikKinerja: [
        {
          kriteria: "Desain Topologi & Kabel",
          skor4: "Topologi dirancang sangat rapi sesuai instruksi LKPD, pemilihan interface terencana dengan baik (misal FastEthernet 0/1 untuk switch port 1).",
          skor3: "Topologi dirancang dengan benar, kabel terhubung dengan baik, namun tata letak device sedikit kurang rapi.",
          skor2: "Topologi berhasil terhubung, namun ada kesalahan minor dalam pemilihan kabel yang memperlambat koneksi.",
          skor1: "Topologi salah total, menggunakan kabel yang tidak kompatibel sehingga status port merah (shutdown/down)."
        },
        {
          kriteria: "Konfigurasi CLI VoIP Router",
          skor4: "Sintaks CLI ditulis dengan sempurna (IP DHCP pool, telephony-service, max-dn, dial-peer) tanpa terjadi error sintaks sekali pun.",
          skor3: "Sintaks CLI dikonfigurasi dengan benar, VoIP berhasil register namun membutuhkan 1-2 kali perbaikan pada konfigurasi DHCP.",
          skor2: "CLI terkonfigurasi sebagian, IP Phone mendapatkan IP Address namun nomor ekstensi gagal muncul karena telephony-service tidak aktif.",
          skor1: "Gagal menuliskan CLI VoIP, router tidak dikonfigurasi sama sekali sehingga fungsi telephony tidak berjalan."
        },
        {
          kriteria: "Hasil Pengujian Panggilan",
          skor4: "Panggilan suara antar-IP Phone berhasil 100% (Connected / Dialed), status display IP Phone menampilkan nomor ekstensi tujuan dengan tepat.",
          skor3: "Panggilan berhasil tersambung, namun ada delay atau perlu dilakukan shut/no shut berulang kali pada port switch agar register.",
          skor2: "Panggilan gagal tersambung, IP Phone menampilkan status 'Connected' namun suara/sinyal dial ring tidak merespons.",
          skor1: "IP Phone tetap berstatus 'Discovering Router' atau 'unconfigured', tidak dapat melakukan panggilan sama sekali."
        }
      ],
      rubrikTesTulis: [
        {
          kriteria: "Penguasaan Konsep VoIP",
          skor4: "Mampu menjawab seluruh soal esai dengan analisis mendalam, menjelaskan detail peran protokol SIP, H.323, dan DHCP Option 150 secara logis.",
          skor3: "Mampu menjelaskan konsep VoIP dan fungsi komponen utamanya dengan benar, namun kurang mendalam pada peran spesifik DHCP Option 150.",
          skor2: "Menjawab soal dengan pemahaman permukaan, hanya mengetahui bahwa VoIP adalah telepon internet tanpa memahami arsitektur pensinyalannya.",
          skor1: "Jawaban salah atau tidak menjawab sama sekali, tidak memahami dasar-dasar kerja layanan VoIP."
        }
      ],
      rubrikDiskusi: [
        {
          kriteria: "Kolaborasi & Komunikasi",
          skor4: "Sangat aktif memberikan solusi taktis saat troubleshooting jaringan kelompok, mendengarkan ide rekan dengan empati tinggi, bahasa sangat sopan.",
          skor3: "Aktif berdiskusi menyelesaikan praktikum, bekerja sama dengan baik dalam menguji panggilan telepon dua arah.",
          skor2: "Ikut serta dalam diskusi namun pasif, hanya menunggu instruksi dari teman satu kelompoknya.",
          skor1: "Tidak mau berkolaborasi, bekerja sendiri tanpa memedulikan rekan kelompok atau justru bersikap egois mendominasi."
        }
      ]
    }
  },
  materi: {
    judul: "Teknologi Layanan Voice over IP (VoIP) dengan Router",
    ringkasanMateri: "Voice over Internet Protocol (VoIP) adalah teknologi yang memungkinkan pengiriman transmisi suara secara real-time melalui jaringan IP (seperti internet atau jaringan lokal). Suara analog dari manusia dikonversi menjadi data digital oleh codec (coder-decoder), dipecah menjadi paket-paket IP, dikirimkan melalui infrastruktur switch dan router, lalu dirakit kembali menjadi suara analog di sisi penerima. Konfigurasi VoIP pada Router Cisco melibatkan pengaktifan fitur telephony-service, pembuatan DHCP server khusus suara dengan Option 150 (yang menunjuk ke IP TFTP Server/Router agar IP Phone dapat mengunduh file konfigurasinya), pembuatan VLAN Voice terpisah dari VLAN Data pada Switch untuk menjaga kualitas layanan (QoS) suara dari interferensi trafik data, serta penetapan Directory Number (DN) pada IP Phone.",
    penjabaranTujuan: "Tujuan pembelajaran ini adalah membekali peserta didik dengan kompetensi taktis dalam merancang, menginstalasi, dan menguji jaringan telekomunikasi IP. Guru mengaitkan literasi istilah teknis industri dengan kemampuan numerasi konfigurasi (subnetting subnet voice, pengalokasian IP DHCP Option 150, serta pengaturan Directory Number). Siswa dilatih berdisiplin tinggi dan bertanggung jawab penuh menjaga keutuhan konfigurasi agar sistem komunikasi suara tidak terputus (zero-downtime).",
    petaKonsep: [
      "Prinsip Dasar Konversi Suara Analog ke Digital (Sampling, Quantizing, Coding)",
      "Protokol Pensinyalan VoIP (Session Initiation Protocol / SIP, H.323, MGCP)",
      "DHCP Option 150: Peran Vital TFTP Server dalam Penyediaan Konfigurasi IP Phone",
      "Voice VLAN vs. Data VLAN: Konsep QoS (Quality of Service) pada Switch Port Cisco",
      "Telephony Service: CLI Cisco Router untuk Alokasi Directory Number (DN) dan Tombol IP Phone"
    ],
    subBab: [
      {
        judul: "1. Konsep Arsitektur dan Protokol VoIP",
        konten: "Layanan VoIP tidak bekerja seperti telepon sirkuit tradisional (PSTN) yang menyewa satu jalur kabel tembaga penuh selama panggilan berlangsung. VoIP bekerja dengan metode packet-switching. Suara kita ditangkap mikrofon, diubah menjadi sinyal elektrik analog, lalu di-sampling oleh Codec (seperti G.711 atau G.729) menjadi bitstream digital. Bitstream ini dibungkus oleh protokol RTP (Real-time Transport Protocol) yang berjalan di atas UDP (User Datagram Protocol) untuk transmisi cepat tanpa overhead retransmisi. Pensinyalan panggilan (menghubungkan, memutuskan, dan memantau status panggilan) diatur oleh protokol SIP (Session Initiation Protocol) yang menggunakan port TCP/UDP 5060.",
        visualHighlight: "Diagram Alir: Suara Analog -> Mic -> Codec (Digitasi) -> RTP Packet (UDP) -> IP Network (Routers/Switches) -> Penerima (Dekode kembali ke Analog)."
      },
      {
        judul: "2. Fungsi Kritis DHCP Option 150",
        konten: "Saat IP Phone dicolokkan ke Switch, perangkat tersebut tidak memiliki harddisk untuk menyimpan firmware atau konfigurasi nomor ekstensinya. IP Phone harus meminta IP secara dinamis ke DHCP Server. Namun, selain IP address, subnet mask, dan gateway, IP Phone membutuhkan satu parameter krusial tambahan yaitu IP Address TFTP (Trivial File Transfer Protocol) server tempat ia harus mengunduh file konfigurasi xml miliknya. Di Cisco Router, parameter ini dikonfigurasi melalui instruksi: 'option 150 ip [IP_ROUTER]'. Jika Option 150 ini terlewatkan, IP Phone akan sukses mendapatkan IP Address namun layarnya akan macet selamanya pada status 'Discovering TFTP' dan tidak akan pernah mendapatkan nomor ekstensi.",
        visualHighlight: "Konfigurasi Router CLI:\nip dhcp pool VOICE_POOL\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n option 150 ip 192.168.10.1"
      },
      {
        judul: "3. Penerapan Voice VLAN pada Switch",
        konten: "Trafik data (seperti browsing web, download file besar) bersifat 'bursty' (bisa melonjak tiba-tiba) dan toleran terhadap delay. Trafik suara bersifat konstan namun sangat sensitif terhadap delay (keterlambatan) dan jitter (variasi delay). Jika trafik data dan suara dicampur dalam satu VLAN biasa, maka saat ada siswa melakukan download file besar, suara telepon di lab akan patah-patah atau putus (packet loss). Solusinya adalah memisahkan jalur dengan membuat Voice VLAN pada Switch Cisco. Switch port dikonfigurasi agar melewatkan tag VLAN Data secara native dan melewatkan tag VLAN Voice secara khusus (802.1Q). Command pada port switch:\n'switchport mode access'\n'switchport access vlan 10'\n'switchport voice vlan 20'",
        visualHighlight: "Skema Switchport: Port switch terhubung ke IP Phone, lalu PC klien dicolokkan ke port passthrough di belakang IP Phone. Satu kabel fisik membawa 2 VLAN berbeda secara cerdas!"
      },
      {
        judul: "4. Langkah CLI Telephony Service",
        konten: "Untuk menghidupkan fitur PBX (Private Branch Exchange) internal di dalam Router Cisco, kita masuk ke mode konfigurasi telephony-service. Langkah-langkah utama di router meliputi:\n1. Mengaktifkan Telephony Service: 'telephony-service'\n2. Menentukan kapasitas maksimum IP Phone: 'max-ephones 5'\n3. Menentukan kapasitas maksimum nomor telepon: 'max-dn 5'\n4. Menentukan sumber IP binding port 2000 (protokol SCCP): 'ip source-address 192.168.10.1 port 2000'\n5. Mengaktifkan auto-assign ephone-dn ke perangkat fisik: 'auto assign 4 6' dan 'auto assign 1 5'\n6. Mendefinisikan nomor telepon pada directory number (ephone-dn):\n   'ephone-dn 1'\n   'number 1001'\n   'ephone-dn 2'\n   'number 1002'",
        visualHighlight: "Ephone-DN (Directory Number) bertindak sebagai line virtual. Ketika ephone fisik (perangkat IP Phone) melakukan booting, ia akan dicocokkan secara otomatis berdasarkan MAC address-nya ke DN yang telah kita definisikan."
      }
    ],
    glosarium: [
      { istilah: "VoIP", definisi: "Voice over Internet Protocol, teknologi transmisi suara digital melalui paket data IP." },
      { istilah: "Codec", definisi: "Coder-Decoder, algoritma yang mengompresi dan mengonversi sinyal suara analog menjadi data digital (dan sebaliknya)." },
      { istilah: "TFTP", definisi: "Trivial File Transfer Protocol, protokol transfer file sederhana yang digunakan IP Phone untuk mengunduh konfigurasi dari router." },
      { istilah: "Option 150", definisi: "Parameter DHCP khusus Cisco yang menunjuk alamat IP TFTP server untuk dihubungi oleh IP Phone." },
      { istilah: "Dial Peer", definisi: "Konfigurasi rute panggilan pada router yang memetakan nomor telepon tujuan ke jalur fisik atau IP address tertentu." },
      { istilah: "VLAN", definisi: "Virtual Local Area Network, sub-segmentasi jaringan pada layer 2 untuk mengelompokkan broadcast domain secara logis." }
    ]
  },
  lkpd: {
    identitas: {
      namaSekolah: "SMK Negeri 2 Tegal",
      mataPelajaran: "Teknologi Jaringan Kabel dan Nirkabel",
      kelasSemester: "XI / Genap",
      materiPokok: "Konfigurasi VoIP dengan Router Cisco",
      alokasiWaktu: "2 JP x 45 Menit (Praktikum Terbimbing)",
      namaSiswaAtauKelompok: "Kelompok Praktikum VoIP / Siswa 1 & Siswa 2"
    },
    petunjukBelajar: [
      "Bacalah uraian materi ajar mengenai VoIP dan DHCP Option 150 sebelum memulai praktikum.",
      "Bekerjalah secara berpasangan dengan rekan sebangku Anda, namun masing-masing wajib membuat laporan praktikum secara mandiri di lembar kerja masing-masing.",
      "Perhatikan keselamatan kerja (K3): Pastikan kabel power PC terpasang dengan aman, hindari bercanda berlebihan di dalam laboratorium komputer.",
      "Patuhi nilai Integritas: Jangan menyalin konfigurasi atau meminta file '.pkt' milik kelompok lain. Kerjakan setiap sintaks CLI dengan analisis kelompok sendiri. Troubleshooting adalah bagian dari seni belajar jaringan!"
    ],
    tujuanPraktikum: "Peserta didik mampu melakukan rancangan topologi, konfigurasi CLI Router Cisco untuk Telephony Service, konfigurasi Voice VLAN pada Switch, serta menguji keberhasilan panggilan VoIP antar-IP Phone dengan tingkat keberhasilan register dan panggilan 100% lancar.",
    skenarioDuniaNyata: "Sebuah klinik kesehatan modern 'Klinik Sehat SMKN 2 Tegal' ingin menghubungkan meja Pendaftaran (Ext: 101) dengan meja Apotek (Ext: 102). Mereka memiliki satu router Cisco 2811 dan satu switch Cisco 2960. Anda diminta merancang, menginstalasi, dan mengonfigurasi VoIP agar perawat di pendaftaran dapat menanyakan ketersediaan obat ke apoteker secara cepat tanpa perlu berjalan kaki, meningkatkan efisiensi pelayanan pasien.",
    alatBahan: [
      "1 Unit PC Client dengan OS Windows/Linux",
      "Software Cisco Packet Tracer Simulator (Versi 8.0 atau lebih tinggi)",
      "Lembar Kerja Siswa dan Alat Tulis untuk mencatat log CLI"
    ],
    langkahKerja: [
      {
        langkah: "Langkah 1: Merancang Topologi Fisik",
        detail: "Buka software Cisco Packet Tracer. Letakkan 1 Router tipe 2811, 1 Switch tipe 2960, dan 2 unit IP Phone tipe-7960. Hubungkan Router port Fa0/0 ke Switch port Fa0/1 menggunakan kabel Straight-Through. Hubungkan Switch port Fa0/2 ke IP Phone 1 port Switch. Hubungkan Switch port Fa0/3 ke IP Phone 2 port Switch. Jangan lupa menyambungkan adaptor power supply IP Phone dengan menarik kabel power virtual ke port colokan di bagian belakang IP Phone agar perangkat menyala.",
        visualHint: "Konektor fisik power adapter IP Phone harus ditarik manual ke bodi belakang IP Phone di tab 'Physical' simulator agar status port switch berubah dari merah menjadi hijau.",
        fokusIntegritas: "Disiplin: Melakukan perancangan topologi secara runut, rapi, dan mencatat alokasi interface (port) switch secara teliti di kertas coretan."
      },
      {
        langkah: "Langkah 2: Konfigurasi Sub-Interface Router & DHCP Voice",
        detail: "Masuk ke CLI Router, ketik perintah:\nRouter> enable\nRouter# configure terminal\nRouter(config)# interface fa0/0\nRouter(config-if)# no shutdown\nRouter(config-if)# interface fa0/0.10 (membuat sub-interface VLAN Voice)\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.1 255.255.255.0\nRouter(config-subif)# exit\nRouter(config)# ip dhcp pool VOICE_POOL\nRouter(dhcp-config)# network 192.168.10.0 255.255.255.0\nRouter(dhcp-config)# default-router 192.168.10.1\nRouter(dhcp-config)# option 150 ip 192.168.10.1 (Krusial agar IP Phone tahu TFTP Server)\nRouter(dhcp-config)# exit",
        visualHint: "Jika Option 150 tidak ditulis, IP Phone tidak akan pernah mendapatkan konfigurasi Directory Number.",
        fokusIntegritas: "Tanggung Jawab: Memastikan setiap sintaks CLI diketik secara mandiri dengan memahami fungsi masing-masing baris perintah, bukan sekadar copy-paste."
      },
      {
        langkah: "Langkah 3: Konfigurasi Voice VLAN di Switch",
        detail: "Masuk ke CLI Switch 2960 untuk memisahkan lalu lintas suara ke VLAN 10:\nSwitch> enable\nSwitch# configure terminal\nSwitch(config)# vlan 10\nSwitch(config-vlan)# name VOICE_VLAN\nSwitch(config-vlan)# exit\nSwitch(config)# interface range fa0/1 - 24\nSwitch(config-if-range)# switchport mode access\nSwitch(config-if-range)# switchport voice vlan 10\nSwitch(config-if-range)# exit",
        visualHint: "Perintah 'switchport voice vlan 10' memerintahkan Switch untuk memberikan tag prioritas suara pada frame ethernet di port tersebut.",
        fokusIntegritas: "Kerja Keras: Bersemangat mengonfigurasi switch meskipun terdapat banyak port yang harus di-assign, memastikan integritas port terjaga."
      },
      {
        langkah: "Langkah 4: Konfigurasi Telephony Service pada Router",
        detail: "Kembali ke CLI Router untuk mengaktifkan PBX VoIP:\nRouter(config)# telephony-service\nRouter(config-telephony)# max-ephones 2\nRouter(config-telephony)# max-dn 2\nRouter(config-telephony)# ip source-address 192.168.10.1 port 2000\nRouter(config-telephony)# auto assign 1 2\nRouter(config-telephony)# exit\nRouter(config)# ephone-dn 1\nRouter(config-phone-dn)# number 101 (Ekstensi Pendaftaran)\nRouter(config-phone-dn)# exit\nRouter(config)# ephone-dn 2\nRouter(config-phone-dn)# number 102 (Ekstensi Apotek)\nRouter(config-phone-dn)# end\nRouter# write (menyimpan konfigurasi)",
        visualHint: "Simpan konfigurasi agar tidak hilang saat router direstart virtual.",
        fokusIntegritas: "Mandiri: Menganalisis konfigurasi telephony-service tanpa mencontek kelompok sebelah, melatih kemandirian pemecahan CLI."
      },
      {
        langkah: "Langkah 5: Pengujian Panggilan",
        detail: "Arahkan kursor ke IP Phone 1, klik dua kali, masuk ke tab GUI. Perhatikan apakah IP Phone mendapatkan IP 192.168.10.x dan menampilkan nomor '101' di pojok kanan atas. Buka juga tab GUI IP Phone 2, pastikan menampilkan nomor '102'. Klik gagang telepon IP Phone 1, ketik '102' pada tombol dial, dengarkan bunyi dering, lalu periksa apakah status IP Phone 2 berubah menjadi 'Ring In' dan gagangnya menyala berkedip. Angkat gagang telepon IP Phone 2 untuk menghubungkan panggilan hingga muncul status 'Connected'.",
        visualHint: "Tarik gagang telepon virtual ke telinga siswa virtual untuk melihat status koneksi 'Connected' yang real-time.",
        fokusIntegritas: "Jujur: Melaporkan hasil pengujian apa adanya di lembar praktikum, melampirkan screenshot proses connected yang orisinal."
      }
    ],
    pertanyaanHots: [
      {
        nomor: 1,
        soal: "Mengapa IP Phone 1 dan IP Phone 2 gagal melakukan registrasi nomor ekstensi dan layarnya terus-menerus menampilkan pesan 'Discovering TFTP' padahal kedua IP Phone tersebut sudah mendapatkan IP Address dari router? Lakukan analisis mendalam mengenai letak kegagalan konfigurasi tersebut!",
        skenarioKasus: "Staf IT lupa mengonfigurasi Option 150 di router DHCP pool.",
        petunjukAnalisis: "Hubungkan dengan fungsi Option 150 pada arsitektur SCCP Cisco IP Phone dan jelaskan bagaimana IP Phone meminta file konfigurasi nama nomor DN."
      },
      {
        nomor: 2,
        soal: "Jika switchport diubah konfigurasinya menjadi 'switchport access vlan 10' (tanpa perintah 'switchport voice vlan 10'), dan sebuah PC dicolokkan ke port bypass bagian belakang IP Phone, analisislah dampak yang akan terjadi pada keamanan informasi, kestabilan bandwidth, dan QoS pengiriman paket data suara!",
        skenarioKasus: "Pencampuran segmen jaringan data dan suara pada satu segmen broadcast domain yang sama.",
        petunjukAnalisis: "Analisis potensi penyadapan data suara (sniffing), tabrakan paket broadcast (broadcast storm), dan tidak adanya prioritas tagging 802.1p/Q (Quality of Service)."
      }
    ],
    refleksiIntegritas: [
      {
        pertanyaan: "Bagaimana Anda mempraktikkan nilai Tanggung Jawab ketika terjadi kesalahan ketik (error syntax) pada konfigurasi CLI router Anda? Apakah Anda segera menghapus dan menyontek file teman, atau mencoba menganalisis pesan error compiler CLI tersebut secara mandiri?",
        penjelasanPenerapan: "Siswa menuliskan refleksi jujur: tanggung jawab dibuktikan dengan membaca baris log error, mengetikkan tanda tanya '?' untuk bantuan CLI, dan mengecek kecocokan interface fisik secara teliti."
      },
      {
        pertanyaan: "Sebutkan tindakan nyata penerapan nilai Jujur saat mendapati hasil praktikum Anda masih gagal tersambung (unconfigured) pada 10 menit menjelang jam pelajaran berakhir!",
        penjelasanPenerapan: "Siswa berkomitmen untuk tetap melaporkan status error apa adanya dalam laporan, mendeskripsikan langkah analisis kegagalan yang dicoba, daripada meng-copy screenshot milik teman lain demi mendapatkan nilai instan."
      }
    ]
  },
  asesmen: {
    pilihanGanda: [
      {
        nomor: 1,
        pertanyaan: "Teknologi yang berfungsi untuk mengonversi sinyal suara analog manusia menjadi paket data digital yang siap ditransmisikan melalui jaringan internet dinamakan...",
        opsi: {
          A: "Router",
          B: "Switch",
          C: "Codec",
          D: "Gatekeeper",
          E: "IP Phone"
        },
        kunci: "C",
        pembahasan: "Codec (Coder-Decoder) adalah chip atau program perangkat lunak yang bertugas melakukan sampling sinyal suara analog (suara manusia), mengkuantisasinya, dan mengodekannya menjadi bitstream digital untuk dikirimkan melalui jaringan IP."
      },
      {
        nomor: 2,
        pertanyaan: "Protokol pensinyalan VoIP standar industri terbuka yang paling umum digunakan untuk membuat, memodifikasi, dan mengakhiri sesi panggilan telepon pada port 5060 adalah...",
        opsi: {
          A: "SCCP (Skinny Client Control Protocol)",
          B: "SIP (Session Initiation Protocol)",
          C: "H.323",
          D: "RTP (Real-time Transport Protocol)",
          E: "RTCP (Real-time Transport Control Protocol)"
        },
        kunci: "B",
        pembahasan: "SIP adalah protokol pensinyalan layer aplikasi standar IETF untuk membangun, memelihara, dan memutuskan panggilan VoIP yang berjalan secara efisien pada port TCP/UDP 5060."
      },
      {
        nomor: 3,
        pertanyaan: "Pada konfigurasi DHCP pool di Cisco Router untuk VoIP, perintah 'option 150 ip 192.168.10.1' memiliki peran fungsional yang sangat penting, yaitu...",
        opsi: {
          A: "Menentukan DNS Server untuk IP Phone",
          B: "Membatasi jumlah IP Address maksimal yang dipinjamkan",
          C: "Menunjukkan alamat IP TFTP Server tempat IP Phone mengunduh file konfigurasi firmware",
          D: "Menghubungkan IP Phone dengan database SIP provider",
          E: "Mengaktifkan kompresi audio suara pada IP Phone"
        },
        kunci: "C",
        pembahasan: "Option 150 adalah parameter DHCP khusus Cisco untuk memberi tahu perangkat ephone alamat IP TFTP server (dalam hal ini router itu sendiri) agar IP Phone dapat mengunduh file xml berisi data directory number dan firmware pendukung."
      },
      {
        nomor: 4,
        pertanyaan: "Mengapa lalu lintas suara (Voice Traffic) harus dipisahkan ke dalam VLAN khusus (Voice VLAN) yang terpisah dari lalu lintas data (Data VLAN) di lingkungan perkantoran?",
        opsi: {
          A: "Agar IP Phone tidak terkena virus komputer dari PC klien",
          B: "Karena IP Phone menggunakan jenis kabel fisik tembaga yang berbeda dengan PC",
          C: "Untuk menghindari tabrakan bandwidth (collision) dengan trafik data yang bursty serta memberikan jaminan QoS (Quality of Service)",
          D: "Agar IP Phone tidak bisa mengakses halaman web internet publik",
          E: "Untuk membatasi IP Phone agar tidak bisa memanggil telepon di luar kantor"
        },
        kunci: "C",
        pembahasan: "Suara sangat rentan terhadap delay, jitter, dan packet loss. Dengan memisahkannya ke Voice VLAN, switch dapat mengenali dan memberikan prioritas QoS (tagging 802.1p CoS) agar paket suara didahulukan dibanding paket data biasa."
      },
      {
        nomor: 5,
        pertanyaan: "Perintah pada Switch Cisco yang digunakan untuk mengaktifkan fitur penandaan Voice VLAN 10 pada port range Fa0/2 sampai Fa0/24 adalah...",
        opsi: {
          A: "switchport mode trunk",
          B: "switchport voice vlan 10",
          C: "switchport access vlan 10",
          D: "switchport nonnegotiate",
          E: "switchport trunk allowed vlan 10"
        },
        kunci: "B",
        pembahasan: "Perintah 'switchport voice vlan 10' berfungsi memberi tahu switch port untuk melewatkan paket suara ber-tagging VLAN 10, sementara port access vlan biasa tetap berjalan untuk data."
      },
      {
        nomor: 6,
        pertanyaan: "Dalam konfigurasi telephony-service Cisco, perintah 'max-dn 5' digunakan untuk menentukan...",
        opsi: {
          A: "Jumlah IP Phone fisik maksimal sebanyak 5 unit",
          B: "Panjang nomor telepon maksimal sebanyak 5 digit",
          C: "Jumlah nomor directory number (DN) maksimal sebanyak 5 nomor",
          D: "Durasi panggilan maksimal dibatasi 5 menit",
          E: "Jumlah lompatan router (hop count) VoIP maksimal 5 hop"
        },
        kunci: "C",
        pembahasan: "max-dn (maximum directory numbers) digunakan untuk mengalokasikan slot jalur nomor telepon virtual di dalam router (maksimal 5 nomor telepon yang dapat didaftarkan)."
      },
      {
        nomor: 7,
        pertanyaan: "Protokol transport yang digunakan untuk mengirimkan paket data payload suara secara langsung (real-time payload) setelah panggilan VoIP berhasil terhubung adalah...",
        opsi: {
          A: "TCP",
          B: "RTP (Real-time Transport Protocol)",
          C: "HTTP",
          D: "FTP",
          E: "ICMP"
        },
        kunci: "B",
        pembahasan: "RTP (Real-time Transport Protocol) adalah protokol yang membungkus payload data suara digital hasil kompresi codec dan mentransmisikannya langsung di atas UDP secara real-time."
      },
      {
        nomor: 8,
        pertanyaan: "Perintah 'ip source-address 192.168.10.1 port 2000' pada konfigurasi telephony service router Cisco bertujuan untuk...",
        opsi: {
          A: "Memblokir serangan hacker pada port 2000",
          B: "Mengonfigurasi proxy SIP eksternal",
          C: "Mengikat router agar mendengarkan permintaan registrasi IP Phone pada IP dan port SCCP (Skinny) tersebut",
          D: "Mengubah alamat IP LAN router secara otomatis",
          E: "Mengaktifkan routing dinamis OSPF di port 2000"
        },
        kunci: "C",
        pembahasan: "ip source-address menetapkan IP address interface router dan port port-registrasi (default port 2000 untuk Skinny / SCCP) yang akan dihubungi oleh IP Phone untuk mendaftar."
      },
      {
        nomor: 9,
        pertanyaan: "Jika saat pengujian panggilan pada Cisco Packet Tracer, salah satu IP Phone menampilkan pesan 'unconfigured' dan tidak mendapatkan nomor, langkah awal troubleshooting yang paling tepat adalah...",
        opsi: {
          A: "Mengganti router dengan tipe yang lebih mahal",
          B: "Memeriksa kecocokan nomor mac-address IP Phone dengan konfigurasi ephone-dn",
          C: "Menghapus semua konfigurasi switch secara total",
          D: "Menurunkan kecepatan port switch menjadi 10 Mbps",
          E: "Menghapus DHCP pool data"
        },
        kunci: "B",
        pembahasan: "Pesan 'unconfigured' atau kegagalan registrasi disebabkan router belum mengasosiasikan MAC address ephone fisik ke slot Directory Number (ephone-dn). Memeriksa ephone-dn binding atau perintah auto-assign adalah langkah penanganan yang tepat."
      },
      {
        nomor: 10,
        pertanyaan: "Aspek utama dari nilai Integritas 'Tanggung Jawab' yang harus dipraktikkan seorang teknisi komputer jaringan saat mengonfigurasi jaringan telekomunikasi VoIP adalah...",
        opsi: {
          A: "Mencari celah keamanan sistem VoIP untuk melakukan panggilan gratis secara ilegal",
          B: "Mengerjakan konfigurasi terburu-buru yang penting bunyi dering tanpa memedulikan kerapian kabel",
          C: "Melakukan dokumentasi tertulis secara akurat terhadap alokasi port switch, IP pool, dan nomor ekstensi untuk kemudahan perawatan di masa depan",
          D: "Menyalahkan rekan kerja apabila terjadi kegagalan sistem dial-in di switch",
          E: "Menyalin file konfigurasi router milik perusahaan lain secara tanpa izin"
        },
        kunci: "C",
        pembahasan: "Tanggung jawab nyata seorang administrator jaringan diwujudkan dengan mendokumentasikan topologi, IP address, dan parameter konfigurasi secara jujur, akurat, dan tertib agar memudahkan tim pemelihara jaringan di masa depan."
      }
    ],
    esai: [
      {
        nomor: 1,
        pertanyaan: "Jelaskan perbedaan mendasar antara Data VLAN dan Voice VLAN pada Switch Cisco, serta berikan alasan mengapa keduanya harus dipisahkan dalam arsitektur jaringan lokal kantor modern!",
        kunciJawaban: "Data VLAN digunakan untuk membawa lalu lintas data komputer umum (web browsing, transfer file, email) yang bersifat bursty (tiba-tiba padat) dan toleran terhadap delay. Sedangkan Voice VLAN digunakan khusus untuk membawa data suara VoIP yang bersifat sensitif terhadap delay, jitter, dan packet loss. Keduanya harus dipisahkan karena jika dicampur dalam satu VLAN, lalu lintas data yang padat akan menyumbat lalu lintas suara, menyebabkan kualitas suara telepon terputus-putus. Pemisahan VLAN memungkinkan penerapan Quality of Service (QoS), di mana switch akan memberikan prioritas antrean (802.1p/Q CoS) pada paket suara agar didahulukan.",
        rubrikPenilaian: "Skor 4: Penjelasan sangat lengkap mencakup karakteristik data vs suara, konsep QoS, prioritas tagging, dan dampak buruk jika dicampur. Skor 3: Menjelaskan perbedaan data dan suara serta alasan pemisahan tanpa menyebutkan tagging QoS. Skor 2: Hanya menjelaskan perbedaan definisi tanpa disertai alasan teknis pemisahan. Skor 1: Jawaban salah atau asal-asalan."
      },
      {
        nomor: 2,
        pertanyaan: "Uraikan alur pendaftaran (booting dan registrasi) sebuah perangkat IP Phone Cisco sejak pertama kali dicolokkan ke Switch port yang memiliki DHCP server di Router! Sebutkan peran DHCP Option 150 dalam alur tersebut!",
        kunciJawaban: "Alur registrasi IP Phone Cisco: 1) IP Phone menyala (Power on via PoE atau adapter) dan mengirimkan broadcast DHCP Discovery untuk meminta alamat IP. 2) DHCP Server di router memberikan penawaran IP, subnet mask, default gateway, serta DHCP Option 150 (berisi IP TFTP Server/Router). 3) IP Phone menerapkan IP Address lalu menghubungi IP TFTP Server yang didapat dari Option 150 untuk mengunduh file konfigurasi XML (berisi setelan telephony, firmware, dan daftar nomor ekstensi). 4) IP Phone menghubungi Router pada port 2000 (SCCP/Skinny) untuk mendaftarkan MAC Address-nya. 5) Router memetakan ephone tersebut ke directory number (ephone-dn) yang sesuai, lalu layar IP Phone menampilkan nomor ekstensi siap pakai.\nPeran DHCP Option 150 sangat vital karena mengarahkan IP Phone ke lokasi server TFTP untuk mengunduh konfigurasi ephone. Tanpa Option 150, IP Phone tidak tahu di mana file konfigurasi berada sehingga statusnya akan macet di 'Discovering TFTP'.",
        rubrikPenilaian: "Skor 4: Menjelaskan 5 langkah alur pendaftaran secara kronologis dengan sangat detail dan tepat serta menjelaskan peran Option 150 secara sempurna. Skor 3: Menjelaskan alur pendaftaran dengan benar namun ada 1 tahapan terlewat, peran Option 150 dijelaskan dengan baik. Skor 2: Hanya menjelaskan peran Option 150 secara umum tanpa merinci tahapan kronologis booting IP Phone. Skor 1: Penjelasan tidak logis atau salah fatal."
      },
      {
        nomor: 3,
        pertanyaan: "Mengapa nilai integritas 'Kerja Keras' dan 'Tanggung Jawab' sangat relevan dipraktikkan ketika Anda melakukan konfigurasi VoIP dan menghadapi kondisi 'Error: Invalid Input Detected' atau ephone berstatus 'unconfigured' di CLI Cisco? Jelaskan tindakan nyata apa saja yang mencerminkan kedua nilai tersebut!",
        kunciJawaban: "Kedua nilai tersebut sangat relevan karena konfigurasi jaringan komputer adalah pekerjaan presisi tinggi yang rawan error. Tindakan nyata yang mencerminkan:\n- Kerja Keras: Tidak mudah putus asa saat sintaks CLI ditolak compiler. Siswa membaca pesan error dengan cermat, mengecek letak cursor penunjuk kesalahan (tanda '^'), mengetikkan command bantu '?', memeriksa dokumentasi lab, dan mencoba memperbaiki sintaks tersebut berkali-kali hingga berhasil.\n- Tanggung Jawab: Siswa menganalisis kesalahan pada konfigurasi kelompoknya sendiri secara orisinal, tidak langsung menghapus pekerjaan untuk menduplikasi file .pkt milik kelompok lain. Siswa juga mengembalikan konfigurasi port router ke kondisi aman (tidak membiarkan port terbuka tanpa security) dan merapikan workstation setelah selesai sebagai wujud tanggung jawab sarana prasarana sekolah.",
        rubrikPenilaian: "Skor 4: Memberikan argumentasi yang sangat mendalam dan contoh tindakan konkret yang realistis di lab komputer jaringan untuk kedua nilai integritas. Skor 3: Memberikan penjelasan dan contoh tindakan namun hanya fokus pada salah satu nilai integritas saja. Skor 2: Menjelaskan pentingnya nilai tersebut secara teoritis tanpa memberikan contoh praktik nyata di laboratorium. Skor 1: Jawaban terlalu pendek atau tidak relevan dengan dunia praktikum jaringan."
      },
      {
        nomor: 4,
        pertanyaan: "Bagaimanakah router melakukan asosiasi (pemasangan) antara perangkat keras IP Phone fisik di atas meja dengan Directory Number (DN) virtual yang telah kita konfigurasi di router? Jelaskan menggunakan perintah CLI yang digunakan!",
        kunciJawaban: "Router melakukan asosiasi melalui identitas unik MAC Address milik ephone fisik tersebut. Terdapat dua cara:\n1. Cara Manual (ephone-binding): Di router, kita mengidentifikasi MAC address IP Phone (misal: 0001.c9a2.b43e) lalu mendaftarkannya pada menu ephone dan mengikatnya ke button:\n   Router(config)# ephone 1\n   Router(config-ephone)# mac-address 0001.c9a2.b43e\n   Router(config-ephone)# button 1:1 (mengikat tombol 1 IP Phone ke directory number/ephone-dn 1)\n2. Cara Otomatis (Auto-assign): Pada menu telephony-service, kita mengaktifkan perintah agar router otomatis mengasosiasikan IP Phone yang baru online ke slot dn yang tersedia:\n   Router(config-telephony)# auto assign 1 5 (otomatis memasangkan perangkat ke DN slot 1 hingga 5 secara berurutan sesuai urutan waktu booting).",
        rubrikPenilaian: "Skor 4: Menjelaskan kedua metode (manual dan otomatis) lengkap dengan sintaks CLI yang valid dan penjelasan parameter secara akurat. Skor 3: Menjelaskan salah satu metode (manual atau otomatis) lengkap dengan CLI, atau menjelaskan kedua metode namun CLI kurang tepat. Skor 2: Hanya menjelaskan konsep MAC Address sebagai pengenal unik tanpa menuliskan sintaks CLI router. Skor 1: Penjelasan salah total."
      },
      {
        nomor: 5,
        pertanyaan: "Rancanglah sebuah skema IP Address untuk router yang mengelola VoIP dengan ketentuan: Jumlah IP Phone di lab adalah 30 unit, diletakkan pada sub-interface Fa0/0.10. Tentukan Network ID, Subnet Mask yang efisien, IP gateway router, range IP Address DHCP yang dibagikan untuk IP Phone, serta tuliskan script CLI DHCP pool-nya secara lengkap!",
        kunciJawaban: "Analisis Kebutuhan IP: Jumlah ephone = 30 unit. Ditambah gateway router = 1 IP. Total minimal 31 IP. Subnet mask paling efisien yang mencukupi adalah /27 (32 total IP, 30 usable IP - pas sekali namun tidak ada cadangan cadangan) atau /26 (64 total IP, 62 usable IP - direkomendasikan agar ada ruang ekspansi di lab).\nMari gunakan subnet /26 agar aman dan efisien:\n- Network ID: 192.168.10.0\n- Subnet Mask: 255.255.255.192 (/26)\n- IP Gateway Router (Sub-interface Fa0/0.10): 192.168.10.1\n- Range IP DHCP Phone: 192.168.10.2 s.d. 192.168.10.62\n- Option 150 TFTP Server: 192.168.10.1\n\nScript CLI Router Cisco:\nRouter(config)# interface fa0/0.10\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.1 255.255.255.192\nRouter(config-subif)# exit\nRouter(config)# ip dhcp pool VOICE_LAB\nRouter(dhcp-config)# network 192.168.10.0 255.255.255.192\nRouter(dhcp-config)# default-router 192.168.10.1\nRouter(dhcp-config)# option 150 ip 192.168.10.1\nRouter(dhcp-config)# exit\nRouter(config)# ip dhcp excluded-address 192.168.10.1",
        rubrikPenilaian: "Skor 4: Analisis subnet sangat logis, penghitungan range IP akurat, semua parameter ditentukan dengan tepat, dan penulisan baris perintah CLI lengkap dan valid. Skor 3: Perhitungan subnet benar namun ada kesalahan minor pada range IP, atau script CLI kurang baris excluded-address. Skor 2: Menggunakan subnet default kelas C (/24) yang kurang efisien untuk 30 host, namun CLI ditulis dengan benar. Skor 1: Salah menghitung IP dan CLI tidak valid."
      }
    ]
  }
};
