<template>
  <div class="container-fluid my-3">
    <div class="row">
      <div class="col-md-7" style="min-height: 96vh">
        <b-card no-body class="h-100">
          <b-tabs pills card vertical class="h-100" style="min-height: 100vh">
            <b-tab title="Slides" active>
              <Slider :source="''"></Slider>
            </b-tab>
            <b-tab title="Storage">
              <Storage></Storage>
            </b-tab>
            <b-tab title="Sketch"
              ><b-card-text>Tab contents 3</b-card-text></b-tab
            >
          </b-tabs>
        </b-card>
      </div>
      <div class="col-md-5">
        <div class="mb-2 h-25">
          <vidchat></vidchat>
        </div>
        <b-card no-body>
          <chat></chat>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "../../components/widgets/room/slider.vue";
import Storage from "../../components/widgets/room/storage.vue";
import vidchat from "../../components/widgets/room/vidchat.vue";
import chat from "../../components/widgets/room/chat.vue";

import { mapGetters } from "vuex";
import _ from "lodash";
import router from "../../router/index";
export default {
  name: "demo",
  components: {
    Slider,
    Storage,
    vidchat,
    chat,
  },
  data() {
    return {
      roomId: null,
    };
  },
  sockets: {
    FILE_UPLOADED(data) {
      console.log("file uploaded", data);
    },
  },
  mounted: function () {
    console.log(this.Session);
    if (_.isEmpty(this.Session)) {
      router.push({ name: "mentorDashboard" });
    }
    this.roomId = this.Session.SessionId;
    console.log(this.roomId);
    this.$socket.client.emit("join", { session: this.roomId });
  },
  computed: {
    ...mapGetters(["Session"]),
  },
};
</script>

<style>
.btn {
  margin-right: 8px;
}
</style>