<template>
  <v-dialog scrollable v-model="controller.dialog" persistent width="600">
    <v-card>
      <v-card-title class="headline">
        Cadastro
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-divider></v-divider>
          <div>
            <h3 class="headline font-weight-bold">PADRÃO FECOERGS</h3>
          </div>
          <v-text-field
            v-model="controller.poste.numero"
            dense
            :rules="[(v) => !!v || 'Preencha o número do ponto']"
            label="Número do ponto"
          ></v-text-field>
          <v-text-field
            v-model="controller.poste.latitude"
            dense
            :rules="[(v) => !!v || 'Preencha a latitude']"
            label="Latitude"
          ></v-text-field>
          <v-text-field
            v-model="controller.poste.longitude"
            dense
            :rules="[(v) => !!v || 'Preencha a longitude']"
            label="Logitude"
          ></v-text-field>
          <v-text-field
            v-model="controller.poste.extrutura"
            dense
            :rules="[(v) => !!v || 'Preencha a estrutura do poste']"
            label="Estrutura do poste"
          ></v-text-field>
          <v-select
            dense
            v-model="controller.poste.tipoDoPoste"
            :items="controller.tipoDoPoste"
            item-text="nome"
            item-value="value"
            :rules="[(v) => !!v || 'Preencha o tipo do poste']"
            label="Tipo do poste"
          ></v-select>
          <v-checkbox
            v-model="controller.poste.postePodre"
            dense
            label="Poste podre"
          ></v-checkbox>
          <v-divider></v-divider>
          <div>
            <h3 class="headline font-weight-bold">REDE PROJETADA</h3>
          </div>
          <v-row>
            <v-col>
              <v-checkbox
                v-model="controller.poste.posteEstai"
                dense
                label="Poste Estai"
              ></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="controller.poste.linhaViva"
                dense
                label="Possui acesso linha viva"
              ></v-checkbox
            ></v-col>
          </v-row>
          <v-select
            v-model="controller.poste.tipoDoPosteRede"
            :items="controller.tipoDoPoste"
            dense
            item-text="nome"
            item-value="value"
            :rules="[(v) => !!v || 'Preencha o tipo do poste']"
            label="Tipo do poste"
          ></v-select>
          <v-select
            v-model="controller.poste.tipoDoSolo"
            :items="controller.tipoDoSolo"
            item-text="nome"
            item-value="value"
            dense
            :rules="[(v) => !!v || 'Preencha o tipo do solo']"
            label="Tipo do solo"
          ></v-select>
          <v-select
            v-model="controller.poste.tipoDoAcesso"
            :items="controller.tipoDoAcesso"
            item-text="nome"
            item-value="value"
            dense
            :rules="[(v) => !!v || 'Preencha o tipo do acesso']"
            label="Tipo do acesso"
          ></v-select>
          <v-select
            v-model="controller.poste.configuracaoDaRede"
            :items="controller.configuracaoDaRede"
            item-text="nome"
            item-value="value"
            :rules="[(v) => !!v || 'Preencha a configuração da rede']"
            dense
            label="Configuração da rede"
          ></v-select>
          <v-select
            v-model="controller.poste.esforcoDoPoste"
            :items="controller.esforcoDoPoste"
            item-text="nome"
            item-value="value"
            dense
            :rules="[(v) => !!v || 'Preencha o esforço do poste']"
            label="Esforço no Poste (daN)"
          ></v-select>
          <v-select
            v-model="controller.poste.configuracaoDaRedeMediaTensao"
            :items="controller.configuracaoDaRedeMediaTensao"
            item-text="nome"
            item-value="value"
            dense
            :rules="[
              (v) => !!v || 'Preencha a configuração da rede em média tensão',
            ]"
            label="Configuração da Rede em Media Tensão"
          ></v-select>
          <v-select
            v-model="controller.poste.caracteristicaPontoMediaTensao"
            :items="controller.caracteristicaPontoMediaTensao"
            item-text="nome"
            item-value="value"
            dense
            :rules="[
              (v) => !!v || 'Preencha a caracteristica do ponto media tensão',
            ]"
            label="Caracteristica do Ponto Media Tensão"
          ></v-select>
          <v-select
            v-model="controller.poste.anguloMediaTensao"
            :items="controller.anguloMediaTensao"
            item-text="nome"
            item-value="value"
            dense
            :rules="[(v) => !!v || 'Preencha o ângulo no ponto média tensão']"
            label="Ângulo no Ponto Média Tensão"
          ></v-select>
          <v-select
            v-model="controller.poste.configuracaoDaRedeBaixaTensao"
            :items="controller.configuracaoDaRedeBaixaTensao"
            item-text="nome"
            item-value="value"
            dense
            :rules="[
              (v) => !!v || 'Preencha a configuração da rede em baixa tensão',
            ]"
            label="Configuração da Rede em Baixa Tensão"
          ></v-select>
          <v-select
            v-model="controller.poste.caracteristicaPontoBaixaTensao"
            :items="controller.caracteristicaPontoBaixaTensao"
            item-text="nome"
            item-value="value"
            dense
            :rules="[
              (v) => !!v || 'Preencha a caracteristica do ponto baixa tensão',
            ]"
            label="Caracteristica do Ponto Baixa Tensão"
          ></v-select>
          <v-select
            v-model="controller.poste.anguloBaixaTensao"
            :items="controller.anguloBaixaTensao"
            item-text="nome"
            item-value="value"
            dense
            :rules="[(v) => !!v || 'Preencha o ângulo no ponto baixa tensão']"
            label="Ângulo no Ponto Baixa Tensão"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="controller.cancelar()" color="red" text
          ><v-icon left>mdi-close</v-icon>cancelar</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn @click="controller.salvar()" color="primary"
          ><v-icon left>mdi-content-save</v-icon>salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.controller.setContext(this);
  },
};
</script>
