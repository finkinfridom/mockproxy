<template>
  <main-layout>
    <md-app-content v-if="keys&&keys.length">
      <Key v-for="key in keys" v-bind:data="key" v-bind:key="key.key" />
    </md-app-content>
    <md-app-content v-else>
      <NoKeys />
    </md-app-content>
  </main-layout>
</template>


<script>
import Key from "../js/Key";
import NoKeys from "../js/NoKeys";
import MainLayout from "../layouts/Main";
import axios from "axios";
export default {
  name: "Home",
  components: {
    MainLayout,
    NoKeys,
    Key
  },
  data: () => ({
    menuVisible: false,
    keys: undefined
  }),
  mounted() {
    axios
      .get("https://mockproxy.herokuapp.com/api/v1/keys")
      .then(response => (this.keys = response));
  }
};
</script>