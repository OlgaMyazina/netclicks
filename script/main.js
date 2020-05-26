"use strict";

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'bd60be5200cc50b17a865684bf429562';

//меню
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

//картинка
const tvShowList = document.querySelector('.tv-shows__list');

//модальное окно
const modal = document.querySelector('.modal');


const DBConnect = class {
  getData = async (url) => {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Не удалось получить данные по адресу ${url}`);
    }
  };
  getTestData = () => {
    return this.getData('test.json');
  }
};

//создаём карточку
const renderCard = response => {
  tvShowList.textContent = '';
  response.results.forEach(item => {
    const {backdrop_path: backdrop, name: title, poster_path: poster, vote_average: vote} = item;
    const posterImg = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropImg = backdrop ? IMG_URL + backdrop : '';
    const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : ``;
    const card = document.createElement('li');
    card.classList.add('tv-shows__item');

    card.insertAdjacentHTML('beforeend', `
        <a href="#" class="tv-card">
            ${voteElem}
            <img class="tv-card__img"
                src="${posterImg}"
                data-backdrop="${backdropImg}"
                alt="${title}">
            <h4 class="tv-card__head">${title}</h4>
        </a>
    `);
    tvShowList.append(card);
  })
};

new DBConnect().getTestData().then(renderCard);


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
  event.preventDefault();
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

