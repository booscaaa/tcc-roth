<template>
  <div>
    <v-app-bar app fixed>
      TCC Roth
      <v-spacer></v-spacer>
      <v-btn @click="controller.imprimir()">
        Imprimir
      </v-btn>
      <v-btn @click="controller.adicionar()">
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
