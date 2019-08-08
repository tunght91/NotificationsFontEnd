<template>
  <div>
    <b-card>
      <b-form>
        <b-form-group
          description="Title notification"
          label="Title"
          label-for="title"
          :label-cols="3"
        >
          <b-form-input id="title" type="text" required v-model="item.title"></b-form-input>
        </b-form-group>
        <b-form-group
          description="Short description"
          label="Description"
          label-for="basicText"
          :label-cols="3"
        >
          <b-form-input id="basicText" type="text" required v-model="item.shortDescription"></b-form-input>
        </b-form-group>
        <b-form-group description="Link to" label="LinkTo" label-for="linkTo" :label-cols="3">
          <b-form-input
            id="linkTo"
            type="text"
            v-model="item.linkTo"
            @change="changeLinkTo"
            placeholder=" Link to"
          ></b-form-input>
          <div
            class="card"
            style="width: 18rem; margin-top: 10px;"
            v-if="isShowLinkPreview
          "
          >
            <img class="card-img-top" alt="Card image cap" :src="linkPreview
            .image" />
            <div class="card-body">
              <p class="card-text">
                {{linkPreview
                .title}}
              </p>
            </div>
          </div>
        </b-form-group>

        <b-form-group label="Contents" label-for="basicTextarea" :label-cols="3">
          <div>
            <vue-simplemde :configs="this.configs" v-model="item.contents" ref="markdownEditor" />
          </div>
        </b-form-group>

        <div slot="footer">
          <b-button @click="goBack">Cancel</b-button>
          <b-button
            @click="onSave"
            variant="primary"
            class="btn btn-success"
            style="margin: 0 10px;"
          >Save</b-button>
          <b-button
            @click="onSubmit"
            v-show="!this.item.isPush"
            variant="primary"
            class="btn btn-danger"
          >Push Notify</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import NotificationService from "../../services/notifications.service";
import usersData from "../users/UsersData";
import { async } from "q";

import VueSimplemde from "vue-simplemde";
import { debug } from "util";

import urlMetadata from "url-metadata";
import { truncate, link } from "fs";
export default {
  name: "User",
  components: {
    VueSimplemde
  },
  data() {
    return {
      item: {
        title: "",
        shortDescription: "",
        contents: "",
        isPush: true,
        linkTo: ""
      },
      isShowLinkPreview: false,

      linkPreview: {
        title: "",
        description: "",
        image: ""
      },
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
      }
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async loadData() {
      try {
        var respones = await NotificationService.item({
          id: this.$route.params.id
        });
        this.item = respones.data;

        if (respones.data.linkPreview !== undefined) {
          this.linkPreview = respones.data.linkPreview;
          this.isShowLinkPreview = true;
        } else {
          this.isShowLinkPreview = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // push notification
    async onSubmit(evt) {
      evt.preventDefault();
      if (confirm("are you sure push an notification to all devices?")) {
        try {
          var data = await NotificationService.push({
            id: this.$route.params.id
          });
          this.$router.replace({ path: "/notifications" });
        } catch (error) {
          alert(JSON.stringify(error.message));
        }
      } else {
      }
    },
    // save
    async onSave(evt) {
      evt.preventDefault();

      if (confirm("are you sure saving new info?")) {
        try {
          debugger;
          var data = await NotificationService.update({
            id: this.$route.params.id,
            title: this.item.title,
            tag: this.item.tag,
            shortDescription: this.item.shortDescription,
            contents: this.item.contents,
            isPush: this.item.isPush,
            linkTo: this.item.linkTo,
            linkPreview: {
              title: this.linkPreview.title,
              description: this.linkPreview.description,
              image: this.linkPreview.image
            }
          });
          alert(JSON.stringify("Success"));
        } catch (error) {
          alert(JSON.stringify(error.message));
        }
      } else {
      }
    },
    changeLinkTo: async function() {
      if (this.item.linkTo === undefined || this.item.linkTo.length === 0) {
        this.isShowLinkPreview = false;
        return;
      }
      try {
        var data = await NotificationService.urlMetaData({
          linkTo: this.item.linkTo
        });
        debugger;
        console.log(data);
        this.linkPreview = data.data;
        console.log(this.linkPreview);
        this.isShowLinkPreview = true;
      } catch (error) {
        this.isShowLinkPreview = false;
        alert(JSON.stringify(error.message));
      }
    }
  }
};
</script>