document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const categorySelect = document.getElementById('category-select');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const reviewForm = document.getElementById('review-form');
  const reviewInput = document.getElementById('review-text');

  // Счётчик кликов для каждой карточки
  const clickCounters = new Map();

  // Подсветка названия при наведении
  gallery.addEventListener('mouseover', (e) => {
    const nameElem = e.target.closest('.artifact-name');
    if (nameElem) {
      nameElem.style.color = '#e67e22';
    }
  });

  gallery.addEventListener('mouseout', (e) => {
    const nameElem = e.target.closest('.artifact-name');
    if (nameElem) {
      nameElem.style.color = '';
    }
  });

  // Делегирование кликов по кнопкам "Подробнее"
  gallery.addEventListener('click', (e) => {
    const btn = e.target.closest('.details-btn');
    if (!btn) return;

    const card = btn.closest('.artifact-card');
    if (!card) return;

    // Обновляем счётчик кликов
    let count = clickCounters.get(card) || 0;
    count++;
    clickCounters.set(card, count);

    // Обновляем отображение счётчика
    const counterSpan = card.querySelector('.click-counter');
    if (counterSpan) {
      counterSpan.textContent = `Кликов: ${count}`;
    }

    // Открываем модальное окно с полной информацией
    const title = card.querySelector('.artifact-name').textContent;
    const imgSrc = card.querySelector('img').src;
    const imgAlt = card.querySelector('img').alt;
    const shortDesc = card.querySelector('.artifact-short-desc').textContent;

    modalTitle.textContent = title;
    modalImage.src = imgSrc;
    modalImage.alt = imgAlt;
    modalDescription.textContent = `Полное описание: ${shortDesc}`;

    modal.classList.add('show');
  });

  // Закрытие модального окна
  function closeModal() {
    modal.classList.remove('show');
  }

  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Фильтр по категории
  categorySelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    const cards = gallery.querySelectorAll('.artifact-card');

    cards.forEach(card => {
      const category = card.dataset.category;
      if (selected === 'all' || selected === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Увеличение изображения при двойном клике
  gallery.addEventListener('dblclick', (e) => {
    const img = e.target.closest('img');
    if (!img || !img.closest('.artifact-card')) return;

    if (img.style.transform === 'scale(1.5)') {
      img.style.transform = 'scale(1)';
      img.style.transition = 'transform 0.3s';
      img.style.zIndex = '';
      img.style.position = '';
    } else {
      img.style.transform = 'scale(1.5)';
      img.style.transition = 'transform 0.3s';
      img.style.zIndex = '10';
      img.style.position = 'relative';
    }
  });

  // Отмена контекстного меню на изображениях с предупреждением
  gallery.addEventListener('contextmenu', (e) => {
    const img = e.target.closest('img');
    if (img && img.closest('.artifact-card')) {
      e.preventDefault();
      alert('Контекстное меню на изображениях запрещено!');
    }
  });

  // Подсветка поля отзыва при фокусе и возврат стиля при потере
  reviewInput.addEventListener('focus', () => {
    reviewInput.style.borderColor = '#e67e22';
    reviewInput.style.boxShadow = '0 0 8px rgba(230,126,34,0.7)';
  });

  reviewInput.addEventListener('blur', () => {
    reviewInput.style.borderColor = '';
    reviewInput.style.boxShadow = '';
  });

  // Обработка отправки формы
  reviewForm.addEventListener('submit', (e) => {
    if (reviewInput.value.trim() === '') {
      e.preventDefault();
      alert('Пожалуйста, заполните поле отзыва перед отправкой.');
      reviewInput.focus();
    }
  });

  // Кнопка "Наверх"
  const topBtn = document.createElement('button');
  topBtn.textContent = 'Наверх';
  topBtn.style.position = 'fixed';
  topBtn.style.bottom = '30px';
  topBtn.style.right = '30px';
  topBtn.style.padding = '10px 15px';
  topBtn.style.fontSize = '16px';
  topBtn.style.border = 'none';
  topBtn.style.borderRadius = '5px';
  topBtn.style.backgroundColor = '#3498db';
  topBtn.style.color = '#fff';
  topBtn.style.cursor = 'pointer';
  topBtn.style.display = 'none';
  topBtn.style.zIndex = '1001';
  topBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      topBtn.style.display = 'block';
    } else {
      topBtn.style.display = 'none';
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
