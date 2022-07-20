<template>
  <b-container>
    <router-link :to="{name:'mentorLogin'}" >Login</router-link>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      test1: "",
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    MESSAGE_SENT(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("MESSAGE_SENT", data)',
        data
      );
    },
  },
  methods: {
    join() {
      this.$socket.client.emit("join", { session: this.test1 });
    },
  },
  mounted() {},
  created() {
    console.log(this.$socket);
  },
};
</script>

<style>
</style>