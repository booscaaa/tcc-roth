import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class ReportUseCase {
  async call(postes) {
    try {
      const report = [];
      for (let poste of postes) {
        let nponto = poste.numero;
        let coordenadax = poste.latitude;
        let coordenaday = poste.longitude;
        let tipoposte = poste.tipoDoPosteRede;
        let postepodre = poste.postePodre ? "x" : "-";
        let linhaviva = poste.linhaViva ? "-" : "x";
        let tiposolo = poste.tipoDoSolo;
        let acesso = poste.tipoDoAcesso;
        let altposte = poste.configuracaoDaRede;
        let capposte = poste.esforcoDoPoste;
        let estruturaexistente = poste.extrutura;
        let posteexistente = poste.tipoDoPoste;
        let tipoestai = poste.posteEstai;
        let esforcoposte = poste.esforcoDoPoste;
        //if(tipoestai == 'sim') && (esforcoposte<300){
        // tipoestai == 'esd'
        // }else if(tipoestai == 'sim') && (1015>esforcoposte>300){
        // tipoestai == 'ea1'
        // }else if (tipoestai == 'sim') && (1710>esforcoposte>1015){
        // tipoestai == 'ea2'
        // }else if (tipoestai == 'sim') && (2310>esforcoposte>1710){
        // tipoestai == 'ea3'
        // }else if (tipoestai == 'sim') && (2900>esforcoposte>2310){
        // tipoestai == 'ea2ea2'
        // }else if (tipoestai == 'sim') && (3940>esforcoposte>2900){
        // tipoestai == 'ea3ea3'
        // }

        let tiporede = poste.configuracaoDaRedeMediaTensao;
        let caractponto = poste.caracteristicaPontoMediaTensao;
        let angulomt = poste.anguloMediaTensao;

        let tiporedebt = poste.configuracaoDaRedeBaixaTensao;
        let caractpontobt = poste.caracteristicaPontoBaixaTensao;
        let angulobt = poste.anguloBaixaTensao;

        const estruturamedOptions = {
          monomtfimderede: "U3",
          monomtpassante1: "U1",
          monomtpassante2: "U2",
          monomtpassante3: "U4",
          monomtpassante4: "U3-U3",
          bimtfimderede: "N3B",
          bimtpassante1: "N1B",
          bimtpassante2: "N2B",
          bimtpassante3: "N4B",
          bimtpassante4: "N3B-N3B",
          trimtfimderede: "N3",
          trimtpassante1: "N1ouT1",
          trimtpassante2: "N2ouT2",
          trimtpassante3: "N4ouT4",
          trimtpassante4: "N3ouN3",
        };

        const estruturabtOptions = {
          monobtfimderedebt: "3as11",
          monobtpassantebt1: "2as11",
          monobtpassantebt2: "4as11",
          monobtpassantebt3: "4as11",
          bibtfimderedebt: "4as11",
          bibtpassantebt1: "3as11",
          bibtpassantebt2: "6as11",
          bibtpassantebt3: "6as11",
          tribtfimderedebt: "5as11",
          tribtpassantebt1: "4as11",
          tribtpassantebt2: "8as11",
          tribtpassantebt3: "8as11",
        };

        const estruturamed = estruturamedOptions[
          `${tiporede}${caractponto}${angulomt}`
        ]
          ? estruturamedOptions[`${tiporede}${caractponto}${angulomt}`]
          : "invalido";
        const estruturabt = estruturabtOptions[
          `${tiporedebt}${caractpontobt}${angulobt}`
        ]
          ? estruturabtOptions[`${tiporedebt}${caractpontobt}${angulobt}`]
          : "invalido";

        report.push([
          `${nponto} ${coordenadax} ${coordenaday} ${tipoposte} ${postepodre} ${linhaviva} ${tiposolo} ${acesso} ${altposte}${capposte}-${estruturamed}-${estruturabt}-${tipoestai}//${posteexistente}${estruturaexistente}`,
        ]);
      }

      //   report.unshift(["Descrição"]);

      var docDefinition = {
        pageMargins: [25, 75, 25, 35],
        header: function(currentPage, pageCount, pageSize) {
          return [
            {
              margin: 10,
              columns: [
                {
                  margin: [0, 0, 0, 0],
                  text: `Postes`,
                  fontSize: 15,
                  alignment: "center",
                  bold: true,
                },
              ],
            },
            // {
            //   canvas: [
            //     { type: "line", x1: 0, y1: 10, x2: 5000, y2: 10, lineWidth: 1 },
            //   ],
            // },
          ];
        },
        footer: function(currentPage, pageCount) {
          return {
            margin: 10,
            columns: [
              {
                fontSize: 9,
                text: [
                  {
                    text:
                      "© TCC Roth " +
                      currentPage.toString() +
                      " de " +
                      pageCount +
                      " | " +
                      moment().format("DD/MM/YYYY - HH:mm"),
                  },
                ],
                alignment: "center",
              },
            ],
          };
        },
        pageOrientation: "landscape",
        content: [
          {
            margin: [0, 0, 0, 10],
            layout: {
              fillColor: function(rowIndex, node, columnIndex) {
                if (rowIndex == 0) {
                  return null;
                }
                return rowIndex % 2 == 0 ? null : "#e5e5e5";
              },
            },
            fontSize: 10,
            table: {
              headerRows: 1,
              widths: ["*"],
              body: report,
            },
          },
        ],
      };
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      throw error;
    }
  }
}

export default ReportUseCase;
