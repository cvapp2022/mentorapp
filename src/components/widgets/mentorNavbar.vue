<template>
  <div class="">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item active-class="active" :to="{ name: 'mentorDashboard' }"
            >Dashboard</b-nav-item
          >
          <b-nav-item active-class="active" :to="{ name: 'mentorRequests' }"
            >requests</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Notif">
            <b-dropdown-item
              v-for="notif in Notification"
              v-bind:key="notif._id"
              href="#"
              >{{ $t(notif.NotifMessage, notif.NotifValues) }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Lang">
            <b-dropdown-item-button variant="link" @click="setLant('ar')">
              العربية
            </b-dropdown-item-button>
            <b-dropdown-item-button variant="link" @click="setLant('en')">
              English
            </b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["Notification"]),
  },
  methods: {
    setLant(lang) {
      var languages = ["ar", "en"];
      if (!languages.includes(lang)) {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = lang;
        var htmlTag = document.querySelector("html");
        htmlTag.setAttribute("lang", lang);
        if (lang === "ar") {
          htmlTag.setAttribute("dir", "rtl");
        } else {
          htmlTag.setAttribute("dir", "ltr");
        }
        this.getPrograms({ lang });
      }
    },
  },
};
</script>

<style>
</style>