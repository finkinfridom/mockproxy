<template>
  <div v-if="loaded">
    <md-toolbar class="md-dense">
      <h3 class="md-title">{{ key }}</h3>
    </md-toolbar>
    <div class="home" v-if="requests && requests.length">
      <Request
        v-for="request in requests"
        :data="request"
        v-bind:key="request.codedUrl"
      />
    </div>
    <div class="home" v-else>
      <NoRequests />
    </div>
  </div>
  <div v-else>
    <md-progress-bar md-mode="indeterminate"></md-progress-bar>
  </div>
</template>

<script>
import { serverMixin } from "@/mixins/serverMixin";
import Request from "@/components/requests/Request";
import NoRequests from "@/components/requests/NoRequests";
export default {
  mixins: [serverMixin],
  components: {
    NoRequests,
    Request
  },
  data: () => ({
    menuVisible: false,
    loaded: false,
    key: undefined,
    requests: undefined
  }),
  beforeMount() {
    this.getServerRequests();
  },
  watch: {
    $route() {
      this.getServerRequests();
    }
  },
  methods: {
    async getServerRequests() {
      this.key = this.$route.params.key;
      const response = await this.getRequests(this.key);
      this.loaded = true;
      this.requests = response.data;
    }
  }
};
</script>
