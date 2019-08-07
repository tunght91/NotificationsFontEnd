<template>
  <div>
    <b-card>
      <b-form @submit="onSubmit">
        <b-form-group
          description="Title notification"
          label="Title"
          label-for="title"
          :label-cols="3"
        >
          <b-form-input id="title" type="text" required v-model="title" placeholder=" Input Text"></b-form-input>
        </b-form-group>
        <b-form-group
          description="Short description"
          label="Description"
          label-for="basicText"
          :label-cols="3"
        >
          <b-form-input
            id="basicText"
            type="text"
            required
            v-model="shortDescription"
            placeholder=" Input short description"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          description="Link to"
          label="LinkTo (optional)"
          label-for="linkTo"
          :label-cols="3"
        >
          <b-form-input
            id="linkTo"
            type="url"
            v-model="linkTo"
            placeholder=" Link to"
            @change="changeLinkTo"
          ></b-form-input>
          <div class="card" style="width: 18rem; margin-top: 10px;" v-if="isShowLinkPreview">
            <img class="card-img-top" alt="Card image cap" :src="linkPreview.image" />
            <div class="card-body">
              <p class="card-text">{{linkPreview.title}}</p>
            </div>
          </div>
        </b-form-group>

        <b-form-group label="Contents (optional)" label-for="basicTextarea" :label-cols="3">
          <div>
            <vue-simplemde :configs="this.configs" v-model="contents" ref="markdownEditor" />
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary" class="px-4">Create</b-button>

        <!-- </div> -->
      </b-form>
    </b-card>
  </div>
</template>
<script>
import NotificationService from "../../services/notifications.service";
import { METHODS } from "http";
import { debug, debuglog } from "util";

import VueSimplemde from "vue-simplemde";
import { link } from "fs";
export default {
  name: "News",
  components: {
    VueSimplemde
  },
  data() {
    return {
      title: "",
      tag: "Announcement",
      shortDescription: "",
      contents: "",
      isPush: false,
      linkTo: "",
      type: "tomochainAnnounce",
      configs: {
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "|",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          "|",
          "preview",
          "guide"
        ]
      },
      isShowLinkPreview: false,

      linkPreview: {
        title: "",
        description: "",
        image: ""
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      try {
        var data = await NotificationService.create({
          title: this.title,
          tag: this.tag,
          shortDescription: this.shortDescription,
          contents: this.contents,
          isPush: this.isPush,
          linkTo: this.linkTo,
          type: this.type,
          linkPreview: this.linkPreview
        });
        alert(JSON.stringify("Success"));
        this.$router.replace({ path: "/notifications" });
      } catch (error) {
        alert(JSON.stringify(error.toString));
      }
    },
    changeLinkTo: async function() {
      debugger;
      if (this.linkTo === undefined || this.linkTo.length === 0) {
        this.isShowLinkPreview = false;
        return;
      }
      try {
        var data = await NotificationService.urlMetaData({
          linkTo: this.linkTo
        });
        this.linkPreview = data.data;
        console.log(this.linkPreView);
        this.isShowLinkPreview = true;
      } catch (error) {
        this.isShowLinkPreview = false;
        alert(JSON.stringify(error.message));
      }
    }
  }
};
</script>
<style>
@import "~simplemde/dist/simplemde.min.css";
</style>

