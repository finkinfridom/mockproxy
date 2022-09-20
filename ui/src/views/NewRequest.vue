<template>
  <div>
    <md-progress-bar md-mode="indeterminate" v-if="saving"></md-progress-bar>
    <form>
      <md-toolbar class="md-dense">
        <h3 class="md-title">{{ key }}</h3>
      </md-toolbar>
      <md-field>
        <label>URL ({{ basePath }} will be included)</label>
        <md-input
          required
          v-model="url"
          :readonly="saving"
          :disabled="saving"
        ></md-input>
      </md-field>
      <md-button class="md-raised md-primary" :disabled="saving" @click="save"
        >Save</md-button
      >
    </form>
  </div>
</template>
<script>
import { serverMixin } from "@/mixins/serverMixin";
export default {
  name: "NewRequest",
  mixins: [serverMixin],
  data: () => ({
    key: undefined,
    basePath: undefined,
    url: undefined,
    saving: false
  }),
  beforeMount() {
    this.getServerKeys();
    this.key = this.$route.params.key;
  },
  methods: {
    async save() {
      this.saving = true;
      await this.saveRequest({
        key: this.key,
        url: this.url.replace(this.basePath, "")
      });
      this.saving = false;
    },
    async getServerKeys() {
      const response = await this.getKeys();
      this.loaded = true;
      this.basePath = response.data.find(r => r.key === this.key).basePath;
    }
  }
};
</script>
