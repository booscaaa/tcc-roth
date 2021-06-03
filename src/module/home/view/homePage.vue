<template>
  <div>
    <v-app-bar app fixed>
      TCC Roth
       <v-btn color="red" class="mx-2 white--text" @click="controller.limpar()">
        <v-icon left>mdi-delete</v-icon>
        Limpar
      </v-btn>
      <v-spacer></v-spacer>
      
      <v-btn color="orange" class="mx-2 white--text" @click="controller.imprimir()">
        <v-icon left>mdi-cloud-print</v-icon>
        Imprimir
      </v-btn>
      <v-btn color="primary" @click="controller.adicionar()">
        <v-icon left>mdi-plus</v-icon>
        Adicionar
      </v-btn>
    </v-app-bar>
    <v-main>
      <google-map
        :center="controller.center"
        :zoom="15"
        style="width: 100%; height: 100vh"
      >
        <google-marker
          v-for="(m, key) in controller.postes"
          :key="key"
          :position="m.position"
          :clickable="true"
          :draggable="true"
        ></google-marker>
      </google-map>
    </v-main>
    <crud :controller="controller" />
  </div>
</template>

<script>
import { homeController } from "../di/di";
import crudVue from "./crud.vue";
export default {
  components: {
    crud: crudVue,
  },
  data: (context) => ({
    controller: homeController(context),
  }),
  mounted() {
    this.controller.mounted();
  },
};
</script>
