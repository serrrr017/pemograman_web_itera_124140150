// State Aplikasi & Inisialisasi LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Selektor Elemen DOM
const productForm = document.getElementById('productForm');
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const itemQtyInput = document.getElementById('itemQty');

const errorName = document.getElementById('errorName');
const errorPrice = document.getElementById('errorPrice');
const errorQty = document.getElementById('errorQty');

const cartTableBody = document.getElementById('cartTableBody');
const displayTotal = document.getElementById('displayTotal');
const displayDiscount = document.getElementById('displayDiscount');
const displayFinalTotal = document.getElementById('displayFinalTotal');
const cashPaidInput = document.getElementById('cashPaid');
const displayChange = document.getElementById('displayChange');
const btnResetAll = document.getElementById('btnResetAll');

// Format Angka ke Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

// Render Tabel & Kalkulasi Otomatis
function renderCart() {
    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
        cartTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Keranjang masih kosong</td></tr>`;
        updateCalculations(0);
        return;
    }

    let totalBelanja = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        totalBelanja += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${formatRupiah(item.price)}</td>
            <td>${item.qty}</td>
            <td>${formatRupiah(subtotal)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Hapus</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    updateCalculations(totalBelanja);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Kalkulator Diskon & Pembayaran
function updateCalculations(totalBelanja) {
    let discount = 0;
    if (totalBelanja >= 50000) {
        discount = totalBelanja * 0.10; // Diskon 10%
    }

    let finalTotal = totalBelanja - discount;
    let cashPaid = parseFloat(cashPaidInput.value) || 0;
    let change = cashPaid - finalTotal;

    displayTotal.textContent = formatRupiah(totalBelanja);
    displayDiscount.textContent = formatRupiah(discount);
    displayFinalTotal.textContent = formatRupiah(finalTotal);

    if (cashPaid === 0) {
        displayChange.textContent = 'Rp 0';
        displayChange.style.color = 'inherit';
    } else if (change < 0) {
        displayChange.textContent = `Uang kurang ${formatRupiah(Math.abs(change))}`;
        displayChange.style.color = 'var(--danger-color)';
    } else {
        displayChange.textContent = formatRupiah(change);
        displayChange.style.color = '#10b981'; // Hijau sukses
    }
}

// Event Listener Submit Form & Validasi
productForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const qty = parseInt(itemQtyInput.value);

    // Validasi Nama Barang
    if (name.length < 3) {
        errorName.textContent = 'Nama barang wajib diisi minimal 3 karakter.';
        isValid = false;
    } else {
        errorName.textContent = '';
    }

    // Validasi Harga Satuan
    if (isNaN(price) || price < 500) {
        errorPrice.textContent = 'Harga satuan wajib berupa angka dan minimal Rp 500.';
        isValid = false;
    } else {
        errorPrice.textContent = '';
    }

    // Validasi Qty
    if (isNaN(qty) || qty < 1) {
        errorQty.textContent = 'Jumlah (qty) minimal bernilai 1.';
        isValid = false;
    } else {
        errorQty.textContent = '';
    }

    // Jika valid, masukkan ke keranjang
    if (isValid) {
        cart.push({ name, price, qty });
        productForm.reset();
        itemQtyInput.value = 1; // Reset default qty ke 1
        renderCart();
    }
});

// Hapus Item Berdasarkan Index
window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
};

// Input Uang Bayar Berubah
cashPaidInput.addEventListener('input', function () {
    let totalBelanja = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    updateCalculations(totalBelanja);
});

// Tombol Reset / Transaksi Baru
btnResetAll.addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang dan memulai transaksi baru?')) {
        cart = [];
        localStorage.removeItem('cart');
        cashPaidInput.value = '';
        errorName.textContent = '';
        errorPrice.textContent = '';
        errorQty.textContent = '';
        renderCart();
    }
});

// Inisialisasi Pertama Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});