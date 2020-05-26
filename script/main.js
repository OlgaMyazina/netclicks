"use strict";

//меню
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

//картинка
const tvCardImgs = document.querySelectorAll('.tv-card__img');

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

