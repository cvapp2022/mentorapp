<template>
  <b-card class="flex-row p-4 align-items-center" no-body>
    <div class="w-75"></div>
    <div class="w-25">
      {{ state }}
      <b-button
        variant="primary"
        v-if="state === 'searching'"
        @click="ApplyClicked(requestId)"
        >Apply</b-button
      >
      <router-link
        v-if="state === 'applied' || state === 'active'"
        :to="{ name: 'mentorRequestOne', params: { requestId: requestId } }"
        class="btn btn-primary"
        >show
      </router-link>
    </div>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ["state", "requestId"],
  methods: {
    ...mapActions(["applyRequest"]),
    ApplyClicked(reqId) {
      this.applyRequest(reqId);
    },
  },
};
</script>

<style>
</style>