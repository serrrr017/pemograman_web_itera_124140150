# ===================================================
# Berkas: tugas1_bmi.py
# Deskripsi: Program penghitung BMI (Body Mass Index)
# ===================================================


def hitung_bmi(berat: float, tinggi: float) -> float:
    """
    Menghitung nilai BMI.

    Parameter:
        berat  (float): berat badan dalam kilogram (kg)
        tinggi (float): tinggi badan dalam meter (m)

    Return:
        float: nilai BMI = berat / (tinggi * tinggi)
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi: float) -> str:
    """
    Menentukan kategori berat badan berdasarkan nilai BMI.

    Parameter:
        bmi (float): nilai BMI

    Return:
        str: kategori berat badan
    """
    if bmi < 18.5:
        return "Berat badan kurang"

    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


# ---------------- Program Utama ----------------
print("=== KALKULATOR BMI ===")
berat_badan = float(input("Masukkan berat badan (kg): "))
tinggi_badan = float(input("Masukkan tinggi badan (m)  : "))

nilai_bmi = hitung_bmi(berat_badan, tinggi_badan)
kategori = tentukan_kategori(nilai_bmi)

print("\n--- HASIL ---")
print(f"Nilai BMI : {nilai_bmi:.2f}")
print(f"Kategori  : {kategori}")
