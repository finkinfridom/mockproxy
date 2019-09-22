<template>
  <md-app id="app" md-mode="reveal">
    <router-view></router-view>
  </md-app>
  <!-- <div class="page-container">
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
            <span class="md-list-item-text">
              <router-link to="/">Keys</router-link>
            </span>
          </md-list-item>

          <md-list-item>
            <md-icon>flash_on</md-icon>
            <span class="md-list-item-text">Requests</span>
          </md-list-item>
          <md-divider></md-divider>
          <md-list-item>
            <md-icon>description</md-icon>
            <span class="md-list-item-text">
              <router-link to="/docs">Docs</router-link>
            </span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <router-view></router-view>
    </md-app>
  </div>-->
</template>

<script>
console.log("outer");
export default {
  data: () => ({
    menuVisible: false
  })
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