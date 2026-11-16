# Undangan Pernikahan Digital

Undangan satu halaman, tanpa framework dan tanpa proses build. Unggah seluruh folder ke hosting statis mana pun (GitHub Pages, Netlify, Vercel, cPanel).

Ada dua versi, masing-masing berdiri sendiri di foldernya:

| Folder | Versi |
| --- | --- |
| `v1/` | Batik Nila: kain batik nila berprada emas, musik Wedding March |
| `v2/` | Pergelaran Wayang: nuansa Jawa dengan gunungan, sepasang wayang, batik truntum, aksara Jawa, dan gamelan |

`index.html` di akar hanya halaman pemilih versi. Kalau sudah memutuskan, cukup unggah isi satu folder versi saja. Semua path di bawah ini relatif terhadap folder versi (mis. `v2/assets/js/config.js`).

## Mengganti isi

Semua isi ada di **`assets/js/config.js`**: nama mempelai, orang tua, tanggal, acara, kisah, rekening, teks salam. Data bawaan adalah contoh.

| Yang diubah | Di mana |
| --- | --- |
| Nama, orang tua, Instagram | `couple` |
| Tanggal hitung mundur | `date` |
| Sakramen Perkawinan, resepsi, alamat, tautan peta | `events` |
| Foto mempelai, foto pembuka, galeri | `couple.*.photo`, `photos.cover`, `photos.gallery` (taruh berkas di `assets/img/`) |
| Rekening dan alamat kado | `gifts` |
| Musik | `music.src` (kosong = musik bawaan yang dimainkan peramban: Wedding March di v1, gamelan slendro di v2) |
| Nama dalam aksara Jawa (v2) | `couple.*.aksara` |
| Judul dan pratinjau saat tautan dibagikan | tag `<title>` dan `og:*` di `index.html` |

Bagian galeri otomatis tersembunyi selama `photos.gallery` kosong. Bingkai foto mempelai menampilkan inisial selama `photo` kosong.

## Nama tamu di sampul

Tambahkan `?to=Nama+Tamu` di akhir tautan:

```
https://domain-anda/?to=Bapak+Hendra+%26+Ibu+Sari
```

Buka `tamu.html` untuk membuat tautan banyak tamu sekaligus, lengkap dengan pesan pengantar siap tempel ke WhatsApp.

## RSVP dan ucapan

Tanpa pengaturan tambahan, jawaban tamu tersimpan di perangkat tamu itu sendiri. Agar jawaban sampai ke Anda:

1. **WhatsApp** (paling mudah): isi `rsvp.whatsapp` dengan nomor Anda. Setelah mengisi formulir, tamu mendapat tombol untuk mengirim konfirmasinya ke WhatsApp Anda.
2. **Daftar ucapan bersama**: isi `rsvp.endpoint` dengan URL yang menerima `POST` (JSON) dan mengembalikan larik JSON saat `GET`. Contoh dengan Google Sheets, lewat *Extensions → Apps Script*, lalu *Deploy → Web app* (akses: *Anyone*):

```js
const sheet = () => SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  sheet().appendRow([d.time, d.name, d.attend, d.guests, d.message]);
  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  const rows = sheet().getDataRange().getValues()
    .map(r => ({ time: r[0], name: r[1], attend: r[2], guests: r[3], message: r[4] }));
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}
```

## Struktur

```
index.html            halaman undangan
tamu.html             pembuat tautan per tamu
assets/css/style.css  tampilan
assets/js/config.js   isi undangan
assets/js/app.js      logika (sampul, hitung mundur, RSVP, musik, animasi)
```
