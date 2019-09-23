<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Do you want to proceed?"
      md-content="Deleting the key will delete all requests so far. Do you want to proceed?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <md-card>
      <md-card-header>
        <div class="md-title">{{data.key}}</div>
      </md-card-header>

      <md-card-content>{{data.basePath}}</md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary" :to="detailUrl">Requests</md-button>
        <md-button class="md-raised" :to="editUrl">Edit</md-button>
        <md-button class="md-raised md-accent" @click="active = true">Delete</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
.md-card {
  min-width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

<script>
export default {
  name: "Key",
  props: ["data"],
  data: () => ({
    active: false
  }),
  computed: {
    detailUrl: function() {
      return `/keys/${this.data.key}`;
    },
    editUrl: function() {
      return `/keys/${this.data.key}/edit`;
    },
    deleteUrl: function() {
      return `/keys/${this.data.key}/delete`;
    }
  }
};
</script>