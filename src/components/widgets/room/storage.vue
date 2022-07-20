<template>
  <div class="">
    <div class="">
      <a
        href="#"
        v-for="item in this.Session.SessionAttachments"
        v-bind:key="item._id"
      >
        {{ item.AttachmentName }}
      </a>
    </div>
    <div class="dropzone">
      <VueFileAgent
        ref="vueFileAgent"
        :theme="'grid'"
        :multiple="true"
        :deletable="false"
        :meta="true"
        :accept="'image/*,.zip'"
        :maxSize="'10MB'"
        :maxFiles="14"
        :helpText="'Choose images or zip files'"
        :errorText="{
          type: 'Invalid file type. Only images or zip Allowed',
          size: 'Files should not exceed 10MB in size',
        }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
        class=""
      ></VueFileAgent>
      <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
        Upload {{ fileRecordsForUpload.length }} files
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fileRecords: [],
      uploadUrl: "",
      uploadHeaders: {},
      fileRecordsForUpload: [],
    };
  },
  computed: {
    ...mapGetters(["Session", "MentorToken"]),
  },
  methods: {
    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent
        .upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload)
        .then((resp) => {
          if (resp[0].data.success) {
            console.log(resp);
            this.Session.SessionAttachments = resp[0].data.payload;
            this.fileRecords = [];
          }
        });
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
  mounted() {
    this.uploadUrl =
      "http://127.0.0.1:5000/api/v1/Mn/Session/" + this.Session._id + "/upload";
    this.uploadHeaders = { authorization: "bearer " + this.MentorToken };
  },
};
</script>

<style scoped>
.dropzone {
  position: absolute;
  width: 96%;
  bottom: 6%;
}
</style>