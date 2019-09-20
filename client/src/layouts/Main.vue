<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">MockProxy</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>vpn_key</md-icon>
            <span class="md-list-item-text">Keys</span>
          </md-list-item>

          <md-list-item>
            <md-icon>flash_on</md-icon>
            <span class="md-list-item-text">Requests</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <slot></slot>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "MainLayout"
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>