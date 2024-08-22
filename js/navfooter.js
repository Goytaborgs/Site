$(function() {
  // Carrega o conteúdo do nav e do footer
  $("#nav-placeholder").load("nav.html", function() {
      // Após carregar o nav, verifica se há itens de menu salvos no localStorage
      const savedMenuItems = localStorage.getItem('savedMenuItems');
      const menuNav = document.querySelector('.menu_home');

      if (savedMenuItems && menuNav) {
          menuNav.innerHTML = savedMenuItems;
      }
  });
  
  $("#footer-placeholder").load("footer.html");
});
