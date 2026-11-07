# ===================================================
# Berkas: tugas2_nilai_mahasiswa.py
# Deskripsi: Pengelolaan data nilai mahasiswa
# ===================================================

# Data minimal 5 mahasiswa (ganti dengan data sesuai keinginan)
data_mahasiswa = [
    {"nama": "Sere Sinaga", "nim": "124140150", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Lisa Manoban",  "nim": "124140066", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Budiono Siregar", "nim": "124140018", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Messi Naldin", "nim": "124140072", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Titut Layla", "nim": "122140005", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir dengan bobot 30% UTS, 40% UAS, 30% Tugas.

    Parameter:
        uts   (float): nilai UTS
        uas   (float): nilai UAS
        tugas (float): nilai tugas

    Return:
        float: nilai akhir
    """
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """

    Menentukan grade berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa

    Return:
        str: grade A, B, C, D, atau E
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


# Hitung nilai akhir & grade, simpan ke dalam dictionary masing-masing
for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(
        mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
    )
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

# Tampilkan tabel
garis = "=" * 62
print(garis)
print(f"{'No':<4}{'Nama':<20}{'NIM':<14}{'Nilai Akhir':>12}{'Grade':>8}")
print(garis)

for no, mhs in enumerate(data_mahasiswa, start=1):
    print(
        f"{no:<4}{mhs['nama']:<20}{mhs['nim']:<14}"
        f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}"
    )
print(garis)

# Cari nilai tertinggi & terendah
tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nMahasiswa dengan nilai akhir TERTINGGI:")
print(f"  {tertinggi['nama']} ({tertinggi['nim']}) - "
      f"{tertinggi['nilai_akhir']:.2f} - Grade {tertinggi['grade']}")

print("\nMahasiswa dengan nilai akhir TERENDAH:")
print(f"  {terendah['nama']} ({terendah['nim']}) - "
      f"{terendah['nilai_akhir']:.2f} - Grade {terendah['grade']}")