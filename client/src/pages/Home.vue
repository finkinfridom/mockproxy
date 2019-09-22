<template>
  <div>
    <h1>ok</h1>
  </div>
</template>


<script>
// import Key from "../js/Key";
// import NoKeys from "../js/NoKeys";
// import MainLayout from "../layouts/Main";
import axios from "axios";
console.log("load");
export default {
  name: "Home",
  // components: {
  //   // MainLayout,
  //   NoKeys,
  //   Key
  // },
  data: () => ({
    menuVisible: false,
    keys: undefined
  })
  // created() {
  //   console.log("created");
  // },
  // mounted() {
  //   console.log("mounted");
  //   axios
  //     .get("https://mockproxy.herokuapp.com/api/v1/keys")
  //     .then(response => (this.keys = response.data));
  // }
};
</script>