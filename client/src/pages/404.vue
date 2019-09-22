<template>
  <main-layout>
    <md-app-content>404</md-app-content>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main";
export default {
  name: "ErrorPage",
  components: { MainLayout },
  data: () => ({
    menuVisible: false
  })
};
</script>