<template>
  <div>
    <md-empty-state
      class="md-accent"
      md-icon="vpn_key"
      md-label="Create your first key"
      md-description="No keys found. Create your first one!"
    >
      <md-button class="md-primary md-raised">Create first key</md-button>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  name: "NoKeys"
};
</script>