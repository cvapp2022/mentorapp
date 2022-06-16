<template>
  <div class="container-fluid my-3">
    <div class="row">
      <div class="col-md-7">
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
          <button type="button" class="btn btn-primary" @click="onJoin">
            Join
          </button>
          <button type="button" class="btn btn-primary" @click="onLeave">
            Leave
          </button>
          <button type="button" class="btn btn-primary" @click="onCapture">
            Capture Photo
          </button>
          <button type="button" class="btn btn-primary" @click="onShareScreen">
            Share Screen
          </button>
          <div class="">
            <h2>Captured Image</h2>
            <figure class="figure">
              <img :src="img" class="img-responsive" />
            </figure>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <b-card>
          <b-container fluid>
            <b-row
              class="overflow-auto flex-column flex-nowrap"
              style="height: 80vh"
            >
              <div
                class=""
                v-for="item in this.Session.SessionMessage"
                v-bind:key="item._id"
              >
                <b-card
                  v-if="item.MessageSender === 'user'"
                  bg-variant="info"
                  text-variant="white"
                  class="my-2"
                >
                  <p>{{ item.MessageValue }}</p>
                </b-card>
                <b-card
                  v-if="item.MessageSender === 'mentor'"
                  bg-variant="primary"
                  text-variant="white"
                  class="my-2"
                >
                  <p>{{ item.MessageValue }}</p>
                </b-card>
              </div>
            </b-row>
            <b-row class="">
              <div class="d-flex m-3">
                <b-input v-model="msgsend"></b-input>
                <b-button variant="primary" @click="sendMsgBtn">send</b-button>
              </div>
            </b-row>
          </b-container>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { WebRTC } from "vue-webrtc";
import { mapGetters } from "vuex";
import _ from "lodash";
import router from "../../router/index";
export default {
  name: "demo",
  components: {
    WebRTC,
  },
  data() {
    return {
      img: null,
      roomId: "",
      msgsend: "",
    };
  },
  mounted: function () {
    console.log(this.Session);
    if (_.isEmpty(this.Session)) {
      console.log("no session redirect to prepare");
      router.push({ name: "mentorDashboard" });
    } else {
      this.roomId = this.Session._id;
      this.$socket.client.emit("join", { session: this.roomId });
    }
  },
  computed: {
    ...mapGetters(["Session","Mentor"]),
  },
  watch: {},
  methods: {
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onJoin() {
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
        sendMsgBtn() {
      console.log("ddd");
      this.$socket.client.emit("SEND_MESSAGE", {
        from: "mentor",
        senderId: this.Mentor._id,
        sessionId: this.roomId,
        value: this.msgsend,
      });
    },
  },
};
</script>

<style>
.btn {
  margin-right: 8px;
}
</style>