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
export default {
  name: "Home",
  components: {
    MainLayout,
    NoKeys,
    Key
  },
  data: () => ({
    menuVisible: false,
    keys: [{ key: "Test1", basePath: "https://www.google.com" }]
  })
};
</script>