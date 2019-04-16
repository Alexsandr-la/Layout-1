"use strict";

function burger() {
  var menu = document.querySelector('.header-menu');
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  menu.addEventListener('click', function (event) {
    if (!burger.offsetWidth) return;

    if (event.target.classList.contains('burger') || event.target.classList.contains('burger__icon')) {
      toogle();
    }

    if (burger.children[0].classList.contains('burger-click') && event.target.closest('.header-social__link') || event.target.classList.contains('nav__item')) {
      if (event.target.classList.contains('nav__item')) event.preventDefault();
      toogle();
    }
  });

  var toogle = function toogle() {
    burger.children[0].classList.toggle('burger-click');
    nav.classList.toggle('hidden');
  };
} /////////////////////////////


function Scroll(option) {
  var elem = option.links;
  var linkTop;

  elem.onclick = function (event) {
    if (!event.target.hasAttribute('href')) return false;

    if (event.target.getAttribute('href').charAt(0) === '#') {
      event.preventDefault();
      var anchor = event.target.getAttribute('href').slice(1);
      positionY(anchor);
    }

    return false;
  };

  var positionY = function positionY(anchor) {
    var link = document.getElementById(anchor);

    if (link) {
      linkTop = link.getBoundingClientRect().top;
      scrollThrough(linkTop);
    }

    return false;
  };

  var scrollThrough = function scrollThrough(linkTop) {
    var startY = pageYOffset;
    var endY = pageYOffset + linkTop - 40 | 0;
    var duration = 700;
    var start = performance.now();
    if (linkTop === 0) return;
    if (startY < endY) scrollDown(startY, start, duration, endY);
    if (startY > endY) scrollUp(startY, start, duration, endY);
  };

  function scrollUp(startY, start, duration, endY) {
    requestAnimationFrame(function animation(time) {
      var now = time - start;
      var progress = now / duration;
      var result = startY - (startY - endY) * delta(progress) | 0;
      window.scrollTo(0, result);
      if (progress < 1 && result > endY) requestAnimationFrame(animation);else {
        window.scrollTo(0, endY);
      }
    });
  }

  function scrollDown(startY, start, duration, endY) {
    requestAnimationFrame(function animation(time) {
      var now = time - start;
      var progress = now / duration;
      var result = (endY - startY) * delta(progress) + startY | 0;
      window.scrollTo(0, result);
      if (progress < 1 && result < endY) requestAnimationFrame(animation);else {
        window.scrollTo(0, endY);
      }
    });
  }

  var delta = function delta(t) {
    return 1 - Math.sin((1 - t) * Math.PI / 2);
  };
} /////////////////////////////


function yandexMap() {
  var map = document.getElementById('map');

  if (map) {
    ymaps.ready(function () {
      var yandexx = map.getAttribute('data-yandexx');
      var yandexy = map.getAttribute('data-yandexy');
      var myMap = new ymaps.Map('map', {
        center: [yandexx, yandexy],
        zoom: 15,
        controls: ['fullscreenControl']
      });
      myMap.behaviors.disable('scrollZoom');
      var myPlacemark = new ymaps.Placemark([yandexx, yandexy], {
        hintContent: 'Мы здесь',
        balloonContent: ''
      }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/icon/address.png',
        iconImageSize: [20, 26],
        iconImageOffset: [-26, -64]
      });
      myMap.geoObjects.add(myPlacemark);
    });
  }
} /////////////////////////////


function widthScroll() {
  var div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
} /////////////////////////////


window.onload = function () {
  var headerContact = document.querySelector('.header-contact');
  var headerContactHeight = headerContact.offsetHeight;
  var head = document.querySelector('.header');

  function header() {
    window.onscroll = function () {
      headerHide();
    };

    window.onresize = function () {
      headerHide();
    };
  }

  function headerHide() {
    if (document.documentElement.clientWidth > 767 - widthScroll()) {
      if (pageYOffset > headerContactHeight) {
        head.classList.add('header-hidden');
      } else {
        head.classList.remove('header-hidden');
      }
    } else {
      head.classList.remove('header-hidden');
    }
  }

  headerHide();
  burger();
  header();
  var scrollPages = new Scroll({
    links: document.querySelector('.nav')
  });
  $('.sponsors-slider').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<div class="sponsors-slider__prev"></div>',
    nextArrow: '<div class="sponsors-slider__next"></div>',
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 410,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  yandexMap();
};