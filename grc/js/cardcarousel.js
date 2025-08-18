/*var carouselWidth = $("#ccarou-inner")[0].scrollWidth;
var cardWidth = $(".wcard").width();
var scrollPosition = 0;
var numcards = 11;

$("#next-ccarou").on("click", function () {
  /*scrollPosition = scrollPosition + cardWidth;
  $("#ccarou-inner").animate({ scrollLeft: scrollPosition },600);*/
/*  if (scrollPosition < (carouselWidth - (cardWidth * numcards))) { //check if you can go any further
    scrollPosition = scrollPosition + cardWidth
    $("#ccarou-inner").animate({ scrollLeft: scrollPosition },600); //scroll left
    alert(scrollPosition);
  }
});

$("#prev-ccarou").on("click", function () {
  if (scrollPosition > 0) {
    scrollPosition = scrollPosition - cardWidth;
    $("#ccarou-inner").animate(
      { scrollLeft: scrollPosition },
      600
    );
  }
});*/

/*
var multipleCardCarousel = document.querySelector(
  "#CardsCarousel"
);
if (window.matchMedia("(min-width: 768px)").matches) {
  //rest of the code
  var carousel = new bootstrap.Carousel(multipleCardCarousel, {
    interval: false
  });
} else {
  $(multipleCardCarousel).addClass("slide");
}
var carousel = new bootstrap.Carousel(multipleCardCarousel, {
  interval: false,
  wrap: false,
});*/

/*document.addEventListener('DOMContentLoaded', function () {
    let multipleCardCarousel = document.querySelector("#CardsCarousel");

    if (window.matchMedia("(min-width: 768px)").matches) {
      alert("Olá");
      let carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false, // Disable automatic sliding
        wrap: false, // Prevent wrapping at the end
      });

      let carouselWidth = document.querySelector("#ccarou-inner").scrollWidth;
      let cardWidth = document.querySelector(".wcard").offsetWidth;
      let scrollPosition = 0;

      document.querySelector("#next-ccarou").addEventListener("click", function () {
        if (scrollPosition < (carouselWidth – (cardWidth * 11))) {
          alert(scrollPosition);
          scrollPosition += cardWidth;
          document.querySelector("#ccarou-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
        }
      });

      document.querySelector("#prev-ccarou").addEventListener("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          document.querySelector("#ccarou-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
        }
      });
    } else {
      multipleCardCarousel.classList.add("slide");
    }
  });*/

  /*$(document).ready(function() {
    alert("oi");
     if (window.matchMedia("(min-width: 768px)").matches) {

         alert("funciona");
        let carouselWidth = $("#ccarou-inner")[0].scrollWidth,
           cardWidth = $(".wcard").width(),
           scrollPosition = 0,
           shift = carouselWidth - cardWidth * 4;

        $("#next-ccarou").on("click", function () {
           if (scrollPosition < shift) {
              scrollPosition += cardWidth;
              $("#ccarou-inner").animate(
                 { scrollLeft: scrollPosition }, 600
              );
           } else {
              scrollPosition = 0;
              $("#ccarou-inner").animate(
                 { scrollLeft: scrollPosition }, 600
              );
           }

        });

        $("#prev-ccarou").on("click", function () {
           if (scrollPosition > 0) {
              scrollPosition -= cardWidth;
              $("#ccarou-inner").animate(
                 { scrollLeft: scrollPosition }, 600
              );
           } else if (scrollPosition == 0) {
              scrollPosition += cardWidth * 4; // set count cards
              $("#ccarou-inner").animate(
                 { scrollLeft: scrollPosition }, 600
              );
              scrollPosition -= cardWidth * 4;
           }
        });
     } else {
        $("#CardsCarousel").addClass("slide");
     }
  });*/


$(document).ready(function() {
   initCarousel();

   $(window).on("resize", function() {
      initCarousel();
   });

});

function getSizeSlide() {
   if (window.matchMedia("(max-width: 767px)").matches){
     return 1;
   } else if (window.matchMedia("(min-width: 768px)").matches){
     $("#CardsCarousel").removeClass("slide");
     return 4;
   } else {
     return 4;
   }
   /*if (window.matchMedia("(min-width: 992px)").matches)
      return 4;*/
}

function initCarousel() {

  var carousel = new bootstrap.Carousel("#CardsCarousel", {
    wrap: false,
  });
   let sizeSlide = getSizeSlide();
   let numcards = 12;

   let carouselWidth = $("#ccarou-inner")[0].scrollWidth,
      cardWidth = $(".wcard").width(),
      scrollPosition = 0,
      shift = carouselWidth - cardWidth * sizeSlide + 1;

   $(document).off("click", "#next-ccarou");

   $(document).on("click", "#next-ccarou", function () {
      if (scrollPosition < shift) {
         scrollPosition += cardWidth;
         $("#ccarou-inner").animate(
            { scrollLeft: scrollPosition }, 600
         );
      } else {
         scrollPosition = 0;
         $("#ccarou-inner").animate(
            { scrollLeft: scrollPosition }, 1200
         );
      }
   });

   $(document).off("click", "#prev-ccarou");

   $(document).on("click", "#prev-ccarou", function () {
      if (scrollPosition > 0) {
         scrollPosition -= cardWidth;
         $("#ccarou-inner").animate(
            { scrollLeft: scrollPosition }, 600
         );
      } else if (scrollPosition == 0) {
         scrollPosition += cardWidth * numcards; // set count all cards
         $("#ccarou-inner").animate(
            { scrollLeft: scrollPosition }, 1200
         );
         scrollPosition -= cardWidth * sizeSlide;
      }
   });
}
