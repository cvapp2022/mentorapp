<template>
  <b-container>
    <h4>mebtorship rquests</h4>
    <b-card v-for="item in this.Requests" v-bind:key="item._id" class="my-2" >  
      <div class="d-flex">  
        <h4> request id  {{ item._id }}</h4>
        <b-button variant="primary" v-if="item.ReqState === 'searching'"  @click="ApplyClicked(item._id)" >Apply</b-button>
        <router-link  v-if="item.ReqState === 'applied' ||item.ReqState === 'active'"  :to="{ name:'mentorRequestOne',params:{requestId:item._id} }"  class='btn btn-primary'  >show </router-link>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["applyRequest"]),
    ApplyClicked(reqId){

      this.applyRequest(reqId)

    }
  },

  mounted() {
    //get requests
    //this.getRequests();
  },
  computed: {
    ...mapGetters(["Requests","Mentor"]),
  },
};
</script>

<style>
</style>