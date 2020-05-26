"use strict";

//меню
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

//картинка
const tvShowList = document.querySelector('.tv-shows__list');

//модальное окно
const modal = document.querySelector('.modal');

//открытие/закрытие меню

hamburger.addEventListener('click', () => {
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

//кликнули на пустое поле - менюшка закрылась

document.addEventListener('click', event => {
  if (!event.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
});

//раскрытие подменю (делигирование)

leftMenu.addEventListener('click', event => {
  const target = event.target;
  const dropdown = target.closest('.dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }
});

//функция замены картинки
const toggleImage = event => {
  const card = event.target.closest('.tv-shows__item');
  if (card) {
    const img = card.querySelector('.tv-card__img');
    if (img.dataset.backdrop) {
      [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
    }
  }
};

//наведение на картинку -> замена изображения
tvShowList.addEventListener('mouseover', toggleImage);
tvShowList.addEventListener('mouseout', toggleImage);


//открытие модального окна
tvShowList.addEventListener('click', event => {
  const card = event.target.closest('.tv-card');
  if (card) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hide');
  }
});

//закрытие модального окна
modal.addEventListener('click', event => {
  if (event.target.closest('.cross') ||
    event.target.classList.contains('modal')) {
    document.body.style.overflow = '';
    modal.classList.add('hide');
  }
});

//смена карточки
