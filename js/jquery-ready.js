$(document).ready(function() {
    //===========Мобильное меню
    // let body = $('body')
    // let windowWidth = window.innerWidth;
    // let header = $('.header');
    // let headerWrap = $('.header__wrap');
    // let time = header.find('.nav__item.time');
    // let mail = header.find('.nav__item.mail');
    // let address = header.find('.nav__item.address');
    // let phone = header.find('.nav__item.phone')
    // let burger = $('.burger');
    // let windowHeight = $(window).height();

    // if (windowWidth <= 992) {
    //     //создаем контейнер для менюшки
    //     let mobileMenu = $(document.createElement('div'));
    //     let nav = $(document.createElement('div'));
    //     mobileMenu.addClass('mobile-menu');
    //     nav.addClass('nav');

    //     headerWrap.append(mobileMenu)
    //     mobileMenu.append(nav)

    //     //клонируем элементы хедера
    //     let mobileTime = time.clone();
    //     let mobileMail = mail.clone();
    //     let mobileAddress = address.clone();
    //     let mobilePhone = phone.clone();
        
    //     nav.append(mobilePhone); 
    //     nav.append(mobileMail);  
    //     nav.append(mobileAddress);  
    //     nav.append(mobileTime);   
              
    // }

    // function showMenu() {
    //     let mobileMenu = $('.mobile-menu');

    //     burger.toggleClass('active');
    //     body.toggleClass('no-scroll');
    //     mobileMenu.toggleClass('active');
    //     console.log(1)
    // }

    // burger.click(showMenu);

    //============Мобильное меню (КОНЕЦ)

    //Слайдер на главной
    if ($('.intro .slider').length) {
        $('.intro .slider').slick({

        })
    }    

    //Слайдер партнеров
    if ($('.partners .slider').length) {
        $('.partners .slider').slick({
            slidesToShow: 6,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });   
    }

    //слайдер помещений на главной
    if ($('.rent-list.mainpage .slider').length) {
        $('.rent-list.mainpage .slider').slick({
            slidesToShow: 4,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });   
    }

    //карта
    if ($('#map').length) {
        ymaps.ready(init);
        function init(){
           // Создание карты.
           var myMap = new ymaps.Map("map", {                
                center: [54.71978356995788,20.50384850000001],         
                zoom: 16,
                controls: []
            });

            var myPlacemark = new ymaps.Placemark([54.71978356995788,20.50384850000001], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/map-marker.png',
                iconImageSize: [55, 57],
                iconImageOffset: [-28, -45]
            });

            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom')
        }
    }

    //О компании - слайдер
    if ($('.about .slider').length) {
        $('.about .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });   
    };

    //Новость детально - слайдер
    if ($('.news-detail .slider').length) {
        $('.news-detail .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });   
    }

    //Паркинг - слайдер
    if ($('.parking .slider').length) {
        $('.parking .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });   
    }
    
});
