import pdfMake from 'pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'
pdfMake.vfs = pdfFonts.pdfMake.vfs

class ReportUseCase {
  async call(postes) {
    try {
      const report = []
      for (let p of postes) {
        const poste = {...p}
        let nponto = poste.numero
        let coordenadax = poste.latitudeUTM
        let coordenaday = poste.longitudeUTM
        let tipoposte = poste.tipoDoPosteRede ?? poste.tipoDoPoste.value

        let barra = ""

        if (poste.posteExistente) {
          if (poste.temServicoPoste) {
            tipoposte += 'I'
            barra = "//"
          } else {
            tipoposte += 'E'
          }
        } else {
          tipoposte += 'I'
        }

        let postepodre = poste.postePodre ? 'x' : '-'
        let linhaviva = poste.linhaViva ? 'x' : '-'
        let tiposolo = poste.tipoDoSolo
        let acesso = poste.tipoDoAcesso
        let altposte = poste.configuracaoDaRede.altura
        let capposte = poste?.esforcoDoPoste?.value ?? ''
        let estruturaexistente = poste.extrutura
        let posteexistente = poste?.tipoDoPoste?.tipo ?? ''
        let tipoestai = poste.posteEstai
        let esforcoposte = poste.esforcoDoPoste

        let tipoEstaiPoste = 'esd'


        let estruturamed = ''
        let estruturabt = ''

        if (poste.temServicoPoste) {
          if (tipoestai && esforcoposte.ate < 1015 && esforcoposte.de > 300) {
            tipoEstaiPoste = 'ea1'
          } else if (
            tipoestai &&
            esforcoposte.ate < 1710 &&
            esforcoposte.de > 1015
          ) {
            tipoEstaiPoste = 'ea2'
          } else if (
            tipoestai &&
            esforcoposte.ate < 1710 &&
            esforcoposte.de > 1015
          ) {
            tipoEstaiPoste = 'ea3'
          } else if (
            tipoestai &&
            esforcoposte.ate < 2900 &&
            esforcoposte.de > 2310
          ) {
            tipoEstaiPoste = 'ea2ea2'
          } else if (
            tipoestai &&
            esforcoposte.ate < 3940 &&
            esforcoposte.de > 2900
          ) {
            tipoEstaiPoste = 'ea3ea3'
          }

          if (!tipoestai && esforcoposte.de < 300) {
            tipoEstaiPoste = ''
          } else if (!tipoestai) {
            tipoEstaiPoste = 'BC'
          }

          let tiporede = poste.configuracaoDaRedeMediaTensao
          let caractponto = poste.caracteristicaPontoMediaTensao
          let angulomt = poste.anguloMediaTensao

          let tiporedebt = poste.configuracaoDaRedeBaixaTensao
          let caractpontobt = poste.caracteristicaPontoBaixaTensao
          let angulobt = poste.anguloBaixaTensao

          const estruturamedOptions = {
            monomtfimderede: 'U3',
            monomtpassante1: 'U1',
            monomtpassante2: 'U2',
            monomtpassante3: 'U4',
            monomtpassante4: 'U3-U3',
            bimtfimderede: 'N3B',
            bimtpassante1: 'N1B',
            bimtpassante2: 'N2B',
            bimtpassante3: 'N4B',
            bimtpassante4: 'N3B-N3B',
            trimtfimderede: 'N3',
            trimtpassante1: 'N1ouT1',
            trimtpassante2: 'N2ouT2',
            trimtpassante3: 'N4ouT4',
            trimtpassante4: 'N3ouN3',
          }

          const estruturabtOptions = {
            monobtfimderedebt: '3as11',
            monobtpassantebt1: '2as11',
            monobtpassantebt2: '4as11',
            monobtpassantebt3: '4as11',
            bibtfimderedebt: '4as11',
            bibtpassantebt1: '3as11',
            bibtpassantebt2: '6as11',
            bibtpassantebt3: '6as11',
            tribtfimderedebt: '5as11',
            tribtpassantebt1: '4as11',
            tribtpassantebt2: '8as11',
            tribtpassantebt3: '8as11',
          }

          estruturamed = estruturamedOptions[
            `${tiporede ?? ''}${caractponto ?? ''}${angulomt ?? ''}`
          ]
            ? `-${estruturamedOptions[
            `${tiporede ?? ''}${caractponto ?? ''}${angulomt ?? ''}`
            ]}`
            : ''
          estruturabt = estruturabtOptions[
            `${tiporedebt ?? ''}${caractpontobt ?? ''}${angulobt ?? ''}`
          ]
            ? `-${estruturabtOptions[
            `${tiporedebt ?? ''}${caractpontobt ?? ''}${angulobt ?? ''}`
            ]}`
            : ''
        }

        let resultado = `${nponto} ${coordenadax} ${coordenaday} ${tipoposte} ${postepodre} ${linhaviva} ${tiposolo} ${acesso} `

        if (poste.temServicoPoste) {
          resultado += `${altposte}${capposte}${estruturamed}${estruturabt}-${tipoEstaiPoste}`
        }
        report.push([
          `${resultado}${poste.posteExistente
            ? `${barra}${posteexistente}${estruturaexistente}`
            : ''
          }`
        ])
      }

      this._download(report.join('\n'), 'postes.txt', 'text/plain')
    } catch (error) {
      throw error
    }
  }

  _download(content, fileName, contentType) {
    var a = document.createElement('a')
    var file = new Blob([content], { type: contentType })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }
}

export default ReportUseCase
