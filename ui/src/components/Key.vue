<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{data.key}}</div>
      </md-card-header>

      <md-card-content>{{data.basePath}}</md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary" :to="detailUrl">Requests</md-button>
        <md-button class="md-raised" :to="editUrl">Edit</md-button>
        <md-button class="md-raised md-accent" :to="deleteUrl">Delete</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<style lang="scss" scoped>
.md-card {
  min-width: 320px;
  width: 98%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

<script>
export default {
  name: "Key",
  props: ["data"],
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