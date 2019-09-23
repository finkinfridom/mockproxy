<template>
  <div v-if="loaded">
    <div class="home" v-if="(keys&&keys.length)">
      <Key v-for="key in keys" :data="key" v-bind:key="key.key" />
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
import Key from "@/components/keys/Key";
import NoKeys from "@/components/keys/NoKeys";
import { serverMixin } from "@/mixins/serverMixin";
export default {
  name: "home",
  mixins: [serverMixin],
  components: {
    Key,
    NoKeys
  },
  data: () => ({
    menuVisible: false,
    loaded: false,
    keys: undefined
  }),
  beforeMount() {
    this.getServerKeys();
  },
  methods: {
    async getServerKeys() {
      const response = await this.getKeys();
      this.loaded = true;
      this.keys = response.data;
    }
  }
};
</script>
