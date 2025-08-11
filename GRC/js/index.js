// countdown

// Data em que a competição vai começar
const countDownDate = new Date("October 10, 2025 09:00:00 GMT-03:00").getTime();
// Atualizar a cada segundo
const x = setInterval(function() {
// Atualizando data atual
const now = new Date().getTime();

// Encontrando a distância entre as datas
const distance = countDownDate - now;

// Calculos para dias, horas, minutos e segundos
const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// Mostrar resultado
document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

// Mostrar isso caso tenha atigido a data em que vai começar.
if (distance < 0) {
clearInterval(x);
document.getElementById("days").innerHTML = "00";
document.getElementById("hours").innerHTML = "00";
document.getElementById("minutes").innerHTML = "00";
document.getElementById("seconds").innerHTML = "00";
}
}, 1000);


//Carrosel de categorias
var multipleCardCarousel = document.querySelector(
"#CardsCarousel"
);
if (window.matchMedia("(min-width: 768px)").matches) {
var carousel = new bootstrap.Carousel(multipleCardCarousel, {
  interval: false,
});
var carouselWidth = $(".carousel-inner")[0].scrollWidth;
var cardWidth = $(".carousel-item").width();
var scrollPosition = 0;
$("#CardsCarousel .carousel-control-next").on("click", function () {
  if (scrollPosition < carouselWidth - cardWidth * 4) {
    scrollPosition += cardWidth;
    $("#CardsCarousel .carousel-inner").animate(
      { scrollLeft: scrollPosition },
      600
    );
  }
});
$("#CardsCarousel .carousel-control-prev").on("click", function () {
  if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    $("#CardsCarousel .carousel-inner").animate(
      { scrollLeft: scrollPosition },
      600
    );
  }
});
} else {
$(multipleCardCarousel).addClass("slide");
}

//Sticky button

/*window.onscroll = function() {myFunction()};

var inscbutton = document.getElementById("inscbutton");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    //inscbutton.classList.add("sticky");
    //inscbutton.classList.add("position-fixed bottom-0 end-0 m-5");
    alert("Passou!");
  } else {
    //inscbutton.classList.remove("sticky");
    //inscbutton.classList.remove("position-fixed bottom-0 end-0 m-5");
    alert("Voltou!");

  }
}*/

var elementPosition = $('#inscbutton').offset();

$(window).scroll(function(){
        if($(window).scrollTop() > (elementPosition.top)){
              //$('#navigation').css('position','fixed').css('top','0');
              $('#inscbutton').addClass("position-fixed bottom-0 end-0 m-5");
        } else {
            //$('#navigation').css('position','static');
            $('#inscbutton').removeClass("position-fixed bottom-0 end-0 m-5");
        }
});
