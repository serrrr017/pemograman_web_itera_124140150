"""
member.py
---------
Berisi class Member (anggota perpustakaan).

Encapsulation: daftar pinjaman disimpan di atribut private __daftar_pinjam
dan hanya bisa diubah lewat method pinjam_item()/kembalikan_item().
"""

from library_item import LibraryItem


class Member:
    """Anggota perpustakaan dengan batas maksimal peminjaman."""

    MAKS_PINJAM = 3

    def __init__(self, member_id: str, nama: str):
        self._member_id = member_id
        self.nama = nama
        self.__daftar_pinjam: list[LibraryItem] = []  # private

    @property
    def member_id(self) -> str:
        """ID anggota (read-only)."""
        return self._member_id

    @property
    def jumlah_pinjaman(self) -> int:
        """Jumlah item yang sedang dipinjam anggota ini."""
        return len(self.__daftar_pinjam)

    def pinjam_item(self, item: LibraryItem) -> bool:
        """Meminjam item. Gagal jika kuota penuh atau item sedang dipinjam."""
        if self.jumlah_pinjaman >= self.MAKS_PINJAM:
            print(f"  Gagal: {self.nama} sudah mencapai batas {self.MAKS_PINJAM} pinjaman.")
            return False
        if not item.pinjam():
            print(f"  Gagal: '{item.judul}' sedang dipinjam.")
            return False
        self.__daftar_pinjam.append(item)
        print(f"  {self.nama} berhasil meminjam '{item.judul}'.")
        return True

    def kembalikan_item(self, item: LibraryItem, hari_terlambat: int = 0) -> float:
        """Mengembalikan item. Mengembalikan nominal denda (0 jika tepat waktu)."""
        if item not in self.__daftar_pinjam:
            print(f"  Gagal: '{item.judul}' tidak sedang dipinjam oleh {self.nama}.")
            return 0.0
        self.__daftar_pinjam.remove(item)
        item.kembalikan()
        denda = item.hitung_denda(hari_terlambat)  # polimorfik: beda per jenis item
        print(f"  {self.nama} mengembalikan '{item.judul}'. Denda: Rp {denda:,.0f}")
        return denda

    def daftar_pinjaman(self) -> list:
        """Salinan daftar pinjaman (daftar aslinya tetap terlindungi)."""
        return list(self.__daftar_pinjam)

    def __str__(self) -> str:
        return f"Member {self._member_id}: {self.nama} ({self.jumlah_pinjaman} pinjaman)"
