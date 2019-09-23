<template>
  <div v-if="loaded">
    <div class="home" v-if="(requests&&requests.length)">
      <Key v-for="request in requests" :data="request" v-bind:key="index" />
    </div>
    <div class="home" v-else>
      <NoKeys />
    </div>
  </div>
  <div v-else>
    <md-progress-bar md-mode="indeterminate"></md-progress-bar>
  </div>
</template>

<script>
import { serverMixin } from "@/mixins/serverMixin";
export default {
  mixins: [serverMixin],
  data: () => ({
    menuVisible: false,
    loaded: false,
    requests: undefined
  }),
  beforeMount() {
    this.getServerRequests();
  },
  methods: {
    async getServerRequests() {
      const response = await this.getRequests(this.$route.params.key);
      this.loaded = true;
      this.requests = response.data;
    }
  }
};
</script>