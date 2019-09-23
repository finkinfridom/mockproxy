<template>
  <md-card>
    <md-card-header>
      <div class="md-title">
        URL:
        <a :href="data.originalUrl" target="_blank">{{data.originalUrl}}</a>
      </div>
    </md-card-header>
    <md-card-actions>
      <md-button class="md-primary md-raised" @click="showDialog = true">Show info</md-button>
    </md-card-actions>
    <md-dialog :md-active.sync="showDialog">
      <div>
        <span>StatusCode: {{data.statusCode}}</span>
        <pre>{{data.body}}</pre>
        <md-dialog-actions>
          <md-button class="md-primary">Edit</md-button>
          <md-button class="md-accent">Delete</md-button>
          <md-button @click="showDialog = false">Close</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
  </md-card>
</template>


<script>
export default {
  name: "Request",
  props: ["data"],
  data: () => ({
    showDialog: false
  })
};
</script>