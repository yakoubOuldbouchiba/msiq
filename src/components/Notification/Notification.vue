<template>
    <v-menu 
        max-height="500"
        width="350">
      <template v-slot:activator="{ on, attrs }">
        <v-icon 
            
            v-show="UnSeen<= 0"
            class="indigo--text text--darken-4 mx-4"
            v-bind="attrs"
            v-on="on"
          >
                notification_important
          </v-icon>
        <v-badge
          class="mx-4"
          color="error"
          v-show="UnSeen> 0"
          :content = "UnSeen"
        >
          <v-icon 
            v-if="$store.state.token" 
            class="indigo--text text--darken-4"
            v-bind="attrs"
            v-on="on"
          >
                notification_important
          </v-icon>
         </v-badge>
      </template>
      
      <v-list
        app
        v-model="menu"
      >
        <v-list-item-title >
          <h2 class="mx-4">Notifications</h2>
          <v-divider></v-divider>
        </v-list-item-title>
        <v-list-item
          v-for ="(notif, index) in Notifications" 
          :key="index" 
          @click="seen(notif.notification_ID)"
        >
          <v-list-item-avatar
            color="indigo"
          >
            <v-icon fab color="white">{{notif.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content v-if="!notif.seen" >
            <p>
              <b>{{notif.nom}} </b> 
              <em>({{notif.date_notification.substr(0,10)+" "+notif.date_notification.substr(11,5)}})</em>
            </p>
            {{" "+notif.description_notif}}
          </v-list-item-content>
          <v-list-item-content v-else class="grey--text  lighten-4" >
            <p>
              <b>{{notif.nom}} </b>
              <em>({{notif.date_notification.substr(0,10)+" "+notif.date_notification.substr(11,5)}})</em> 
            </p>
            {{" "+notif.description_notif}}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
</template>
<script>
import Axios from 'axios';
export default {
    name: "Notifications",
    data(){
      return(
        {
          Notifications : [],
          UnSeen :0 ,
          menu:false , 
       
        }
      )
    },
    async created(){
        this.Notifications =(await Axios.get('/api/Notification/'+this.$store.state.user.email)).data.notifications;
        this.UnSeen =(await Axios.get('/api/UnSeenNotification/'+this.$store.state.user.email)).data.UnSeenNotif;
      
   },
    async mounted(){
     
      this.$store.state.sokect.on('seen'+this.$store.state.user.email, (id) => {
        let index = this.Notifications.findIndex(x =>  x.notification_ID == id)
        this.Notifications[index].seen=true;
        if(this.UnSeen>0){
          this.UnSeen = this.UnSeen-1;
        }
        }
      )
      /** notif oncreate */
      this.$store.state.sokect.on('NewNotif'+this.$store.state.user.email, async () => {
        this.Notifications =(await Axios.get('/api/Notification/'+this.$store.state.user.email)).data.notifications;
        this.UnSeen =(await Axios.get('/api/UnSeenNotification/'+this.$store.state.user.email)).data.UnSeenNotif;
      }
      )
      /*** notif on delete */
       this.$store.state.sokect.on('DeleteNofit'+this.$store.state.user.email, async () => { 
        this.Notifications =(await Axios.get('/api/Notification/'+this.$store.state.user.email)).data.notifications;
        this.UnSeen =(await Axios.get('/api/UnSeenNotification/'+this.$store.state.user.email)).data.UnSeenNotif;
      }
      )
      /** notif on update */
      this.$store.state.sokect.on('UpdateNotif'+this.$store.state.user.email, async () => {
            this.Notifications =(await Axios.get('/api/Notification/'+this.$store.state.user.email)).data.notifications;
            this.UnSeen =(await Axios.get('/api/UnSeenNotification/'+this.$store.state.user.email)).data.UnSeenNotif;
      })
      /** REJETEE && ACCEPTE */
      //CLIENT
      this.$store.state.sokect.on('addNotif'+this.$store.state.user.email, async () => {
          this.Notifications =(await Axios.get('/api/Notification/'+this.$store.state.user.email)).data.notifications;
          this.UnSeen =(await Axios.get('/api/UnSeenNotification/'+this.$store.state.user.email)).data.UnSeenNotif;
        }
      )
    },
    methods:{
       async seen(id){
        let index = this.Notifications.findIndex(x =>  x.notification_ID == id)
        if (this.Notifications[index].seen==false)
        await Axios.put('/api/Notification/'+id+'/'+this.$store.state.user.email)
      }
    }
}
</script>