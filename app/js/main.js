function burger() {
    const menu = document.querySelector('.header-menu');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    menu.addEventListener('click', function (event) {

        if (!burger.offsetWidth) return;

        if (event.target.classList.contains('burger') ||
            event.target.classList.contains('burger__icon')) {
            toogle();
        }

        if (burger.children[0].classList.contains('burger-click') &&
            event.target.closest('.header-social__link') ||
            event.target.classList.contains('nav__item')) {
            if (event.target.classList.contains('nav__item')) event.preventDefault();
            toogle();
        }

    });

    let toogle = () => {
        burger.children[0].classList.toggle('burger-click');
        nav.classList.toggle('hidden');
    };
}
/////////////////////////////


function Scroll(option) {
    const elem = option.links;
    let linkTop;

    elem.onclick = (event) => {
        if (!event.target.hasAttribute('href')) return false;
        if (event.target.getAttribute('href').charAt(0) ==='#') {
            event.preventDefault();
            const anchor = event.target.getAttribute('href').slice(1);
            positionY(anchor);
        }
        return false;
    };

    let positionY = (anchor) => {
        const link = document.getElementById(anchor);
        if (link) {
            linkTop = link.getBoundingClientRect().top;
            scrollThrough(linkTop)
        }
        return false;
    };

    let scrollThrough = (linkTop) => {
        const startY = pageYOffset;
        const endY = (pageYOffset+linkTop-40)|0;
        const duration = 700;
        const start = performance.now();

        if (linkTop === 0) return;

        if (startY < endY) scrollDown(startY,start,duration,endY);

        if (startY > endY) scrollUp(startY,start,duration,endY);
    };

    function scrollUp(startY,start,duration,endY) {
        requestAnimationFrame(function animation(time) {
            let now = time - start;
            let progress = now / duration;
            let result = (startY - ((startY-endY) * delta(progress)))|0;

            window.scrollTo(0, result);

            if (progress < 1 && result > endY)
                requestAnimationFrame(animation);
            else {
                window.scrollTo(0, endY);
            }
        });
    }

    function scrollDown(startY,start,duration,endY) {
        requestAnimationFrame(function animation(time) {
            let now = time - start;
            let progress = now / duration;
            let result = ((endY-startY) * delta(progress) + startY)|0;

            window.scrollTo(0, result);

            if (progress < 1 && result < endY)
                requestAnimationFrame(animation);
            else {
                window.scrollTo(0, endY);
            }
        });
    }

    let delta =(t) => 1 - Math.sin((1 - t) * Math.PI/2);
}
/////////////////////////////


function yandexMap(){
    const map = document.getElementById('map');
    if ( map ) {
        ymaps.ready(function () {
            const yandexx = map.getAttribute('data-yandexx');
            const yandexy = map.getAttribute('data-yandexy');
            let myMap = new ymaps.Map('map', {
                center: [yandexx, yandexy],
                zoom: 15,
                controls: ['fullscreenControl']
            });
            myMap.behaviors.disable('scrollZoom');

            let myPlacemark = new ymaps.Placemark([yandexx, yandexy], {
                hintContent: 'Мы здесь',
                balloonContent: '',
            }, {
                iconLayout: 'default#image',
                iconImageHref: '../img/icon/address.png',
                iconImageSize: [20, 26],
                iconImageOffset: [-26, -64],
            });

            myMap.geoObjects.add(myPlacemark);
        });
    }
}
/////////////////////////////


function widthScroll() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollWidth;
}
/////////////////////////////

window.onload = function () {
    const headerContact = document.querySelector('.header-contact');
    const headerContactHeight = headerContact.offsetHeight;
    const head = document.querySelector('.header');

    function header() {

        window.onscroll = () => {
            headerHide();
        };

        window.onresize = () => {
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
        }
        else {
            head.classList.remove('header-hidden');
        }
    }

    headerHide();

    burger();

    header();

    let scrollPages = new Scroll({
        links: document.querySelector('.nav')
    });

    $('.sponsors-slider').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<div class="sponsors-slider__prev"></div>',
        nextArrow: '<div class="sponsors-slider__next"></div>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 410,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    yandexMap();
};
