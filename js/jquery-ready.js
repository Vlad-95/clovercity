$(document).ready(function() {
    //===========Мобильное меню
    const body = $('body');
    const windowWidth = window.innerWidth;
    const header = $('.header');
    const mobileMenu = $('.mobile-menu');
    const smMenu = header.find('.sm-menu');
    const city = header.find('.city');
    const icons = header.find('.icons');
    const smLogo = header.find('.sm-logo');
    const phones = header.find('.phones');
    const search = header.find('.search');
    const menu = header.find('.nav');
    const burger = header.find('.burger');
    const mobileMenuClose = mobileMenu.find('.close');
    const layer = body.find('.layer');

    if (windowWidth <= 992) {        
        mobileMenu.find('.mobile-menu__wrap').append(smMenu.clone()); 
        mobileMenu.find('.mobile-menu__wrap').append(menu.clone()); 
        mobileMenu.find('.mobile-menu__wrap').append(city.clone()); 
        mobileMenu.find('.mobile-menu__wrap').append(phones.clone()); 
        mobileMenu.find('.mobile-menu__wrap').append(icons.clone()); 
        mobileMenu.find('.mobile-menu__wrap').append(search.clone());               
    }

    function showMenu() {
        body.addClass('no-scroll');
        layer.fadeIn();
        mobileMenu.show("slide", { direction: "right" }, 500);
    }

    function closeMenu() {
        body.removeClass('no-scroll');
        layer.fadeOut();
        mobileMenu.hide("slide", { direction: "right" }, 500);
    }

    burger.click(showMenu);
    mobileMenuClose.click(closeMenu);
    layer.click(function() {
        closeMenu();
    });

    //============Мобильное меню (КОНЕЦ)

    //Слайдер на главной
    if ($('.intro .slider').length) {
        $('.intro .slider').slick({
            arrows: false,
            dots: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            autoplay: true,
            autoplaySpeed: 5000
        });

        $('.intro .btns .slider__prev').click(function() {
            $('.intro .slider').slick('slickPrev');
        });

        $('.intro .btns .slider__next').click(function() {
            $('.intro .slider').slick('slickNext');
        });

        $('.intro .btns .slider__pause').click(function() {
            $(this).toggleClass('active');

            if (!$(this).hasClass('active')) {
                $('.intro .slider').slick('slickPause');
            } else {
                $('.intro .slider').slick('slickPlay');
            }
            
        });
    }    

    //Слайдер партнеров
    if ($('.partners .slider').length) {
        $('.partners .slider').slick({
            slidesToShow: 6,
            dots: false,
            prevArrow: '<button type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',

            responsive: [{

                breakpoint: 993,
                settings: {
                  slidesToShow: 4,
                }
          
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    arrows: false
                }
            }
            
            ]
        });   
    }

    //слайдер помещений на главной
    if ($('.rent-list.mainpage .slider').length) {
        $('.rent-list.mainpage .slider').slick({
            slidesToShow: 4,
            dots: false,
            prevArrow: '<button type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',

            responsive: [{

                breakpoint: 993,
                settings: {
                  slidesToShow: 3,
                }
          
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    arrows: false
                }
            }
            
            ]
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
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    arrows: false
                }
            }
            
            ]
        });   
    };

    //Новость детально - слайдер
    if ($('.news-detail .slider').length) {
        $('.news-detail .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',

            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 577,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        arrows: false
                    }
                }
                
                ]
        });   
    }

    //Паркинг - слайдер
    if ($('.parking .slider').length) {
        $('.parking .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',

            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 577,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        arrows: false
                    }
                }
                
                ]
        });   
    }
    
    //Помещение-детальная - слайдер
    if ($('.rent-detail-intro').length) {
        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
          $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider',
            dots: false,
            arrows: true,
            focusOnSelect: true,
            vertical: true,
            infinite: false,
            prevArrow: '<button id="prev" type="button" class="slider-nav__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider-nav__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });
    }

    //Торговая галерея - слайдер акций
    if ($('.shop-list .news-list').length) {
        $('.shop-list .news-list .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });
    }

    //Магазин - слайдер
    if ($('.shop-detail .gallery .slider').length) {
        $('.shop-detail .gallery .slider').slick({
            slidesToShow: 1,
            fade: true,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });
    }

    //Магазин: похожие магазины - слайдер
    if ($('.similar .slider').length) {
        $('.similar .slider').slick({
            slidesToShow: 4,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="img/icons/sprite.svg#chevron"></use></svg></button>'
        });
    }
});
