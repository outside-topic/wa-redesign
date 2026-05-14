document.addEventListener('DOMContentLoaded', ()=> {
    // HERO SLIDER
var menu = [];
var slides = document.querySelectorAll('.swiper-slide');

slides.forEach(function(slide) {
    var slideInner = slide.querySelector('.slide-inner');
    if (slideInner) {
        menu.push(slideInner.getAttribute("data-text"));
    }
});

var interleaveOffset = 0.5;
var swiperOptions = {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
        delay: 6500,
        disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    on: {
        progress: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                
                var innerElement = swiper.slides[i].querySelector(".slide-inner");
                if (innerElement) {
                    innerElement.style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            }      
        },

        touchStart: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
        },

        setTransition: function(speed) {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                
                var innerElement = swiper.slides[i].querySelector(".slide-inner");
                if (innerElement) {
                    innerElement.style.transition = speed + "ms";
                }
            }
        }
    }
};

var swiper = new Swiper(".swiper-container", swiperOptions);

// DATA BACKGROUND IMAGE
var sliderBgSettings = document.querySelectorAll(".slide-bg-image");

sliderBgSettings.forEach(function(el) {
    var background = el.getAttribute("data-background");
    if (background) {
        el.style.backgroundImage = "url(" + background + ")";
    }
});
})

//
function openVideo(url) {
  document.getElementById("videoFrame").src = url + "?autoplay=1";
}

// stop video when modal closes
document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
  document.getElementById("videoFrame").src = "";
});

// global affiliation swiper
if(document.querySelector('.gaa-swiper')){
    new Swiper('.gaa-swiper', {
        spaceBetween: '5px',
        centeredSlides: true,
        speed: 2000, // smoother marquee feel
        autoplay: {
            delay: 0,
            disableOnInteraction: false, // allows autoplay to continue after hover
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
    })
}


// Testimonial swiper
if(document.querySelector('.testimonial-swiper')){
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        spaceBetween: "50px",
        centeredSlides: true,
        speed: 2000, // smoother marquee feel
        autoplay: {
            delay: 2000,
            disableOnInteraction: false, // allows autoplay to continue after hover
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        },
        loop: true,
        slidesPerView: 3,
        allowTouchMove: true,
    })
}

if(document.querySelector('.global-alumni-swiper')){
    const globalAlumniSwiper = new Swiper('.global-alumni-swiper', {
        spaceBetween: '5px',
        centeredSlides: true,
        speed: 2000, // smoother marquee feel
        autoplay: {
            delay: 0,
            disableOnInteraction: false, // allows autoplay to continue after hover
            reverseDirection: true
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
    }) 
    globalAlumniSwiper.changeLanguageDirection('ltr')
}