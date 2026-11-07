# ===================================================
# Berkas: main.py
# Deskripsi: Program utama pengguna modul math_operations
# ===================================================

# Cara impor 1: seluruh modul
import math_operations

# Cara impor 2: fungsi/konstanta spesifik
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI

print("=" * 45)
print("      PROGRAM PENGUJIAN MODUL GEOMETRI")
print("=" * 45)
print(f"Nilai konstanta PI : {PI}\n")

# --- Persegi ---
print("--- PERSEGI ---")
for sisi in [4, 7.5]:
    print(f"Sisi {sisi}: luas = {math_operations.luas_persegi(sisi):.2f}, "
          f"keliling = {math_operations.keliling_persegi(sisi):.2f}")

# --- Persegi Panjang ---
print("\n--- PERSEGI PANJANG ---")
for p, l in [(10, 5), (8.5, 3)]:
    print(f"P={p}, L={l}: luas = {math_operations.luas_persegi_panjang(p, l):.2f}, "
          f"keliling = {math_operations.keliling_persegi_panjang(p, l):.2f}")

# --- Lingkaran ---
print("\n--- LINGKARAN ---")
for r in [7, 10.5]:
    print(f"r={r}: luas = {math_operations.luas_lingkaran(r):.2f}, "
          f"keliling = {math_operations.keliling_lingkaran(r):.2f}")

# --- Konversi Suhu ---
print("\n--- KONVERSI SUHU ---")
for c in [0, 37, 100]:
    print(f"{c:>3} C = {celsius_ke_fahrenheit(c):>6.2f} F = "
          f"{celsius_ke_kelvin(c):>7.2f} K")