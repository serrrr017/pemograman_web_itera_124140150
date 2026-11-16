"""
library_item.py
---------------
Berisi abstract class LibraryItem beserta subclass konkrit Book dan Magazine.

Konsep OOP yang diterapkan di berkas ini:
- Abstraction     : LibraryItem(ABC) dengan abstract method get_detail() & hitung_denda()
- Inheritance     : Book dan Magazine mewarisi LibraryItem
- Encapsulation   : atribut protected (_item_id, _judul, _tahun) dan private (__dipinjam)
- Polymorphism    : get_detail() & hitung_denda() berperilaku berbeda di tiap subclass
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract base class untuk seluruh item di perpustakaan."""

    def __init__(self, item_id: str, judul: str, tahun: int):
        """
        Args:
            item_id: kode unik item (contoh: "B001").
            judul  : judul item.
            tahun  : tahun terbit.
        """
        # Atribut protected: boleh diakses subclass, tidak disarankan dari luar.
        self._item_id = item_id
        self._judul = judul
        self._tahun = tahun
        # Atribut private: status pinjam hanya boleh diubah lewat pinjam()/kembalikan().
        self.__dipinjam = False

    # ------------------------------------------------------------------
    # PROPERTY (getter read-only)
    # ------------------------------------------------------------------
    @property
    def item_id(self) -> str:
        """ID unik item (read-only)."""
        return self._item_id

    @property
    def judul(self) -> str:
        """Judul item (read-only)."""
        return self._judul

    @property
    def tahun(self) -> int:
        """Tahun terbit item (read-only)."""
        return self._tahun

    @property
    def is_dipinjam(self) -> bool:
        """True jika item sedang dipinjam. Status private hanya bisa dibaca di sini."""
        return self.__dipinjam

    # ------------------------------------------------------------------
    # ABSTRACT METHODS: wajib diimplementasikan oleh subclass
    # ------------------------------------------------------------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan deskripsi lengkap item sesuai jenisnya."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        """Menghitung denda keterlambatan (dalam Rupiah) sesuai jenis item."""

    # ------------------------------------------------------------------
    # CONCRETE METHODS: logika umum yang dibagikan ke semua subclass
    # ------------------------------------------------------------------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. Return False jika sudah dipinjam."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai tersedia. Return False jika memang tidak sedang dipinjam."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    def __str__(self) -> str:
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self._item_id}] {self._judul} ({self._tahun}) - {status}"


class Book(LibraryItem):
    """Buku: denda Rp 1.000 per hari keterlambatan."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, tahun: int, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        """Detail buku: penulis dan jumlah halaman."""
        return (f"Buku     | {self._item_id} | {self._judul} | Penulis: {self.penulis} | "
                f"{self.jumlah_halaman} hlm | Tahun {self._tahun}")

    def hitung_denda(self, hari_terlambat: int) -> float:
        """Denda buku = hari terlambat x Rp 1.000."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    def __len__(self) -> int:
        """len(buku) mengembalikan jumlah halaman."""
        return self.jumlah_halaman


class Magazine(LibraryItem):
    """Majalah: denda Rp 2.000 per hari keterlambatan (lebih mahal karena edisi terbatas)."""

    DENDA_PER_HARI = 2000

    def __init__(self, item_id: str, judul: str, tahun: int, edisi: str, penerbit: str):
        super().__init__(item_id, judul, tahun)
        self.edisi = edisi
        self.penerbit = penerbit

    def get_detail(self) -> str:
        """Detail majalah: edisi dan penerbit."""
        return (f"Majalah  | {self._item_id} | {self._judul} | Edisi: {self.edisi} | "
                f"Penerbit: {self.penerbit} | Tahun {self._tahun}")

    def hitung_denda(self, hari_terlambat: int) -> float:
        """Denda majalah = hari terlambat x Rp 2.000."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI
