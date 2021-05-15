class HomeController {
  center = {};
  postes = [];

  crud = null;

  poste = {
    numero: null,
    latitude: null,
    longitude: null,
    extrutura: null,
    postePodre: false,
    posteEstai: false,
    linhaViva: false,
    tipoDoPoste: null,
    tipoDoPosteRede: null,
    tipoDoSolo: null,
    tipoDoAcesso: null,
    configuracaoDaRede: null,
    esforcoDoPoste: null,
    configuracaoDaRedeMediaTensao: null,
    configuracaoDaRedeBaixaTensao: null,
    caracteristicaPontoMediaTensao: null,
    caracteristicaPontoBaixaTensao: null,
    anguloMediaTensao: null,
    anguloBaixaTensao: null,
  };

  tipoDoPoste = [
    {
      value: "(PM)",
      nome: "Poste de madeira",
    },
    {
      value: "(DT)",
      nome: "Poste Duplo 'T'",
    },
    {
      value: "(TC)",
      nome: "Poste Tronco Cônico",
    },
  ];

  tipoDoSolo = [
    {
      value: "A",
      nome: "Fácil Escavação",
    },
    {
      value: "B",
      nome: "Pequenos Pedregulhos",
    },
    {
      value: "C",
      nome: "Solo Rochoso",
    },
  ];

  tipoDoAcesso = [
    {
      value: "1",
      nome: "Lavoura",
    },
    {
      value: "2",
      nome: "Campo",
    },
    {
      value: "3",
      nome: "Estrada",
    },
    {
      value: "4",
      nome: "Pátio",
    },
    {
      value: "5",
      nome: "Rua",
    },
    {
      value: "6",
      nome: "Calçada",
    },
    {
      value: "7",
      nome: "Mato",
    },
    {
      value: "8",
      nome: "Sem Acesso",
    },
  ];

  configuracaoDaRede = [
    {
      value: 1,
      altura: "11",
      nome: "Rede Mista",
    },
    {
      value: 2,
      altura: "9",
      nome: "Baixa Tensão",
    },
    {
      value: 3,
      altura: "11",
      nome: "Média Tensão",
    },
    {
      value: 4,
      altura: "12",
      nome: "Equipamento ou Derivação",
    },
  ];

  esforcoDoPoste = [
    {
      value: "(3)",
      nome: "Entre 0-300 daN",
    },
    {
      value: "(4)",
      nome: "Entre 301-400 daN",
    },
    {
      value: "(6)",
      nome: "Entre 401-600 daN",
    },
    {
      value: "(10)",
      nome: "Entre 601-1000 daN",
    },
    {
      value: "(15)",
      nome: "Entre 1001-1500 daN",
    },
    {
      value: "(20)",
      nome: "Entre 1501-2000 daN",
    },
    {
      value: "(30)",
      nome: "Entre 2001-3000 daN",
    },
  ];

  configuracaoDaRedeMediaTensao = [
    {
      value: "monomt",
      nome: "Monofásica",
    },
    {
      value: "bimt",
      nome: "Bifásica",
    },
    {
      value: "trimt",
      nome: "Trifásica",
    },
  ];

  configuracaoDaRedeBaixaTensao = [
    {
      value: "monobt",
      nome: "Monofásica",
    },
    {
      value: "bibt",
      nome: "Bifásica",
    },
    {
      value: "tribt",
      nome: "Trifásica",
    },
  ];

  caracteristicaPontoMediaTensao = [
    {
      value: "fimderede",
      nome: "Fim de Rede",
    },
    {
      value: "passante",
      nome: "Passante/Ancoragem",
    },
  ];

  caracteristicaPontoBaixaTensao = [
    {
      value: "fimderedebt",
      nome: "Fim de Rede",
    },
    {
      value: "passantebt",
      nome: "Passante",
    },
  ];

  anguloMediaTensao = [
    {
      value: "1",
      nome: "Entre 0-16 Graus",
    },
    {
      value: "2",
      nome: "Entre 17-35 Graus",
    },
    {
      value: "3",
      nome: "Entre 36-60 Graus",
    },
    {
      value: "4",
      nome: "Entre 61-90 Graus",
    },
  ];

  anguloBaixaTensao = [
    {
      value: "1",
      nome: "Entre 0-35 Graus",
    },
    {
      value: "2",
      nome: "Entre 36-60 Graus",
    },
    {
      value: "3",
      nome: "Entre 61-90 Graus",
    },
  ];

  dialog = false;

  constructor(context, report) {
    this.report = report;
    this.context = context;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  adicionar() {
    this.dialog = true;
  }

  cancelar() {
    this.dialog = false;
  }

  salvar() {
    if (this.crud.$refs.form.validate()) {
      const localPostes = localStorage.getItem("postes");

      if (localPostes) {
        const postes = JSON.parse(localPostes);
        postes.push(this.poste);
        localStorage.setItem("postes", JSON.stringify(postes));
      } else {
        localStorage.setItem("postes", JSON.stringify([this.poste]));
      }

      this.dialog = false;
      this.mounted();
    }
  }

  mounted() {
    const localPostes = localStorage.getItem("postes");

    if (localPostes) {
      this.postes = JSON.parse(localPostes).map((poste) => {
        return {
          ...poste,
          position: {
            lat: parseFloat(poste.latitude),
            lng: parseFloat(poste.longitude),
          },
        };
      });
    }
  }

  imprimir() {
    this.report.call(this.postes);
  }

  setContext(context) {
    this.crud = context;
  }
}

export default HomeController;

// Estrutura do poste
// Tipo do poste
// - pedir se o poste existe para habilitar o campo

// configuração da rede
//  - se mista habilita todos os campos

// angulo media
// angulo baixa
// - habilita se o tipo for diferente de fim de rede
