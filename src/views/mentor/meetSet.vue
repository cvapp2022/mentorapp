<template>
  <b-container>
    <b-button v-if="meeting.date" variant="primary" @click="sceduleMeetBtn()">
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
      <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueMeetingSelector from "vue-meeting-selector";
export default {
  components: {
    VueMeetingSelector,
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
  watch: {
    ReqOne(oldVal, newVal) {
      if (newVal) {
        this.meetingsDays = this.formatDates(this.dateGroupIndex);
        this.loading = false;
      }
    },
  },
  methods: {
    ...mapActions(["getRequestOne", "sceduleMeet"]),
    formatDates(datesIndex) {

      var usedDatesArr = [];
      if (this.Requests.length > 0) {
        this.Requests.forEach((request) => {
          if (request.ReqState === "applied" && request.ReqMeets.length > 0) {
            request.ReqMeets.forEach((meet) => {
              if (meet.MeetDate) {
                usedDatesArr.push(new Date(meet.MeetDate).getTime());
              }
            });
          }
        });
      }
      const groups = this.ReqOne.ReqDates.reduce((groups, slot) => {
        // console.log("date from group", new Date(slot.date).getTime());
        const date = slot.date.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        if(!usedDatesArr.includes(new Date(slot.date).getTime()) ){
          groups[date].push({ date: new Date(slot.date) });
        }
        return groups;
      }, {});

      const groupArrays = Object.keys(groups).map((date) => {
        var formatedDate = new Date(date);
        return {
          date: formatedDate,
          slots: groups[date],
        };
      });

      var perChunk = 6; // items per chunk

      //return groupArrays;

      var result = groupArrays.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);

      return result[datesIndex];
    },
    async nextDate() {
      this.loading = true;
      this.dateGroupIndex = this.dateGroupIndex + 1;
      this.meetingsDays = await this.formatDates(this.dateGroupIndex);
      // hide loading
      this.date = this.meetingsDays[this.meetingsDays.length - 1].date;
      console.log(this.meetingsDays.length);
      this.date = this.meetingsDays[0].date;
      this.loading = false;
    },
    async previousDate() {
      // display loading
      this.loading = true;
      this.dateGroupIndex = this.dateGroupIndex - 1;
      this.meetingsDays = await this.formatDates(this.dateGroupIndex);
      // hide loading
      this.date = this.meetingsDays[this.meetingsDays.length - 1].date;
      this.loading = false;
    },
    sceduleMeetBtn() {
      var data = {
        MeetRequestIdI: this.$route.params.requestId,
        MeetIdI: this.$route.params.meetId,
        MeetDateI: this.meeting.date,
      };
      this.sceduleMeet(data);
    },
  },
  computed: {
    ...mapGetters(["Requests", "ReqOne"]),
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
  },
  mounted() {
    if (this.Requests.length > 0) {
      this.getRequestOne(this.$route.params.requestId);
      this.meetingsDays = this.formatDates(this.dateGroupIndex);
      this.loading = false;
    }
  },
};
</script>

<style>
</style>