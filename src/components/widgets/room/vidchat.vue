<template>
  <div class="">
    <WebRTC
      ref="webrtc"
      width="100%"
      :roomId="roomId"
      :socketURL="'http://127.0.0.1:5000'"
      :enableLogs="true"
      v-on:joined-room="logEvent"
      v-on:left-room="logEvent"
      v-on:opened-room="logEvent"
      v-on:share-started="logEvent"
      v-on:share-stopped="logEvent"
      @error="onError"
    />
    <!-- <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
    <button type="button" class="btn btn-primary" @click="onLeave">
      Leave
    </button>
    <button type="button" class="btn btn-primary" @click="onCapture">
      Capture Photo
    </button>
    <button type="button" class="btn btn-primary" @click="onShareScreen">
      Share Screen
    </button> -->
    <div class="">
      <figure class="figure">
        <img :src="img" class="img-responsive" />
      </figure>
    </div>
  </div>
</template>

<script>
import { WebRTC } from "vue-webrtc";
import { mapGetters } from "vuex";
export default {
  components: {
    WebRTC,
  },
  computed: {
    ...mapGetters(["Session"]),
  },
  data() {
    return {
      img: null,
      roomId: "",
    };
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onJoin() {
      console.log("joined");
      this.$refs.webrtc.join();
    },
    onLeave() {
      this.$refs.webrtc.leave();
    },
    onShareScreen() {
      this.img = this.$refs.webrtc.shareScreen();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
  },
  mounted() {
    this.roomId = this.Session._id;
    //this.onJoin()
  },
};
</script>

<style>
</style>