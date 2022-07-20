<template>
  <b-container>
    <b-tabs content-class="mt-3" class="my-3">
      <!-- <b-tab title="scedule new meeting" active>
        <b-button
          v-if="meeting.date"
          variant="primary"
          @click="sceduleMeetBtn()"
        >
          Scedule
        </b-button>
        <div class="simple-example">
          <vue-meeting-selector
            class="simple-example__meeting-selector"
            v-model="meeting"
            :date="date"
            :loading="loading"
            :class-names="classNames"
            :meetings-days="meetingsDays"
            @next-date="nextDate"
            @previous-date="previousDate"
            :multi="false"
            :calendarOptions="{
              limit: '12',
              //daysLabel:['السبت ','الاحد',' الاثنين'],
            }"
          >
            <template #button-up>
              <span></span>
            </template>
            <template #button-down>
              <span></span>
            </template>
          </vue-meeting-selector>
          <p>
            meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}
          </p>
        </div>
      </b-tab> -->
      <b-tab title="meetings">
        <h4>meetings list</h4>
        <div v-for="item in ReqOne.ReqMeets" v-bind:key="item._id">
          <router-link
            :to="{ name: 'mentorMeetPrepare', params: { meetId: item._id } }"
            v-if="item.MeetDate"
            >meet {{ item.MeetId }}
          </router-link>
          <router-link
            :to="{ name: 'mentorMeetSet', params: { meetId: item._id } }"
            v-if="!item.MeetDate"
            >meet {{ item.MeetId }}
          </router-link>
        </div>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
  methods:{
    ...mapActions(['getRequestOne'])
  },
  data() {
    return {
      date: new Date(),
      meetingsDays: [],
      meeting: {},
      loading: true,
      nbDaysToDisplay: 6, // NOT USED?
      dateGroupIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["Requests", "ReqOne"]),
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
  },
  watch: {
    Requests(oldval, newval) {
      if (newval) {
        this.getRequestOne(this.$route.params.requestId);
      }
    },
  },
  async created() {
    //this.meetingsDays = await this.getMeetings(this.ReqOne.ReqDates);
  },
  mounted() {
    if (this.Requests.length > 0) {
      this.getRequestOne(this.$route.params.requestId);
    }
  },
};
</script>

<style>
</style>