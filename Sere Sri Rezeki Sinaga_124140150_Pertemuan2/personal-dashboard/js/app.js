// Model Data menggunakan Class TransactionItem
export class TransactionItem {
  constructor(id, desc, amount, type) {
    this.id = id;
    this.desc = desc;
    this.amount = Number(amount);
    this.type = type; // 'income' atau 'expense'
    
    const now = new Date();
    this.rawDate = now.toISOString().split('T')[0];
    this.date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  }
}

// Controller Utama Budgeting & Penjatahan
export class BudgetingApp {
  constructor() {
    this.transactions = [];
    this.init();
  }

  async init() {
    this.loadFromLocalStorage();
    this.setupEventListeners();
    this.startClock(); // Menjalankan jam real-time

    // Tetap memanggil API DummyJSON untuk kutipan, tapi kita timpa dengan kata-kata gaul lokal yang kocak
    await this.fetchFunnyQuote();

    this.render();
  }

  loadFromLocalStorage = () => {
    const saved = localStorage.getItem('dompet_aman_data');
    if (saved) {
      const rawData = JSON.parse(saved);
      this.transactions = rawData.map(item => {
        const trx = new TransactionItem(item.id, item.desc, item.amount, item.type);
        trx.date = item.date || trx.date;
        trx.rawDate = item.rawDate || new Date().toISOString().split('T')[0];
        return trx;
      });
    } else {
      const todayISO = new Date().toISOString().split('T')[0];
      this.transactions = [
        new TransactionItem(1, "Uang Saku Bulanan", 1500000, "income"),
        new TransactionItem(2, "Beli Modul & Print Tugas", 35000, "expense"),
        new TransactionItem(3, "Ngopi di Kantin Biar Gak Panik", 25000, "expense")
      ];
      this.transactions.forEach(t => t.rawDate = todayISO);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('dompet_aman_data', JSON.stringify(this.transactions));
  }

  // Fitur Jam Real-Time di Header
  startClock() {
    const clockText = document.getElementById('clock-text');
    const updateTime = () => {
      const now = new Date();
      clockText.textContent = now.toLocaleTimeString('id-ID') + " WIB";
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Kata-kata motivasi bahasa Indonesia yang gaul dan kocak
  async fetchFunnyQuote() {
    const quoteEl = document.getElementById('quote-text');
    const funnyQuotes = [
      "\"Ingat ya ges ya, uang bisa dicari, tapi kalau IPK anjlok, mamak ngamuk.\" — Sere 2026",
      "\"Jangan biarkan saldo ATM kamu lebih sedikit daripada jumlah mantanmu.\" — Sere",
      "\"Uang bulanan itu kayak hantu, wujudnya gak keliatan tapi kerasa banget pas perginya.\" — Sere",
      "\"Uang bulanan itu ibarat dia yang lagi akur-akurnya, lalu tiba tiba perginya.\" — Sere",
      

    ];
    // Pilih acak kutipan gaul
    const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
    quoteEl.textContent = randomQuote;
  }

  setupEventListeners() {
    const form = document.getElementById('transaction-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const descInput = document.getElementById('trx-desc');
      const amountInput = document.getElementById('trx-amount');
      const typeInput = document.getElementById('trx-type');

      const desc = descInput.value.trim();
      const amount = amountInput.value;
      const type = typeInput.value;

      if (desc && amount) {
        this.addTransaction(desc, amount, type);
        descInput.value = '';
        amountInput.value = '';
        typeInput.value = 'income';
      }
    });
  }

  addTransaction(desc, amount, type) {
    const newItem = new TransactionItem(Date.now(), desc, amount, type);
    this.transactions = [...this.transactions, newItem];
    this.saveToLocalStorage();
    this.render();
  }

  deleteTransaction = (id) => {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveToLocalStorage();
    this.render();
  }

  formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  render = () => {
    const listContainer = document.getElementById('transaction-list');
    const balanceEl = document.getElementById('total-balance');
    const incomeEl = document.getElementById('total-income');
    const expenseEl = document.getElementById('total-expense');
    const statusEl = document.getElementById('budget-status');
    const quotaBox = document.getElementById('daily-quota-box');

    const totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const currentBalance = totalIncome - totalExpense;

    balanceEl.textContent = this.formatRupiah(currentBalance);
    incomeEl.textContent = this.formatRupiah(totalIncome);
    expenseEl.textContent = this.formatRupiah(totalExpense);

    const todayObj = new Date();
    const todayISO = todayObj.toISOString().split('T')[0];
    const dayOfWeek = todayObj.getDay();

    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const maxDailyLimit = isWeekend ? 100000 : 50000;
    const dayNameStr = todayObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const todayExpense = this.transactions
      .filter(t => t.type === 'expense' && t.rawDate === todayISO)
      .reduce((sum, t) => sum + t.amount, 0);

    const isBorosToday = todayExpense > maxDailyLimit;
    const remainingQuota = maxDailyLimit - todayExpense;

    // Kustomisasi teks aman dan boros sesuai permintaanmu
    quotaBox.innerHTML = `
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <p class="text-xs text-[#735A4D]">Hari ini: <span class="text-[#362B28] font-semibold">${dayNameStr}</span> (${isWeekend ? 'Akhir Pekan' : 'Hari Kerja'})</p>
          <p class="text-sm font-bold text-[#362B28] mt-0.5">Batas Jatah Harian: <span class="text-[#5C4033]">${this.formatRupiah(maxDailyLimit)}</span></p>
          <p class="text-xs text-[#735A4D] mt-1">Pengeluaran Hari Ini: <span class="font-bold text-[#9B3C35]">${this.formatRupiah(todayExpense)}</span></p>
        </div>
        <div class="text-left sm:text-right">
          <span class="px-3 py-1.5 rounded-xl text-xs font-bold border ${isBorosToday ? 'bg-[#F9D5D2] text-[#7A231F] border-[#E5A8A4]' : 'bg-[#DCE7DC] text-[#284E2F] border-[#B5CDB7]'}">
            ${isBorosToday ? 'BOROS KALI BOSS, BUKAN TOKE SAWIT KITA' : 'AMAN BOSKUU'}
          </span>
        </div>
      </div>
    `;

    if (isBorosToday) {
      statusEl.textContent = `🚨 Wah parah sih, dompet kamu udah menjerit hari ini!`;
    } else {
      statusEl.textContent = `✨ Santai, dompet masih aman terkendali!`;
    }

    if (this.transactions.length === 0) {
      listContainer.innerHTML = `<p class="text-[#A39284] text-center py-6 text-sm">Belum ada rincian transaksi keuangan.</p>`;
      return;
    }

    listContainer.innerHTML = this.transactions.map(({ id, desc, amount, type, date }) => {
      const isIncome = type === 'income';
      const badgeColor = isIncome ? 'bg-[#DCE7DC] text-[#284E2F] border-[#B5CDB7]' : 'bg-[#F9D5D2] text-[#7A231F] border-[#E5A8A4]';
      const amountSign = isIncome ? '+' : '-';
      const amountColor = isIncome ? 'text-[#386641]' : 'text-[#9B3C35]';

      return `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-[#D8C4B6] rounded-xl bg-[#F9F5F0] hover:bg-[#EFE3D5] transition gap-3 shadow-2xs">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${isIncome ? 'bg-[#DCE7DC] text-[#386641]' : 'bg-[#F9F5F0] text-[#9B3C35]'}">
              <i class="fa-solid ${isIncome ? 'fa-arrow-down-long' : 'fa-arrow-up-long'}"></i>
            </div>
            <div>
              <p class="text-sm font-semibold text-[#362B28]">${desc}</p>
              <div class="flex items-center gap-2 mt-0.5 text-xs text-[#735A4D]">
                <span><i class="fa-regular fa-calendar mr-1"></i> ${date}</span>
                <span class="px-2 py-0.2 rounded-full text-[10px] font-bold border ${badgeColor}">
                  ${isIncome ? 'Pemasukan' : 'Pengeluaran'}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span class="text-sm font-bold ${amountColor}">${amountSign} ${this.formatRupiah(amount)}</span>
            <button 
              onclick="window.budgetApp.deleteTransaction(${id})" 
              class="text-xs bg-[#F9D5D2] hover:bg-[#F2BCB9] text-[#7A231F] px-3 py-1.5 rounded-lg transition font-medium border border-[#E5A8A4] cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}