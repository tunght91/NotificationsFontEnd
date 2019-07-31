<template>
  <div>
    <b-card>
      <b-form >
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
            v-model="item.title"
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
            v-model="item.shortDescription"
            placeholder=" Input short description"
          ></b-form-input>
        </b-form-group>
        <b-form-group description="Link to" label="LinkTo" label-for="linkTo" :label-cols="3">
          <b-form-input id="linkTo" type="text" v-model="item.linkTo" placeholder=" Link to"></b-form-input>
        </b-form-group>

        <b-form-group label="Contents" label-for="basicTextarea" :label-cols="3">
          <b-form-textarea
            id="basicTextarea"
            :rows="9"
            v-model="item.contents"
            placeholder="Content.."
          ></b-form-textarea>
        </b-form-group>
   
        </b-form-group>
        <div slot="footer">
            <b-button @click="goBack">Back</b-button>
            <b-button type="submit" variant="primary" class="px-4">Create</b-button>         
        </div>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import NotificationService from "../../services/notifications.service";
import usersData from "../users/UsersData";
import { async } from 'q';

export default {
  name: 'User',
  data() {
    return {
        item: {
            title: "",
            shortDescription: "",
            contents: "",
            isPush: true,
            linkTo: "",
        }
    
    };
  },
  created(){
      this.loadData()
      
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    async loadData (){
        try {
            var respones = await NotificationService.item({id:this.$route.params.id});
            this.item = respones.data
        } catch (error) {
            console.log(error);
          
        }
    }
  }
}
</script>