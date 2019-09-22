<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{data.key}}</div>
      </md-card-header>

      <md-card-content>{{data.basePath}}</md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary">Requests</md-button>
        <md-button class="md-raised">Edit</md-button>
        <md-button class="md-raised md-accent">Delete</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

<script>
export default {
  name: "Key",
  props: ["data"]
};
</script>