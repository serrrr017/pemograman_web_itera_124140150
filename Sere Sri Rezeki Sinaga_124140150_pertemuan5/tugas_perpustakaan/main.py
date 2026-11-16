"""
main.py
-------
Skrip uji untuk sistem perpustakaan sederhana.
Jalankan dengan: python main.py
"""

from library_item import Book, Magazine, LibraryItem
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    # 1. Menambahkan item (buku & majalah)
    print("--- 1. Menambahkan Item ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python Dasar", 2022, "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Struktur Data dan Algoritma", 2021, "Siti Rahma", 450))
    perpus.tambah_item(Book("B003", "Basis Data Lanjut", 2020, "Ahmad Fadhil", 280))
    perpus.tambah_item(Magazine("M001", "Tech Today", 2026, "Edisi 11/2026", "Media Teknologi"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", 2025, "Edisi 07/2025", "Penerbit Sains"))
    perpus.tambah_item(Book("B001", "Duplikat ID", 2024, "Tidak Ada", 100))  # ditolak

    # 2. Menampilkan katalog
    perpus.tampilkan_katalog()

    # 3. Mencari item
    print("\n--- 2. Pencarian ---")
    hasil = perpus.cari_by_judul("python")
    print("Cari judul 'python':", [i.judul for i in hasil])
    item = perpus.cari_by_id("M001")
    print("Cari ID 'M001':", item.get_detail() if item else "tidak ditemukan")
    print("Cari ID 'X999':", perpus.cari_by_id("X999"))

    # 4. Status ketersediaan (peminjaman)
    print("\n--- 3. Peminjaman & Status Ketersediaan ---")
    sere = Member("A001", "Sere")
    buku = perpus.cari_by_id("B001")
    majalah = perpus.cari_by_id("M001")
    sere.pinjam_item(buku)
    sere.pinjam_item(majalah)
    sere.pinjam_item(buku)  # sudah dipinjam
    print("B001 dipinjam?", buku.is_dipinjam)

    perpus.tampilkan_katalog()                       # hanya yang tersedia
    perpus.tampilkan_katalog(hanya_tersedia=False)   # seluruh koleksi

    # 5. Pengembalian & polymorphism denda
    print("\n--- 4. Pengembalian & Denda (Polymorphism) ---")
    sere.kembalikan_item(buku, hari_terlambat=3)      # Buku: 3 x 1.000
    sere.kembalikan_item(majalah, hari_terlambat=3)   # Majalah: 3 x 2.000
    print(sere)

    # 6. Bukti abstract class & encapsulation
    print("\n--- 5. Bukti Abstract Class & Encapsulation ---")
    try:
        LibraryItem("X001", "Item Abstrak", 2026)
    except TypeError as err:
        print("Abstract class ditolak:", err)
    try:
        print(buku.__dipinjam)
    except AttributeError:
        print("Akses langsung buku.__dipinjam GAGAL (private, name mangling).")

    perpus.tampilkan_katalog()


if __name__ == "__main__":
    main()
