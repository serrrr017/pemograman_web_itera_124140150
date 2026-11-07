# Tugas Pertemuan 4 - Dasar Pemrograman Python

## Identitas Mahasiswa

| | |
|---|---|
| **Nama** | Sere Sri Rezeki Sinaga |
| **NIM** | 124140150 |
| **Program Studi** | Teknik Informatika |
| **Mata Kuliah** | Pemrograman Web  |
| **Kelas** | RA  |

---

## Struktur Folder

```
Sere Sri Rezeki Sinaga_124140150_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
├── main.py
└── screenshots/
    ├── soal1.png
    ├── soal2.png
    └── soal3.png
```

---

## Deskripsi Program

### Soal 1: Program Penghitung BMI (`tugas1_bmi.py`)

Program menghitung Body Mass Index (BMI) dari berat dan tinggi badan yang diinput pengguna.

**Alur kerja:**
1. Pengguna memasukkan berat badan (kg) dan tinggi badan (m).
2. Fungsi `hitung_bmi(berat, tinggi)` menghitung BMI dengan rumus `berat / (tinggi * tinggi)`.
3. Fungsi `tentukan_kategori(bmi)` menentukan kategori dengan struktur `if-elif-else`:
   - BMI < 18.5 : Berat badan kurang
   - 18.5 <= BMI < 25 : Berat badan normal
   - 25 <= BMI < 30 : Berat badan berlebih
   - BMI >= 30 : Obesitas
4. Nilai BMI (2 angka desimal) dan kategorinya ditampilkan ke terminal.

### Soal 2: Pengelolaan Data Nilai Mahasiswa (`tugas2_nilai_mahasiswa.py`)

Program mengelola data nilai 5 mahasiswa yang disimpan dalam list berisi dictionary.

**Alur kerja:**
1. Data mahasiswa (`nama`, `nim`, `nilai_uts`, `nilai_uas`, `nilai_tugas`) disimpan dalam list of dictionary.
2. Fungsi `hitung_nilai_akhir(uts, uas, tugas)` menghitung nilai akhir dengan bobot **30% UTS + 40% UAS + 30% Tugas**.
3. Fungsi `tentukan_grade(nilai_akhir)` menentukan grade:
   - A : >= 80
   - B : 70 - 79
   - C : 60 - 69
   - D : 50 - 59
   - E : < 50
4. Seluruh data (Nama, NIM, Nilai Akhir, Grade) ditampilkan dalam bentuk tabel rapi.
5. Program mencari dan menampilkan mahasiswa dengan nilai akhir **tertinggi** dan **terendah**.

### Soal 3: Modul Matematika (`math_operations.py` dan `main.py`)

**`math_operations.py`** adalah modul yang berisi:
- Konstanta `PI = 3.14159`
- Fungsi geometri: `luas_persegi`, `keliling_persegi`, `luas_persegi_panjang`, `keliling_persegi_panjang`, `luas_lingkaran`, `keliling_lingkaran`
- Fungsi konversi suhu: `celsius_ke_fahrenheit`, `celsius_ke_kelvin`

**`main.py`** adalah program utama yang:
- Mengimpor modul dengan dua cara berbeda:
  - `import math_operations`
  - `from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI`
- Memanggil seluruh fungsi modul dengan berbagai nilai uji.
- Menampilkan hasil perhitungan dengan format yang rapi.

---

## Cara Menjalankan

Pastikan Python 3.10 atau lebih baru sudah terpasang (cek dengan `python --version`), lalu buka terminal di dalam folder proyek.

**Soal 1:**
```bash
python tugas1_bmi.py
```
Masukkan berat badan (kg) dan tinggi badan (m, gunakan titik desimal, contoh `1.70`) saat diminta.

**Soal 2:**
```bash
python tugas2_nilai_mahasiswa.py
```

**Soal 3:**
```bash
python main.py
```
Pastikan `math_operations.py` berada dalam folder yang sama dengan `main.py`.

> Jika perintah `python` tidak dikenali, gunakan `py` (Windows) atau `python3` (macOS/Linux).

---

## Screenshot Hasil Eksekusi

### Soal 1: Penghitung BMI
[Hasil Soal 1](screenshots/soal1.png)

### Soal 2: Pengelolaan Data Nilai Mahasiswa
[Hasil Soal 2](screenshots/soal2.png)

### Soal 3: Modul Matematika
[Hasil Soal 3](screenshots/soal3.png)

---

## Catatan

- Setiap fungsi dilengkapi docstring yang menjelaskan parameter input dan nilai kembalian.
- Kode mengikuti konvensi PEP 8 (indentasi 4 spasi dan penamaan `snake_case`).
