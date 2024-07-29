// menu-toggle
let headerUl = document.querySelector('header nav');

function toggleButtons() {
   let header = document.querySelector("header");
   headerUl.classList.toggle("show-ul");
   let cancel_btn = document.querySelector(".cancel-btn");

   if (!headerUl.classList.contains("show-ul")) {
      enableScroll();
      // cancel_btn.style.display="none";
   } else {
      disableScroll();
      cancel_btn.style.display = "block";
   }
}

// disable scroll
function disableScroll() {
   document.body.style.overflow = 'hidden';
}

function enableScroll() {
   document.body.style.overflow = 'auto';
}


// search-toggle
let searchIcon = document.querySelector('.search-icon');
let searchForm = document.querySelector('.search-form');
let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 384 512" fill="#fff"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
let isSvg1 = true;

searchIcon.addEventListener('click', function () {
   searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
   isSvg1 = !isSvg1;

   searchForm.classList.toggle('search-bar-show');
});

// dropdown

const dropdowns = document.querySelectorAll(".dropdown");

function toggleDropdown(e) {
   const svgicon = e.target;
   const parentOfTarget = svgicon.parentNode; // li

   dropdowns.forEach((dropdown) => {
      if (dropdown !== parentOfTarget && !dropdown.contains(parentOfTarget)) {
         dropdown.classList.remove("show-dropdown");
      }
   });

   if (parentOfTarget) {
      parentOfTarget.classList.toggle("show-dropdown");
   }
}

dropdowns.forEach((dropdown) => {
   dropdown.querySelector('svg').addEventListener("click", toggleDropdown);
});

// faq
const detailsElements = document.querySelectorAll("details");
const summaryElements = document.querySelectorAll("summary");
summaryElements.forEach((summary, index) => {
   summary.addEventListener("click", () => {
      detailsElements.forEach((details, i) => {
         if (i !== index) {
            details.open = false;
         }
      });
      summaryElements.forEach((s, i) => {
         if (i !== index) {
            s.classList.remove("actives");
         }
      });
      summary.classList.toggle("actives");
   });
});

// // back to top 

function calcScrollValue() {
   let scrollProgress = document.getElementById("progress");
   if (scrollProgress) {
      let progressValue = document.getElementById("progress-value");
      let pos = document.documentElement.scrollTop;
      let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);

      if (pos > 100) {
         scrollProgress.style.display = "grid";
      } else {
         scrollProgress.style.display = "none";
      }

      scrollProgress.style.background = `conic-gradient(#ec764b ${scrollValue}%, #ffbda5 ${scrollValue}%)`;
      progressValue.textContent = `${scrollValue}%`;
   }
}

function scrollToTop() {
   document.documentElement.scrollTop = 0;
}

document.getElementById("progress").addEventListener("click", scrollToTop);

window.addEventListener('scroll', calcScrollValue);
window.addEventListener('load', calcScrollValue);

// function calcScrollValue() {
//    let scrollProgress = document.getElementById("progress");
//    if (scrollProgress) { // Check if scrollProgress exists before continuing
//       let progressValue = document.getElementById("progress-value");
//       let pos = document.documentElement.scrollTop;
//       let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//       let scrollValue = Math.round((pos * 100) / calcHeight);
//       if (pos > 100) {
//          scrollProgress.style.display = "grid";
//       } else {
//          scrollProgress.style.display = "none";
//       }
//       scrollProgress.addEventListener("click", () => {
//          document.documentElement.scrollTop = 0;
//       });
//       scrollProgress.style.background = `conic-gradient(#ec764b ${scrollValue}%, #ffbda552 ${scrollValue}%)`;
//    }
// }
// window.addEventListener('scroll', calcScrollValue);
// window.addEventListener('load', calcScrollValue);

// slider codes
function accountSlider(slider) {
   slider.forEach(config => {
      let {
         className,
         slidesPerView,
         spaceBetween,
         speed
      } = config;
      const defaultSlidesPerView = slidesPerView.default || 2; // Default slidesPerView if not provided
      const defaultSpaceBetween = spaceBetween || 20; // Default spaceBetween if not provided

      const sliderParent = document.querySelector('.' + className);
      if (!sliderParent) return; // Check if sliderParent is found, exit if not found

      const sliderWrap = sliderParent.querySelector('.slider-wrap');
      if (!sliderWrap) return; // Check if sliderWrap is found, exit if not found

      const slideCards = sliderWrap.querySelectorAll('.slide-card');
      if (!slideCards || slideCards.length === 0) return; // Check if slideCards is found and not empty, exit if not found

      let currentIndex = 0;
      let slideWidth;
      let autoplayInterval; // Variable to store autoplay interval
      let loopResetTriggered = false; // Flag to track whether loop reset has been triggered

      function updateSlider() {
         // Determine the appropriate slidesPerView based on window width
         let currentSlidesPerView;
         if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            currentSlidesPerView = slidesPerView.tablet;
         } else if (window.innerWidth <= 600) {
            currentSlidesPerView = slidesPerView.mobile;
         } else {
            currentSlidesPerView = defaultSlidesPerView;
         }

         // Calculate the width of the container
         const containerWidth = sliderWrap.offsetWidth;

         // Calculate the width of each slide based on the formula
         slideWidth = (containerWidth / currentSlidesPerView) - ((currentSlidesPerView - 1) * defaultSpaceBetween / currentSlidesPerView);

         // Set the width and marginRight for each slide
         for (let i = 0; i < slideCards.length; i++) {
            slideCards[i].style.width = slideWidth + 'px';
            slideCards[i].style.marginRight = defaultSpaceBetween + 'px';
         }

         // Update button states after calculating slide size
         updateButtonState();
      }

      function goToNextSlide() {
         currentIndex = (currentIndex + 1) % slideCards.length;
         if (currentIndex === 0 && !loopResetTriggered) {
            loopResetTriggered = true; // Set the flag to true to indicate loop reset has been triggered
            updateSliderPosition();
         } else {
            if (currentIndex === 0) {
               loopResetTriggered = false; // Reset the flag if the loop resets and currentIndex becomes 0 again
            }
            updateSliderPosition();
         }
      }

      function goToPrevSlide() {
         currentIndex = (currentIndex - 1 + slideCards.length) % slideCards.length;
         updateSliderPosition();
      }

      function updateSliderPosition() {
         const translateValue = -currentIndex * (slideWidth + defaultSpaceBetween);
         sliderWrap.style.transition = `transform ${speed}ms ease-in-out`; // Set transition for smooth sliding
         sliderWrap.style.transform = `translateX(${translateValue}px)`;
         updateButtonState();
      }

      function updateButtonState() {
         sliderParent.querySelector('#previous-arrow').disabled = currentIndex === 0;
         sliderParent.querySelector('#next-arrow').disabled = currentIndex === slideCards.length - defaultSlidesPerView;
      }

      // Function to start autoplay
      function startAutoplay() {
         autoplayInterval = setInterval(goToNextSlide, speed + 1500); // Add slide speed to autoplay interval
      }

      // Function to stop autoplay
      function stopAutoplay() {
         clearInterval(autoplayInterval);
      }

      // Initial calculation of slide size
      updateSlider();

      // Start autoplay when the slider is initialized
      startAutoplay();

      // Recalculate slide size when the window is resized
      window.addEventListener('resize', updateSlider);

      // Attach click events to navigation buttons
      sliderParent.querySelector('#next-arrow').addEventListener('click', () => {
         goToNextSlide();
      });

      sliderParent.querySelector('#previous-arrow').addEventListener('click', () => {
         goToPrevSlide();
      });

      // Reset slider to first slide after transition ends for infinite loop
      sliderWrap.addEventListener('transitionend', () => {
         if (currentIndex + defaultSlidesPerView >= slideCards.length) {
            currentIndex = 0;
            loopResetTriggered = true; // Set the flag to true to indicate loop reset has been triggered
            updateSliderPosition();
         } else if (currentIndex === 0) {
            loopResetTriggered = false; // Reset the flag if the loop resets and currentIndex becomes 0 again
            updateSliderPosition();
         }
      });
   });
}

// Usage
accountSlider([{
   className: 'testimonial-slider',
   slidesPerView: {
      default: 2,
      tablet: 2,
      mobile: 1
   },
   spaceBetween: 30,
   speed: 1000
}]);

// heading active observer
window.addEventListener('scroll', function () {
   var headings = document.querySelectorAll('h2, h3');
   var links = document.querySelectorAll('.toc-body li');

   for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var link = links[i];

      var rect = heading.getBoundingClientRect();
      var isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isInViewport) {
         link.classList.add('active-li');
      } else {
         link.classList.remove('active-li');
      }
   }
});

// table of content
document.addEventListener('DOMContentLoaded', function () {
   // Check if the body has the data-run-toc attribute set to true
   var body = document.body;
   if (body.getAttribute('data-run-toc') === 'true') {

      function addStylesOnClick() {
         // Select the table of contents header and body
         var tocHeader = document.querySelector('.toc-header');
         var tocBody = document.querySelector('.toc-body');
         var toc = document.querySelector('.toc');

         tocHeader.addEventListener('click', function () {
            if (toc.classList.contains('toc-mobile')) {
               if (!toc.classList.contains('styles-added')) {
                  // Add styles
                  tocBody.style.height = '250px';
                  tocBody.style.padding = '20px';
                  toc.classList.add('styles-added');
               } else {
                  toc.style.transform = '';
                  tocBody.style.height = '';
                  tocBody.style.width = '';
                  tocBody.style.padding = '0';
                  toc.classList.remove('styles-added');
               }
            }
         });
      }

      var headerClicked = false;
      var tocHeader = document.querySelector('.toc-header');
      var tocBody = document.querySelector('.toc-body');
      var svgElement = document.querySelector('.cut');

      tocHeader.addEventListener('click', function () {
         if (!headerClicked) {
            tocHeader.style.width = '350px';
            tocBody.style.transform = 'translateX(0)';
            tocBody.style.transition = 'all 0.4s';
            svgElement.style.display = 'block';
            headerClicked = true;
         } else {
            tocBody.style.transform = 'translateX(100%)';
            tocHeader.style.width = 'unset';
            svgElement.style.display = 'none';
            headerClicked = false;
         }
      });

      function addClassOnResize() {
         var toc = document.querySelector('.toc');
         if (window.innerWidth <= 1024) {
            toc.classList.add('toc-mobile');
         } else {
            toc.classList.remove('toc-mobile');
         }
      }

      // Call the function to add styles on click
      addStylesOnClick();

      // Call the function on document ready
      addClassOnResize();

      // Call the function on window resize
      window.addEventListener('resize', function () {
         addClassOnResize();
      });
   }
});