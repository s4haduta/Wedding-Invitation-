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
  date: '2027-02-20T08:00:00+07:00',

  couple: {
    // Urutan tampil: "first" lalu "second"
    first: {
      nick: 'Raka',
      full: 'Raka Aditya Pratama, S.T.',
      childOf: 'Putra pertama dari',
      father: 'Bapak H. Suryo Pratama',
      mother: 'Ibu Hj. Retno Wulandari',
      instagram: 'rakaaditya',
      photo: ''
    },
    second: {
      nick: 'Nadira',
      full: 'Nadira Ayu Kirana, S.Psi.',
      childOf: 'Putri kedua dari',
      father: 'Bapak Ir. Bambang Hermawan',
      mother: 'Ibu Sri Lestari',
      instagram: 'nadirakirana',
      photo: ''
    }
  },

  // Foto latar bagian pembuka (opsional) dan galeri (opsional; kosong = bagian galeri disembunyikan)
  photos: {
    cover: '',
    gallery: []
  },

  opening: {
    salam: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    intro: 'Dengan memohon rahmat dan rida Allah Subhanahu wa Ta’ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.'
  },

  quote: {
    text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21'
  },

  events: [
    {
      name: 'Akad Nikah',
      start: '2027-02-20T08:00:00+07:00',
      end: '2027-02-20T10:00:00+07:00',
      venue: 'Pendopo Agung Nusantara',
      address: 'Jl. Melati No. 21, Sleman, Daerah Istimewa Yogyakarta',
      mapUrl: '' // kosong = otomatis mencari nama tempat + alamat di Google Maps
    },
    {
      name: 'Resepsi',
      start: '2027-02-20T11:00:00+07:00',
      end: '2027-02-20T14:00:00+07:00',
      venue: 'Pendopo Agung Nusantara',
      address: 'Jl. Melati No. 21, Sleman, Daerah Istimewa Yogyakarta',
      mapUrl: ''
    }
  ],

  story: [
    { year: '2019', title: 'Pertama bertemu', text: 'Kami dipertemukan di kepanitiaan kampus. Satu divisi, satu meja rapat, dan banyak malam lembur menyusun acara.' },
    { year: '2021', title: 'Mulai berjalan bersama', text: 'Setelah wisuda, kami memutuskan untuk saling menemani, walau harus terpisah kota karena pekerjaan.' },
    { year: '2026', title: 'Lamaran', text: 'Di hadapan kedua keluarga, kami mengikat janji untuk melangkah ke jenjang yang lebih serius.' },
    { year: '2027', title: 'Hari pernikahan', text: 'Dengan izin Allah, kami memulai rumah tangga dan memohon doa restu dari Anda.' }
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
      { bank: 'BCA', number: '1234567890', holder: 'Raka Aditya Pratama' },
      { bank: 'Bank Mandiri', number: '1370012345678', holder: 'Nadira Ayu Kirana' }
    ],
    address: {
      label: 'Kirim kado',
      recipient: 'Nadira Ayu Kirana',
      text: 'Jl. Kenanga No. 8, Condongcatur, Sleman, DI Yogyakarta 55283'
    }
  },

  closing: {
    text: 'Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
    salam: 'Wassalamu’alaikum Warahmatullahi Wabarakatuh',
    from: 'Kami yang berbahagia'
  },

  music: {
    // Path berkas musik (mis. 'assets/audio/lagu.mp3'). Kosong = denting gamelan yang dibangkitkan langsung di peramban.
    src: ''
  }
};
