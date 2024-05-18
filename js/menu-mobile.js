const menuOpen= document.getElementById('open-menu');

function openMenu(){
const menu= document.getElementById('menu-mobile');
const body= document.getElementById('body');
menu.classList.toggle('active');
body.classList.toggle('active');
}
menuOpen.addEventListener('click',openMenu);