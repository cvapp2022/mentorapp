<template>
  <b-container fluid>
    <h4>Meeting mentor prepare page</h4>

    <router-link
      v-if="hasSession"
      :to="{
        name: 'mentorMeetRoom',
        params: { meetId: this.$route.params.meetId },
      }"
      >enter room</router-link
    >
    <b-button
      v-if="!hasSession"
      variant="primary"
      @click="createSessionClicked()"
      >create new session</b-button
    >
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../router/index";
import _ from "lodash";
export default {
  data(){
    return {
      hasSession:false
    }
  },
  watch:{
    Session(old,newVal){
      if(newVal){
        this.hasSession=true;
      }
    }
  },
  methods: {
    ...mapActions(["saveSession", "getSession"]),
    createSessionClicked() {
      var MeetIdI = this.$route.params.meetId;
      this.saveSession({ MeetIdI });
    },
  },
  computed: {
    ...mapGetters(["ReqOne", "Session"]),
  },
  mounted() {
    if (_.isEmpty(this.ReqOne)) {
      router.push({ name: "mentorRequests" });
    } else {
      this.getSession(this.$route.params.meetId);
    }

  if(!_.isEmpty(this.Session)){
    this.hasSession=true;
  }

  },
};
</script>

<style>
</style>