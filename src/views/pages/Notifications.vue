<template>

  <b-row>
      
    <b-col cols="12">
       
      <transition name="slide">
        
        <b-card>
          <div slot="header" v-html="caption"></div>
          <b-table
            :hover="hover"
            :striped="striped"
            :bordered="bordered"
            :small="small"
            :fixed="fixed"
            responsive="sm"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClicked"
          >
            <template slot="createdAt" slot-scope="data">
              <strong>{{dateformat(data.item.createdAt)}}</strong>
            </template>
            <template slot="name" slot-scope="data">
              <strong>{{data.item.name}}</strong>
            </template>
            <template slot="isPush" slot-scope="data">
              <b-badge :variant="getBadge(data.item.isPush)">{{data.item.isPush}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(items)"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
            />
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>
<script>
import NotificaionService from "../../services/notifications.service";
import usersData from "../users/UsersData";
import { async } from 'q';

import moment from 'moment'



export default {
  name: "List",
  props: {
    caption: {
      type: String,
      default: "Users"
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      fields: [
        {key: "createdAt" },
        { key: "title" },
        { key: "shortDescription" },
        { key: "content" },
        { key: "linkTo" },
        { key: "isPush" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
    };
  },
  created(){
      this.loadData()
      
  },
  methods: {
    getBadge(status) {
        return status === true ? 'success' : 'Pendding';
   
    },
    getRowCount(items) {
      return items.length;
    },
    userLink(id) {
      return `notifications/${id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item.id);
      this.$router.push({ path: userLink });
    },
     loadData: async function  () {
      try {
        var respones = await NotificaionService.list({page: this.currentPage, limit:this.perPage});
        this.items = respones.data
      } catch (error) {}
    },
    dateformat(value){
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
   
  }
};
</script>

