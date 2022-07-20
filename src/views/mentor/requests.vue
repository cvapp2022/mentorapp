<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Mentorship Requests</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          sapiente inventore autem, suscipit obcaecati ex laboriosam et
        </p>
      </div>
    </b-row>
    <b-row class="my-4">
      <b-col sm="12" v-for="item in Requests" v-bind:key="item._id">
        <request :request="item" />
      </b-col>
    </b-row>
    <!-- <b-card v-for="item in this.Requests" v-bind:key="item._id" class="my-2">
      <div class="d-flex">
        <h4>request id {{ item._id }}</h4>
        <b-button
          variant="primary"
          v-if="item.ReqState === 'searching'"
          @click="ApplyClicked(item._id)"
          >Apply</b-button>
        <router-link
          v-if="item.ReqState === 'applied' || item.ReqState === 'active'"
          :to="{ name: 'mentorRequestOne', params: { requestId: item._id } }"
          class="btn btn-primary"
          >show
        </router-link>
      </div>
    </b-card> -->
  </b-container>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import request from '../../components/items/request.vue'
export default {
  components:{
    request
  },
  methods:{
    ...mapActions(['getRequests'])
  },
  mounted() {
    //get requests
    this.getRequests();
  },
  computed: {
    ...mapGetters(["Requests", "Mentor"]),
  },
};
</script>

<style>
</style>