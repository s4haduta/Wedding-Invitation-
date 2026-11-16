/*
 * SEMUA ISI UNDANGAN DIATUR DI SINI.
 * Data di bawah adalah CONTOH. Ganti dengan data Anda, simpan, selesai.
 * Foto: taruh berkas di assets/img/ lalu isi path-nya, mis. 'assets/img/cover.jpg'.
 */
window.INVITATION = {
  // Zona waktu acara dan labelnya
  timeZone: 'Asia/Jakarta',
  timeZoneLabel: 'WIB',

  // Waktu yang dipakai hitung mundur (format ISO, +07:00 = WIB)
  date: '2027-02-20T09:00:00+07:00',

  couple: {
    // Urutan tampil: "first" lalu "second"
    first: {
      nick: 'Tegar',
      full: 'Tegar' /* ganti dengan nama lengkap */,
      childOf: 'Putra pertama dari',
      father: 'Bapak (nama ayah)',
      mother: 'Ibu (nama ibu)',
      instagram: '',
      photo: ''
    },
    second: {
      nick: 'Mourine',
      full: 'Mourine' /* ganti dengan nama lengkap */,
      childOf: 'Putri kedua dari',
      father: 'Bapak (nama ayah)',
      mother: 'Ibu (nama ibu)',
      instagram: '',
      photo: ''
    }
  },

  // Foto latar bagian pembuka (opsional) dan galeri (opsional; kosong = bagian galeri disembunyikan)
  photos: {
    cover: '',
    gallery: []
  },

  opening: {
    salam: 'Salam damai dalam Kristus',
    intro: 'Dengan penuh syukur atas kasih karunia Tuhan Yesus Kristus, kami mengundang Anda untuk hadir dan menjadi saksi saat kami saling menerimakan Sakramen Perkawinan.'
  },

  quote: {
    text: 'Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.',
    source: 'Matius 19:6'
  },

  events: [
    {
      name: 'Sakramen Perkawinan',
      start: '2027-02-20T09:00:00+07:00',
      end: '2027-02-20T11:00:00+07:00',
      venue: 'Gereja Katolik (nama paroki)',
      address: '(alamat gereja)',
      mapUrl: '' // kosong = otomatis mencari nama tempat + alamat di Google Maps
    },
    {
      name: 'Resepsi',
      start: '2027-02-20T12:00:00+07:00',
      end: '2027-02-20T15:00:00+07:00',
      venue: 'Pendopo Agung Nusantara',
      address: 'Jl. Melati No. 21, Sleman, Daerah Istimewa Yogyakarta',
      mapUrl: ''
    }
  ],

  story: [
    { year: '2019', title: 'Pertama bertemu', text: 'Kami dipertemukan di kepanitiaan kampus. Satu divisi, satu meja rapat, dan banyak malam lembur menyusun acara.' },
    { year: '2021', title: 'Mulai berjalan bersama', text: 'Setelah wisuda, kami memutuskan untuk saling menemani, walau harus terpisah kota karena pekerjaan.' },
    { year: '2026', title: 'Lamaran', text: 'Di hadapan kedua keluarga, kami mengikat janji untuk melangkah ke jenjang yang lebih serius.' },
    { year: '2027', title: 'Hari pernikahan', text: 'Dengan berkat Tuhan, kami memulai hidup berkeluarga dan memohon doa restu dari Anda.' }
  ],

  rsvp: {
    // Nomor WhatsApp penerima konfirmasi, format internasional tanpa "+" (mis. 6281234567890). Kosong = tombol WhatsApp disembunyikan.
    whatsapp: '',
    // URL penyimpanan ucapan bersama (mis. Google Apps Script, lihat README). Kosong = ucapan tersimpan di perangkat tamu saja.
    endpoint: '',
    maxGuests: 4
  },

  gifts: {
    note: 'Doa restu Anda adalah hadiah yang paling berarti. Bila ingin memberi tanda kasih, dapat melalui:',
    accounts: [
      { bank: 'BCA', number: '1234567890', holder: 'Tegar' },
      { bank: 'Bank Mandiri', number: '1370012345678', holder: 'Mourine' }
    ],
    address: {
      label: 'Kirim kado',
      recipient: 'Mourine',
      text: 'Jl. Kenanga No. 8, Condongcatur, Sleman, DI Yogyakarta 55283'
    }
  },

  closing: {
    text: 'Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
    salam: 'Tuhan memberkati',
    from: 'Kami yang berbahagia'
  },

  music: {
    // Path berkas musik (mis. 'assets/audio/lagu.mp3'). Kosong = Canon in D (Pachelbel) yang dimainkan langsung oleh peramban.
    src: ''
  }
};
