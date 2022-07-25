<template>
  <div id="app">
    <mentorNavbar v-if="Mentor && !hideOn.includes(this.$route.name) " />
    <router-view />
    <div
      class="
        connPopup
        d-flex
        align-items-center
        justify-align-center
        m-4
        p-3
        rounded
        text-light
        bg-dark
      "
      v-if="Mentor && isDisconnected"
    >
      <p class="text-center mx-2 my-0">you are not connected</p>
      <b-button variant="primary" @click="connectSocket()">Connect</b-button>
    </div>
  </div>
</template>


<script>
import VueCookie from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
import mentorNavbar from "./components/widgets/mentorNavbar.vue";

export default {
  methods: {
    ...mapActions(["LoginMentorByCookie"]),
    connectSocket() {
      this.$socket.client.emit("MENTOR_JOIN", this.Mentor);
    },
  },
  computed: {
    ...mapGetters(["Mentor"]),
  },
  components: {
    mentorNavbar,
  },
  data() {
    return {
      isDisconnected:false,
      hideOn: [
        "home",
        "login",
        "register",
        "mentorMeetPrepare",
        "mentorMeetRoom",
      ],
    };
  },
  watch: {
    Mentor(newVal) {
      if (newVal) {
        this.$socket.client.emit("MENTOR_JOIN", newVal);
      }
    },
  },
  sockets: {
        disconnect(){
      console.log('socket disconnected')
      this.isDisconnected=true;
    },
    MENTOR_JOINED(){
      this.isDisconnected=false;
    }
  },
  mounted() {
    //Check Cookie
    var Token = VueCookie.get("mentorToken");
    if (Token) {
      this.LoginMentorByCookie({ Token });
    }
  },
};
</script>


<style>
.connPopup {
  width: 20%;
  position: sticky;
  bottom: 0;
}
</style>
