// Variabel global untuk menyimpan data
let flashcardData = [];

// Fungsi untuk memuat data JSON
async function loadFlashcardData() {
    try {
        const response = await fetch('./assets/data.json');
        const data = await response.json();
        flashcardData = data.flashcardData;
        renderFlashcards();
        setTimeout(showInfo, 1000);
    } catch (error) {
        console.error('Error loading flashcard data:', error);
        Swal.fire({
            title: 'Error',
            text: 'Gagal memuat data flashcard',
            icon: 'error'
        });
    }
}

// Fungsi untuk merender flashcard
function renderFlashcards(cards = flashcardData) {
    const main = document.querySelector('main');
    main.innerHTML = '';

    if (cards.length === 0) {
        main.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="inline-block p-4 bg-yellow-50 rounded-full mb-4">
          <i class="fas fa-search text-3xl text-yellow-500"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-700">Tidak ada rumus yang ditemukan</h3>
        <p class="text-gray-600 mt-2">Coba pilih kategori lain</p>
      </div>
    `;
        return;
    }

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'flip-card w-full h-72 relative';
        cardElement.setAttribute('data-category', card.category);
        cardElement.innerHTML = `
      <div class="flip-inner w-full h-full">
        <!-- Depan (Gambar) -->
        <div class="flip-front bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-4">
          <div class="w-32 h-32 flex items-center justify-center mb-4">
            <img src="${card.frontImage}" alt="${card.name}" class="max-w-full max-h-full object-contain" />
          </div>
          <h3 class="text-lg font-bold text-sky-600">${card.name}</h3>
          <p class="text-sm text-gray-500 mt-1">${getCategoryName(card.category)}</p>
        </div>
        
        <!-- Belakang (Rumus) -->
        <div class="flip-back bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg rounded-xl flex flex-col items-center justify-center p-4">
          <h3 class="text-lg font-bold mb-3">${card.name}</h3>
          <div class="text-2xl font-bold mb-2 text-center">${card.formula}</div>
          <div class="keterangan">${card.description}</div>
        </div>
      </div>
    `;

        cardElement.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });

        main.appendChild(cardElement);
    });

    // gsap.from("main > .flip-card", {
    //     opacity: 0,
    //     y: 50,
    //     duration: 0.6,
    //     stagger: 0.1,
    //     delay: 0.2
    // });
}

// Fungsi untuk mendapatkan nama kategori
function getCategoryName(category) {
    const categories = {
        'luas': 'Rumus Luas',
        'keliling': 'Rumus Keliling',
        'volume': 'Rumus Volume',
        'luas-permukaan': 'Luas Permukaan'
    };
    return categories[category] || category;
}

// Fungsi untuk filter kategori
function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active', 'text-white');
        btn.classList.add('bg-white');
    });

    const activeBtn = document.getElementById(`btn-${category}`);
    activeBtn.classList.add('active', 'text-white');
    activeBtn.classList.remove('bg-white');

    if (category === 'all') {
        renderFlashcards();
    } else {
        const filteredCards = flashcardData.filter(card => card.category === category);
        renderFlashcards(filteredCards);
    }
}

// Fungsi untuk menampilkan info
function showInfo() {
    Swal.fire({
        title: 'Cara Menggunakan',
        html: `
      <div class="text-left">
        <p class="mb-3"><b>1. Pilih Kategori</b> - Gunakan tombol di atas untuk memfilter rumus berdasarkan kategori</p>
        <p class="mb-3"><b>2. Klik Kartu</b> - Klik pada kartu untuk melihat rumus di baliknya</p>
        <p><b>3. Ulangi</b> - Klik lagi untuk kembali ke gambar</p>
      </div>
    `,
        icon: 'info',
        confirmButtonText: 'Mengerti',
        confirmButtonColor: '#0284c7'
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadFlashcardData);

// Fungsi untuk tombol scroll-to-top
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Tampilkan tombol saat scroll melewati 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Animasi scroll ke atas saat tombol diklik
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fungsi untuk tombol scroll-to-top
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Tampilkan/sembunyikan tombol berdasarkan scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll ke atas saat tombol diklik
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Animasi scroll halus
        });
    });
}

// Panggil fungsi di initializeApp()
async function initializeApp() {
    try {
        await loadFlashcardData();
        renderFlashcards();
        setTimeout(showInfo, 1000);
        initScrollToTop(); // Tambahkan ini
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    }
}