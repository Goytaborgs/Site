const menuOpen= document.getElementById('open-menu');

function openMenu(){
const menu= document.getElementById('menu-mobile');

const savedMenuItems = localStorage.getItem('savedMenuItems');
if(savedMenuItems!=null) {
    menu.innerHTML = savedMenuItems;
}
const body= document.getElementById('body');
menu.classList.toggle('active');
body.classList.toggle('active');
}
menuOpen.addEventListener('click',openMenu);
