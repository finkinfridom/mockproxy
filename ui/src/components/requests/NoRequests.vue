<template>
  <div>
    <md-empty-state
      class="md-accent"
      md-icon="explore_off"
      md-label="Create your first request"
      md-description="No requests found. Create your first one!"
    >
      <md-button class="md-primary md-raised" :to="newUrl">Create first request</md-button>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  name: "NoRequests",
  computed: {
    newUrl: function() {
      return `/keys/${this.$route.params.key}/requests/new`;
    }
  }
};
</script>