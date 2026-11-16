"""
library.py
----------
Berisi class Library yang mengelola koleksi item perpustakaan.

Encapsulation: koleksi disimpan di atribut private __koleksi sehingga
hanya bisa dimodifikasi lewat method tambah_item().
"""

from library_item import LibraryItem


class Library:
    """Perpustakaan: menyimpan, menampilkan, dan mencari item."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi: list[LibraryItem] = []  # private

    @property
    def jumlah_item(self) -> int:
        """Total item dalam koleksi (dipinjam maupun tersedia)."""
        return len(self.__koleksi)

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item ke koleksi. Ditolak jika ID sudah terdaftar."""
        if self.cari_by_id(item.item_id) is not None:
            print(f"  Gagal: ID '{item.item_id}' sudah terdaftar.")
            return False
        self.__koleksi.append(item)
        print(f"  Item ditambahkan: {item.judul}")
        return True

    def tampilkan_katalog(self, hanya_tersedia: bool = True):
        """Menampilkan katalog. Default hanya item yang tersedia (tidak dipinjam)."""
        judul = "ITEM TERSEDIA" if hanya_tersedia else "SELURUH KOLEKSI"
        print(f"\n=== KATALOG {judul} - {self.nama} ===")
        tampil = [i for i in self.__koleksi if not (hanya_tersedia and i.is_dipinjam)]
        if not tampil:
            print("  (kosong)")
        for item in tampil:
            # Polymorphism: get_detail() berbeda untuk Book dan Magazine
            status = "Dipinjam" if item.is_dipinjam else "Tersedia"
            print(f"  {item.get_detail()} | {status}")

    def cari_by_id(self, item_id: str):
        """Mencari item berdasarkan ID persis. Return None jika tidak ditemukan."""
        for item in self.__koleksi:
            if item.item_id.lower() == item_id.lower():
                return item
        return None

    def cari_by_judul(self, kata_kunci: str) -> list:
        """Mencari item yang judulnya memuat kata kunci (tidak case-sensitive)."""
        kata = kata_kunci.lower()
        return [i for i in self.__koleksi if kata in i.judul.lower()]
