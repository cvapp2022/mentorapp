<template>
  <b-card class="my-2 flex-row" no-body>
    <b-col sm="4" class="p-0">
      <img
        class="img-fluid"
        src="@/assets/images/prog.jpg"
        :alt="request.ReqProg.ProgName"
      />
      <div class="text-center m-2">
        <h4>{{ request.ReqProg.ProgName }}</h4>
      </div>
    </b-col>
    <b-col sm="8" class="d-flex justify-content-center py-4">
      <requestState
        style="flex: 1"
        class="h-100"
        :requestId="request._id"
        :state="request.ReqState"
      />
    </b-col>

    <!-- <b-button v-if="request.ReqState === 'applied' || request.ReqState ==='active'" variant="primary" >show mentorship</b-button> -->
  </b-card>
</template>

<script>
import requestState from '../widgets/requestState.vue'
export default {
  props: ["request"],
  components: {
    requestState,
  },
};
</script>

<style>
</style>