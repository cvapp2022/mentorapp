<template>
  <div class="">
    <vue-pdf-embed
      :source="'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'"
      :page="page"
      ref="pdfRef"
      @rendered="handleDocumentRender"
    />
    <button :disabled="page <= 1" @click="page--">❮</button>
    {{ page }} / {{ pageCount }}
    <button :disabled="page >= pageCount" @click="page++">❯</button>
  </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
export default {
  props: ["source"],
  components:{
    VuePdfEmbed
  },
  data() {
    return {
      page: 1,
      pageCount: 1,
      pdfIsLoading: true,
    };
  },
  methods: {
    handleDocumentRender() {
      this.pdfIsLoading = false;
      this.pageCount = this.$refs.pdfRef.pageCount;
    },
  },
};
</script>

<style>
</style>