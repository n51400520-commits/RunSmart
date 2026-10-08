'use strict';

document.querySelectorAll('[data-scroll]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(el.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

(() => {
  const track = document.getElementById('sliderTrack');
  const slides = track.children;
  const dotsBox = document.getElementById('sliderDots');
  const prev = document.querySelector('.slider__arrow--prev');
  const next = document.querySelector('.slider__arrow--next');
  let index = 0, timer;

  for (let i = 0; i < slides.length; i++) {
    const d = document.createElement('button');
    d.setAttribute('aria-label', 'Слайд ' + (i + 1));
    d.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(d);
  }

  function go(i) {
    index = (i + slides.length) % slides.length;      // по кругу
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsBox.children].forEach((d, n) => d.classList.toggle('is-active', n === index));
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(index + 1), 5000); }

  prev.addEventListener('click', () => { go(index - 1); restart(); });
  next.addEventListener('click', () => { go(index + 1); restart(); });

  go(0);
  restart();
})();

const products = {
  fitness: [
    { name: 'Пульсометр Polar FT1', old: '4 750', price: '4 500', desc: 'Для первых шагов в тренировках, основанных на сердечном ритме',
      more: ['Вы услышите звуковое оповещение о нужном пульсе во время тренировки;', 'Вы увидите информативный графический индикатор целевых тренировочных зон пульса;', 'Также Вы увидите информацию о расходе калорий за тренировку;', 'Вы сможете посмотреть данные по 10 тренировкам.'] },
    { name: 'Пульсометр Suunto M2', old: '6 690', price: '6 641', desc: 'Для первых шагов в тренировках, основанных на сердечном ритме',
      more: ['Простое управление одной кнопкой;', 'Индикатор интенсивности тренировки;', 'Расчёт расхода калорий;', 'Водонепроницаемость до 30 м.'] },
    { name: 'Пульсометр Polar FT4', old: '7 390', price: '7 021', desc: 'Для первых шагов в тренировках, основанных на сердечном ритме',
      more: ['Звуковое оповещение о выходе из зоны пульса;', 'Память на 10 тренировок;', 'Подсветка экрана;', 'Нагрудный датчик в комплекте.'] },
    { name: 'Пульсометр Polar FT1', old: '4 750', price: '4 500', desc: 'Для первых шагов в тренировках, основанных на сердечном ритме',
      more: ['Звуковое оповещение о нужном пульсе;', 'Графические тренировочные зоны;', 'Расход калорий за тренировку;', 'Данные по 10 тренировкам.'] },
    { name: 'Пульсометр Suunto M2', old: '6 690', price: '6 641', desc: 'Для первых шагов в тренировках, основанных на сердечном ритме',
      more: ['Простое управление;', 'Индикатор интенсивности;', 'Расчёт калорий;', 'Водонепроницаемый корпус.'] },
    { name: 'Пульсометр Polar FT4', old: '6 690', price: '6 641', desc: 'Для первых шагов в тренировках, основанных на сердечном ритме',
      more: ['Звуковые оповещения;', 'Память на 10 тренировок;', 'Подсветка экрана;', 'Нагрудный датчик в комплекте.'] }
  ],
  running: [
    { name: 'Пульсометр Polar M200', old: '9 990', price: '8 990', desc: 'Для регулярных беговых тренировок с GPS',
      more: ['Встроенный GPS;', 'Темп и дистанция в реальном времени;', 'Оптический датчик пульса;', 'Уведомления со смартфона.'] },
    { name: 'Пульсометр Garmin Forerunner 35', old: '11 500', price: '10 900', desc: 'Лёгкие часы для бега с GPS и пульсом на запястье',
      more: ['GPS и пульс на запястье;', 'Интервальные тренировки;', 'Подсчёт шагов и сна;', 'До 9 дней автономности.'] },
    { name: 'Пульсометр Suunto Spartan Trainer', old: '24 900', price: '23 500', desc: 'Для подготовки к полумарафонам и марафонам',
      more: ['Цветной сенсорный экран;', 'Готовые планы тренировок;', 'Маршруты и навигация;', 'Анализ восстановления.'] }
  ],
  triathlon: [
    { name: 'Пульсометр Garmin Forerunner 735XT', old: '27 900', price: '25 990', desc: 'Для плавания, велосипеда и бега в одном устройстве',
      more: ['Режим мультиспорт;', 'Метрики плавания и бега;', 'Совместим с велодатчиками;', 'Водонепроницаемость 50 м.'] },
    { name: 'Пульсометр Polar V800', old: '31 500', price: '29 900', desc: 'Профессиональные часы для триатлетов',
      more: ['Мультиспорт-режим;', 'Барометрический высотомер;', 'Анализ нагрузки и восстановления;', 'GPS высокой точности.'] },
    { name: 'Пульсометр Suunto Ambit3 Sport', old: '29 990', price: '27 400', desc: 'Для длительных стартов и тяжёлых дистанций',
      more: ['Мультиспорт;', 'До 30 часов с GPS;', 'Компас и барометр;', 'Подключение к Movescount.'] }
  ]
};

const productsBox = document.getElementById('products');
const tabs = document.querySelectorAll('.tab');

function renderProducts(key) {
  productsBox.innerHTML = products[key].map(p => `
    <div class="card">
      <div class="card__inner">
        <div class="card__face card__front">
          <div class="card__img"><img src="img/photo.png" alt="${p.name}"></div>
          <h4>${p.name}</h4>
          <p class="card__desc">${p.desc}</p>
          <button class="card__more" data-flip>Подробнее</button>
          <div class="card__buy">
            <div class="price"><s>${p.old} руб.</s><b>${p.price} руб.</b></div>
            <button class="btn" data-buy>Купить</button>
          </div>
        </div>
        <div class="card__face card__back">
          <ul class="card__list">${p.more.map(t => `<li>${t}</li>`).join('')}</ul>
          <button class="card__more" data-flip>Назад</button>
          <div class="card__buy">
            <div class="price"><s>${p.old} руб.</s><b>${p.price} руб.</b></div>
            <button class="btn" data-buy>Купить</button>
          </div>
        </div>
      </div>
    </div>`).join('');

  productsBox.classList.remove('fade');
  void productsBox.offsetWidth;           
  productsBox.classList.add('fade');
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('is-active'));
  tab.classList.add('is-active');
  renderProducts(tab.dataset.tab);
}));

productsBox.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card) return;
  if (e.target.closest('[data-flip]')) card.classList.toggle('is-flipped');
  if (e.target.closest('[data-buy]')) {
    const name = card.querySelector('h4').textContent;
    const price = card.querySelector('.price b').textContent;
    openOrder(`${name} (${price})`);
  }
});

renderProducts('fitness');

const form = document.getElementById('consultForm');
const msg = document.getElementById('formMsg');
function showMsg(text, ok) { msg.textContent = text; msg.style.color = ok ? '#7CFC9A' : '#fff'; }

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name, phone = form.phone;
  let valid = true;
  [name, phone].forEach(f => f.classList.remove('error'));
  if (!name.value.trim()) { name.classList.add('error'); valid = false; }
  if (phone.value.replace(/\D/g, '').length < 10) { phone.classList.add('error'); valid = false; }
  if (!valid) return showMsg('Заполните имя и телефон', false);

  showMsg('Спасибо! Мы перезвоним вам в течение 10 минут.', true);
  form.reset();
});

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('is-visible', window.scrollY > 400);
}, { passive: true });

toTop.addEventListener('click', () => {
  document.documentElement.style.scrollBehavior = 'auto'; 
  window.scrollTo(0, 0);                                   
  document.documentElement.style.scrollBehavior = '';
});

const modal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const orderMsg = document.getElementById('orderMsg');
const orderFormWrap = document.getElementById('orderFormWrap');
const orderDone = document.getElementById('orderDone');
let currentOrder = '';

function openOrder(productText) {
  currentOrder = productText;
  document.getElementById('orderProduct').textContent = productText;
  orderFormWrap.hidden = false;
  orderDone.hidden = true;
  orderMsg.textContent = '';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  setTimeout(() => orderForm.name.focus(), 300);
}
function closeOrder() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeOrder(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeOrder(); });

orderForm.addEventListener('submit', e => {
  e.preventDefault();
  const { name, phone } = orderForm;
  let valid = true;
  [name, phone].forEach(f => f.classList.remove('error'));
  if (!name.value.trim()) { name.classList.add('error'); valid = false; }
  if (phone.value.replace(/\D/g, '').length < 10) { phone.classList.add('error'); valid = false; }
  if (!valid) { orderMsg.textContent = 'Заполните имя и телефон'; return; }

  console.log('Заказ:', currentOrder, Object.fromEntries(new FormData(orderForm)));
  orderForm.reset();
  orderFormWrap.hidden = true;
  orderDone.hidden = false;
});
