$(function () {
  var categoria;
  var tipo;
  var nome;
  var foto;
  var trofeus;
  var descricao;

  var dados;
  var lines;
  var line;
  var t;
  var i;
  var listaTrofeus;
  var trofeuCod;
  var trofeusWrite = "";
  var classeCategoria;
  var classeTipo;
  var htmlSaida = "";

  var categoriasValidas = ["combate", "corrida", "sumo", "arte", "trekking"];
  var tiposValidos = ["aut", "rc"];

  var clipEsquerda = "polygon(0 0, 100% 0, 100% 65%, 70% 100%, 0 100%)";
  var clipDireita = "polygon(0 0, 100% 0, 100% 100%, 30% 100%, 0 65%)";

  function extrairRegistrosComChaves(textoBruto) {
    var marcadorQuebra = "@@NL@@";

    var textoProtegido = textoBruto.replace(/\{([\s\S]*?)\}/g, function (_, miolo) {
      var limpo = miolo.replace(/\n/g, marcadorQuebra);
      return "{" + limpo + "}";
    });

    var linhas = textoProtegido.split("\n");
    var registros = [];

    for (var idx = 0; idx < linhas.length; idx++) {
      var linhaAtual = linhas[idx].trim();
      if (!linhaAtual) continue;

      linhaAtual = linhaAtual.replace(new RegExp(marcadorQuebra, "g"), " ");
      registros.push(linhaAtual);
    }

    return registros;
  }

  for (t = 0; t < gbl_text.length; t++) {
    lines = extrairRegistrosComChaves(gbl_text[t]);

    for (line = 0; line < lines.length; line++) {
      dados = lines[line].split("|");

      categoria = dados[0] ? dados[0].trim().toLowerCase() : "";
      tipo = dados[1] ? dados[1].trim().toLowerCase() : "";
      nome = dados[2] ? dados[2].trim() : "";
      foto = dados[3] ? dados[3].trim() : "";
      trofeus = dados[4] ? dados[4].trim() : "";
      descricao = dados[5]
        ? dados[5]
            .trim()
            .replace(/^\{\s*/, "")
            .replace(/\s*\}$/, "")
            .replace(/\s+/g, " ")
            .trim()
        : "";

      classeCategoria = categoriasValidas.indexOf(categoria) !== -1 ? categoria : "";
      classeTipo = tiposValidos.indexOf(tipo) !== -1 ? tipo : "";

      trofeusWrite = "";
      if (trofeus !== "") {
        listaTrofeus = trofeus.split("/");
        for (i = 0; i < listaTrofeus.length; i++) {
          trofeuCod = listaTrofeus[i].trim();

          if (trofeuCod === "1") {
            trofeusWrite += `<i style="color: #f7d917" class="bi-trophy-fill"></i>\n`;
          } else if (trofeuCod === "2") {
            trofeusWrite += `<i style="color: #7a8386" class="bi-trophy-fill"></i>\n`;
          } else if (trofeuCod === "3") {
            trofeusWrite += `<i style="color: #894218" class="bi-trophy-fill"></i>\n`;
          }
        }
      }

      htmlSaida += `
        <div class="row justify-content-start mb-3 project-box ${classeCategoria} ${classeTipo}">
          <div class="card col-lg-8" style="border: 2px solid #135a32">
            <div class="card-body">
              <div class="row row-cols-1 row-cols-lg-2 justify-content-evenly">
                <div class="project-img-col" style="width: 25rem; height: 23rem">
                  <img
                    class="img-fluid h-100 project-img"
                    src="${foto}"
                    style="clip-path: ${clipEsquerda};"
                    alt="${nome}"
                  />
                </div>
                <div class="d-flex align-items-center project-text-col">
                  <div>
                    <h5 class="card-title text-center name-projects">${nome}</h5>
                    <p style="text-align: justify">
                      ${descricao}
                    </p>
                    <div class="d-flex justify-content-center">
                      <div class="justify-content-evenly">
                        ${trofeusWrite}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }
  }

  document.getElementById("ActiveMembers").innerHTML += htmlSaida;

  window.atualizarAlternanciaCards = function () {
    $(".project-box:visible").each(function (index) {
      var $box = $(this);
      var $imgCol = $box.find(".project-img-col");
      var $textCol = $box.find(".project-text-col");
      var $img = $box.find(".project-img");

      if (index % 2 === 0) {
        $box.removeClass("justify-content-end").addClass("justify-content-start");
        $imgCol.removeClass("order-xl-1");
        $textCol.removeClass("order-xl-0");
        $img.css("clip-path", clipEsquerda);
      } else {
        $box.removeClass("justify-content-start").addClass("justify-content-end");
        $imgCol.addClass("order-xl-1");
        $textCol.addClass("order-xl-0");
        $img.css("clip-path", clipDireita);
      }
    });
  };

  window.atualizarAlternanciaCards();
});