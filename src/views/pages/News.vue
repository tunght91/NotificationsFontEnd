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
          <b-form-input
            id="title"
            type="text"
            required
            v-model="title"
            placeholder=" Input Text"
          ></b-form-input>
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
        <b-form-group description="Link to" label="LinkTo (optional)" label-for="linkTo" :label-cols="3">
          <b-form-input id="linkTo" type="text" v-model="linkTo" placeholder=" Link to"></b-form-input>
        </b-form-group>

        <b-form-group label="Contents (optional)" label-for="basicTextarea" :label-cols="3">
          <b-form-textarea
            id="basicTextarea"
            :rows="9"
            v-model="contents"
            placeholder="Content.."
          ></b-form-textarea>
        </b-form-group>
        <!--custom controls - radios/checkboxes - temporary fix-->
        <b-form-group :label-cols="3">
          <b-form-radio-group id="basicRadiosCustom" value="1" stacked>
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="customRadio1"
                name="Push now"
                class="custom-control-input"
                value="1"
                checked
              />
              <label class="custom-control-label" for="customRadio1">Push now</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="customRadio2"
                name="Push later"
                class="custom-control-input"
                value="2"
              />
              <label class="custom-control-label" for="customRadio2">Push later</label>
            </div>
          </b-form-radio-group>
        </b-form-group>
        <!-- <div slot="footer"> -->
     
                      <b-button type="submit" variant="primary" class="px-4">Create</b-button>
                    
        <!-- </div> -->
      </b-form>
    </b-card>
  </div>
</template>
<script>
import NotificationService from "../../services/notifications.service";
import { METHODS } from "http";
import { debug } from "util";
export default {
  name: "News",
  data() {
    return {
        title: "",
        tag:"Announce",
        shortDescription: "",
        contents: "",
        isPush: true,
        linkTo: "",
        type:"tomochainAnnounce"
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
          type: this.type
        });
        this.$router.replace({path: '/notifications'});
      } catch (error) {}
    }
  }
};
</script>

