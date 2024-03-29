$(document).ready(function() {
    //===========Мобильное меню
    // const windowWidth = window.innerWidth;
    // const header = $('.header');
    // const mobileMenu = $('.mobile-menu');
    // const smMenu = header.find('.sm-menu');
    // const city = header.find('.city');
    // const icons = header.find('.icons');
    // const smLogo = header.find('.sm-logo');
    // const phones = header.find('.phones');
    // const search = header.find('.search');
    // const menu = header.find('.nav');
    const body = $('body');
    const header = $('.header');
    const mobileMenu = $('.mobile-menu');
    const burger = header.find('.burger');
    const mobileMenuClose = mobileMenu.find('.close');
    const layer = body.find('.layer');

    // if (windowWidth <= 992) {        
    //     mobileMenu.find('.mobile-menu__wrap').append(smMenu.clone()); 
    //     mobileMenu.find('.mobile-menu__wrap').append(menu.clone()); 
    //     mobileMenu.find('.mobile-menu__wrap').append(city.clone()); 
    //     mobileMenu.find('.mobile-menu__wrap').append(phones.clone()); 
    //     mobileMenu.find('.mobile-menu__wrap').append(icons.clone()); 
    //     mobileMenu.find('.mobile-menu__wrap').append(search.clone());               
    // }

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

    //открытие/закрытие модалок модалок
    $('.js-open-modal').click(function () {
        const modal = $(this).attr('data-modal');

        body.addClass('no-scroll');
        $(`.popup#${modal}`).fadeIn();
    })

    $('.popup .close').click(function () {
        body.removeClass('no-scroll');
        $('.popup').fadeOut();
    })


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
            prevArrow: '<button type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',

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
            prevArrow: '<button type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',

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

    //одинаковая высота карточек помещений
    if ($('.rent-list__item').length) {
        $('.rent-list__item .content').matchHeight()
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

            var placemarkLayout = ymaps.templateLayoutFactory.createClass('<div class="custom-placemark"><div class="custom-placemark__wrap">Кловер Сити-Центр</div></div>');

            var myPlacemark = new ymaps.Placemark([54.71978356995788,20.50384850000001], {
                balloonContentBody: "Площадь Победы, 10",
            }, {
                iconLayout: placemarkLayout,
                iconShape: {
                    type: 'Rectangle',
                    coordinates: [
                        [-83, -37], [83, 0]
                    ]
                }
            });

            var busCollection = new ymaps.GeoObjectCollection(null, {
                iconLayout: 'default#image',
                iconImageHref: '/img/icons/busstop-marker.png',
                iconImageSize: [55, 57],
                iconImageOffset: [-28, -45]
            });

            var busItems = [];

            let busHtmlItem = document.querySelectorAll('.busstops__item');
            busHtmlItem.forEach(item => {
                let itemCoordX = item.getAttribute('data-x');
                let itemCoordY = item.getAttribute('data-y');
                let itemBaloon = item.getAttribute('data-baloon');

                let itemCoordArr = [itemCoordX, itemCoordY];

                busItems.push({
                    baloon: itemBaloon,
                    coords: itemCoordArr
                });
            });

            for (var i = 0, l = busItems.length; i < l; i++) {
                busCollection.add(new ymaps.Placemark(busItems[i].coords, {
                    balloonContentBody: busItems[i].baloon,
                }));
            }

            let showBusBtn = document.querySelector('.js-bus');
            let flag = true;

            if (showBusBtn) {
                showBusBtn.addEventListener('click', () => {
                    if (flag) {
                        myMap.geoObjects.add(busCollection);
    
                        flag = false;
                    } else {
                        myMap.geoObjects.remove(busCollection);
    
                        flag = true;
                    }
                    
                })
            }
            

            
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom')
        }
    }

    //О компании - слайдер
    if ($('.about .slider').length) {
        $('.about .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
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
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',

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
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',

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
            prevArrow: '<button id="prev" type="button" class="slider-nav__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider-nav__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            responsive: [{

                breakpoint: 1201,
                settings: {
                  slidesToShow: 4,
                }
          
            },{

                breakpoint: 769,
                settings: {
                  slidesToShow: 4,
                  vertical: false,
                }
          
            },{

                breakpoint: 577,
                settings: {
                  slidesToShow: 3,
                  vertical: false,
                }
          
            }
            
            ]
        });
    }

    //Торговая галерея - слайдер акций
    if ($('.shop-list .news-list').length) {
        $('.shop-list .news-list .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',

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

    //Магазин - слайдер
    if ($('.shop-detail .gallery .slider').length) {
        $('.shop-detail .gallery .slider').slick({
            slidesToShow: 1,
            fade: true,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>'
        });
    }

    //Магазин: новости - слайдер
    if ($('.shop-detail .news-list .slider').length) {
        $('.shop-detail .news-list .slider').slick({
            slidesToShow: 3,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            responsive: [{

                breakpoint: 769,
                settings: {
                  slidesToShow: 2,
                  
                }
          
            },{

                breakpoint: 577,
                settings: {
                  slidesToShow: 1,
                  arrows: false,
                  centerMode: true
                }
          
            }
            
            ]
        });
    }

    //Магазин: похожие магазины - слайдер
    if ($('.similar .slider').length) {
        $('.similar .slider').slick({
            slidesToShow: 4,
            dots: false,
            prevArrow: '<button id="prev" type="button" class="slider__prev"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            nextArrow: '<button id="next" type="button" class="slider__next"><svg><use xlink:href="/img/icons/sprite.svg#chevron"></use></svg></button>',
            responsive: [{

                breakpoint: 769,
                settings: {
                  slidesToShow: 3,
                  
                }
          
            },{

                breakpoint: 577,
                settings: {
                  slidesToShow: 1,
                  arrows: false,
                  centerMode: true
                }
          
            }
            
            ]
        });
    }

    //Карта этажей
    if ($('.levels').length) {
        //Проставляем статусы для помещений
        
        //перебираем объект с помещениями (ЗАДАЕТСЯ В ВЕРСТКЕ)
        for (let key in rooms) {
            //проставляем атрибуты для каждого помещения из объекта
            $(`#${key}`)
                .addClass(`${rooms[key].status}`)//статус
                .attr('data-href', `${rooms[key].link}`)//ссылка
                .attr('data-type', `${rooms[key].name}`)//название
                .attr('data-logo', `${rooms[key].logo}`)//лого
                .attr('data-square', `${rooms[key].square}`)//площадь
        }


        //функция показа схемы соответствующего этажа
        showSchemeLevel = () => {
            let activeDot = $('.dots__item.active');

            $(`.level[data-level="${activeDot.attr("data-level")}"]`).addClass('active').siblings().removeClass('active');
        }

        //функция показа номеров этажей относящихся к данному табу
        showNumberLevels = (tab = 'shop') => {
            let dotsItems = $('.dots__item');

            //перебираем и показываем нужные
            dotsItems.each(function() {
                if ($(this).attr('data-item') == tab || $(this).attr('data-item') == 'both') {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            //при переходе со страниц магазинов
            if (!localStorage.getItem('flat')) {
                //добавляем класс активности к наименьшему этажу
                dotsItems.removeClass('active').not('[style="display: none;"]').last().addClass('active');
            } else {
                //добавляем класс активности соответствующему этажу
                let levelNumb = localStorage.getItem('flat');
                $(`.dots .dots__item[data-level=${levelNumb}]`).addClass('active').siblings().removeClass('active');
            }
        }

        // вызываем функцию при загрузке
        if ($('.tabs__item.active').length) {
            let dataItem = $('.tabs__item.active').attr('data-item');
            showNumberLevels(dataItem);
        }
        

        //клик по этажам
        $('.dots .dots__item').click(function() {            
            let levelNumb = $(this).attr('data-level');//Номер этажа           

            $(this).addClass('active').siblings().removeClass('active');

            $(`.level[data-level="${levelNumb}"]`).addClass('active').siblings().removeClass('active');

            $('.levels .info').hide();
        });

        //клик по табам
        $('.tabs .tabs__item').click(function() {         
            let item = $(this).attr('data-item');

            $(this).addClass('active').siblings().removeClass('active'); //меняем активность табов

            showNumberLevels(item);//функция показа номеров этажей относящихся к данному табу

            //показываем группу схем
            $(`.content__item[data-item="${item}"]`).addClass('active').siblings().removeClass('active');

            //показ схемы
            showSchemeLevel()

            $('.levels .info').hide();            
        });

        //при переходе со страниц магазинов
        if (localStorage.getItem('flat')) {          
            let item = $('.dots .dots__item.active').attr('data-item');

            showNumberLevels(localStorage.getItem('flatType'));
            showSchemeLevel();

            $(`.tabs .tabs__item[data-item="${localStorage.getItem('flatType')}"]`).addClass('active').siblings().removeClass('active');
            $(`.content__item[data-item="${localStorage.getItem('flatType')}"]`).addClass('active').siblings().removeClass('active');
           
        }
    }

    //клик на кнопку Показать на схеме
    // $('.js-flat').click(function() {
    //     let flatNumb = $(this).attr('data-flat');
    //     let flatType = $(this).attr('data-item');

    //     localStorage.setItem('flat', flatNumb);
    //     localStorage.setItem('flatType', flatType);
    // })

    // setTimeout(() => {
    //     localStorage.removeItem('flat');
    // }, 1000)

    //клик по помещениям
    //показ инфо во всплывашке
    function showInfo(target) {
        let type = target.attr('data-type');
        const defaultLogo = '/local/templates/clover/img/plans-logo.png';
        let logo = target.attr('data-logo');
        let square = target.attr('data-square');
        let href = target.attr('data-href');
        const popupInfo = $('.levels .info');

        if (logo) {
            popupInfo.find('img').attr('src', logo)
        } else {
            popupInfo.find('img').attr('src', defaultLogo)
        }

        if (type) {
            popupInfo.find('h3').html(type);
        } else {
            popupInfo.find('h3').html('Офис');
        }

        if (square) {
            popupInfo.find('p').html(`${square} м<sup>2</sup>`);
        } else {
            popupInfo.find('p').html(``);
        }
        
        if (href) {
            popupInfo.find('.link').show();
            popupInfo.find('.link').attr('href', href);
        } else {
            popupInfo.find('.link').hide();
        }          
    }

    $('.rented, .free, .hotel').click(function() {
        //прикрепленная ссылка к помещения
        let href = $(this).attr('data-href');
        
        if ($(window).width() > 992) {
            if (href) {
                document.location.href = href;
            }
            
        } else {
            showInfo($(this));
            $('.levels .info').fadeIn();

            $('html,body').stop().animate({ scrollTop: $('.levels .info').offset().top - $(window).height() + $('.levels .info').outerHeight()}, 300);
        }        
    });

    if ($(window).width() > 992) {
        //Наведение на помещения
        $('.rented, .free, .hotel').hover(function(evt) {
            showInfo($(this));
            
        },function() {
            $('.levels .info').hide();
        })

        $('.rented, .free, .hotel').mousemove(function(evt) {
            let clientX = evt.clientX;
            let clientY = evt.clientY;
            const popupInfo = $('.levels .info');
            let popupInfoHeight = popupInfo.outerHeight();
            const triangleHeight = 16;
            const triangleLeft = 28;

            popupInfo.css({
                'left' : clientX - triangleLeft,
                'top' : clientY - popupInfoHeight - triangleHeight,
            })
            
            popupInfo.fadeIn();
        })

        //прячем всплывашку при скролле
        $(window).scroll(function () {
            const popupInfo = $('.levels .info');

            popupInfo.fadeOut();
        })
    };

    //Инпут файл
    $('.form__file input').change(function() {
        if ($('.form__file input')[0].files[0].name) {
            $('.form__file .text').attr('data-filename', $('.form__file input')[0].files[0].name)
        }  
    });

    //Фильтр Магазинов
    if ($('.filter').length) {
        const filterItem = $('.filter__item');
        const shopItem = $('.shop-list__item');

        filterItem.click(function() {
            let filteredCat = $(this).attr('data-filter');

            $(this).addClass('active').siblings().removeClass('active')
            
            shopItem.each(function () {
                let cats = $(this).attr('data-filter');

                if (cats.indexOf(filteredCat) != -1) {
                    $(this).fadeIn();
                } else {
                    $(this).hide();
                }
            })           

        });
    }

    //Запрет на ввод символов в форме
    $('[name=phone]').bind('change keyup input click', function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    $('[name=email]').bind('change keyup input click', function() {
        let emailPattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;

        if($('[name=email]').val().search(emailPattern) != 0){
            $(this).addClass('error')
        } else {
            $(this).removeClass('error');
        }
	});

    //Баннер при первом заходе на сайт.
    // if (!localStorage.getItem('showBanner') && $(`.popup#banner`).length) {
    //     body.addClass('no-scroll');
    //     $(`.popup#banner`).fadeIn();

    //     localStorage.setItem('showBanner', true);
    // }

    //боковой баннер
    $('.popup-side-toggle').click(function() {
        body.addClass('no-scroll');
        $('.popup-side').addClass('active');
    })
    $('.popup-side .close').click(function() {
        body.removeClass('no-scroll');
        $(this).closest('.popup-side').removeClass('active');
    })

    
});
