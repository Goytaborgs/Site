$(function(){
   var dados;
   var areaicon;
   var areaiconcolor = "";
   var positions;
   var i;
   var poswrite = "";
   var redes;
   var redeswrite = "";
   var t;
   var lines;
   var line;
   for (t = 0; t <= gbl_text.length; t++) {
     lines = gbl_text[t].split('\n');
     for (line = 1; line < lines.length - 1; line++) {
       dados = lines[line].split('|');
       dados[1] = dados[1].replace(/\s/g, '');

       /* Diferenciar cada área */
       if (dados[1] == "Gestao") {
         areaicon = `<i class="bi bi-person-lines-fill"></i>`;
         //areaiconcolor = "text-primary";
       } else if (dados[1] == "Software") {
         areaicon = `<i class="bi bi-code-slash"></i>`;
         //areaiconcolor = "text-danger";
       } else if (dados[1] == "Mecanica") {
         areaicon = `<i class="bi bi-gear"></i>`;
         //areaiconcolor = "text-warning";
       } else if (dados[1] == "Eletronica") {
         areaicon = `<i class="bi bi-cpu"></i>`;
         //areaiconcolor = "text-success";
       } else if (dados[1] == "Comunicacao") {
         areaicon = `<i class="bi bi-chat-right-dots"></i>`;
         //areaiconcolor = "text-info";
       }

      /* Capitanias */
      poswrite = "";
      positions = dados[2].split('/');
      if (positions.length > 1) {
         for (i = 0; i < positions.length; i++) {
           poswrite = poswrite + "<p class='mb-1'>" + positions[i] + "</p>\n";
         }
       } else {
         poswrite = "<p class='mb-1'>" + dados[2] + "</p>\n";
       }

       /* links de redes */
       if(dados[7] != ""){
         redes = dados[7].split('/');
         redeswrite = "";
            for (i = 0; i < redes.length; i++) {
              redes[i] = redes[i].replace(/\s/g, '');
              switch (redes[i][0]) {
                case 'I':
                    redeswrite = redeswrite + "<a href='https://www.instagram.com/"+redes[i].slice(2)+"' target='_blank' rel='noopener noreferrer' class='btn btn-sm has-icon ml-2' type='button'><i class='bi bi-instagram'></i></a>\n";
                  break;
                case 'T':
                    redeswrite = redeswrite + "<a href='https://twitter.com/"+redes[i].slice(2)+"' target='_blank' rel='noopener noreferrer' class='btn btn-sm has-icon ml-2' type='button'><i class='bi bi-twitter'></i></a>\n";
                  break;
                case 'G':
                    redeswrite = redeswrite + "<a href='https://github.com/"+redes[i].slice(2)+"' target='_blank' rel='noopener noreferrer' class='btn btn-sm has-icon ml-2' type='button'><i class='bi bi-github'></i></a>\n";
                  break;
                case 'L':
                    redeswrite = redeswrite + "<a href='https://www.linkedin.com/in/"+redes[i].slice(2)+"' target='_blank' rel='noopener noreferrer' class='btn btn-sm has-icon ml-2' type='button'><i class='bi bi-linkedin'></i></a>\n";
                  break;
                case 'E':
                    redeswrite = redeswrite + "<a href='mailto:"+redes[i].slice(2)+"' target='_blank' rel='noopener noreferrer' class='btn btn-sm has-icon ml-2' type='button'><i class='bi bi-envelope'></i></a>\n";
                  break;
                default:
                  break;
              }
            }
       } else {
         redeswrite = "<button class='btn btn-sm has-icon ml-2' type='button'><i class='bi bi-reception-0'></i></button>";
       }
       document.getElementById("ActiveMembers")
                 .innerHTML +=
                 `<div class="col mb-3">
                   <div class="card mb-3 border-dark h-100">
                     <div class="row d-flex justify-content-evenly px-3 pt-1" style="font-size: 30px;">
                       <div class="col text-start ${areaiconcolor}">
                          ${areaicon}
                       </div>
                       <div class="col text-end">
                           <i class="bi bi-award"></i>
                       </div>
                     </div>
                     <div class="card-body text-center">
                      <div class="object-fit-cover" style=" margin-bottom: 20px; margin-top:-50px;">
                        <img src="${dados[6]}" class="img-fluid" alt="..." style="clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); height: 250px; width:250px;"/>
                       </div>
                       <div class="row d-flex justify-content-evenly px-1" style="margin-top: -35px; line-height: 2px;">
                         <div class="col text-start">
                           <p>${dados[4]}</p>
                           <p>Entrou</p>
                         </div>
                         <div class="col text-end">
                           <p>${dados[5]}</p>
                           <p>Saiu</p>
                         </div>
                       </div>
                        <h5 class="card-title">${dados[0]}</h5>
                        ${poswrite}
                        <p class="font-size-sm lh-1">${dados[3]}</p>
                     </div>
                     <div class="card-footer text-center">
                       ${redeswrite}
                     </div>
                   </div>
                 </div>`;
     }
    }
  });
