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
            <img src="${card.frontImage}" alt="${card.name}" 
                 class="max-w-full max-h-full object-contain"
                 onerror="this.onerror=null;this.src='assets/img/placeholder.png'">
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
    
    cardElement.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
    
    main.appendChild(cardElement);
  });
}