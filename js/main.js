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
if(document.querySelector('.hidden.bs.modal')){

    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
      document.getElementById("videoFrame").src = "";
    });
}

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


if(document.querySelector('.ward-success-animate')){

    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.ward-success-card-number');
            numbers.forEach(num => {
              num.classList.add('ward-success-animate');
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
    
      const section = document.querySelector('.ward-success-section');
      if (section) observer.observe(section);
    });

}


// faq page js
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('wardFaqSearch');
  const noResults = document.getElementById('wardFaqNoResults');
  const accordionItems = document.querySelectorAll('.ward-faq-accordion .accordion-item');
  const tabContent = document.getElementById('ward-faq-tabContent');
  const tabButtons = document.querySelectorAll('#ward-faq-tab .nav-link');
  
  if(searchInput){

      function filterFAQs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasResults = false;
        
        if (searchTerm === '') {
          accordionItems.forEach(item => {
            item.style.display = 'block';
          });
          noResults.classList.remove('active');
          return;
        }
        
        accordionItems.forEach(item => {
          const question = item.getAttribute('data-question').toLowerCase();
          const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
            
            // Open matching accordion
            const collapse = item.querySelector('.accordion-collapse');
            if (collapse && !collapse.classList.contains('show')) {
              new bootstrap.Collapse(collapse, { show: true });
            }
          } else {
            item.style.display = 'none';
          }
        });
        
        if (hasResults) {
          noResults.classList.remove('active');
          // Show all tabs when searching
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.add('show', 'active');
          });
        } else {
          noResults.classList.add('active');
        }
      }
      
      searchInput.addEventListener('input', filterFAQs);
      
      // Reset search when clicking tabs
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          searchInput.value = '';
          accordionItems.forEach(item => {
            item.style.display = 'block';
          });
          noResults.classList.remove('active');
          document.querySelectorAll('.tab-pane').forEach(pane => {
            if (!pane.classList.contains('active')) {
              pane.classList.remove('show', 'active');
            }
          });
        });
      });
      
      // Smooth scroll for CTA
      document.querySelector('.ward-faq-cta-btn').addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') {
          e.preventDefault();
          // Replace with actual contact logic or page scroll
          window.scrollTo({ top: 0, behavior: 'smooth' });
          alert('Contact form placeholder - Connect this to your contact section');
        }
      });
      
  }

});