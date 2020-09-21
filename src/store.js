import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        messages :[],
        dialogNewMessage:false,
        dialog:false ,
        dialogClient:false,
        dialogFourniture : false,
        dialogTirage :false,
        dialogVehicule :false,
        dialogRelex:false,
        dialogPEC:false,
    },
    mutations:{
        updatemessages (state, messages){
            state.messages=messages;
        },
        newMessage(state, message){
            state.messages.push(message);
        },
        updateDialogNewMessage(state){
            state.dialogNewMessage= !state.dialogNewMessage
        },
        updateDialog(state){
            state.dialog= !state.dialog
        },
        updateDialogClient(state){
            state.dialogClient= !state.dialogClient
        },
        updateDialogFourniture(state){
            state.dialogFourniture= !state.dialogFourniture
        },
        updateDialogTirage(state){
            state.dialogTirage= !state.dialogTirage
        },
        updateDialogVehicule(state){
            state.dialogVehicule= !state.dialogVehicule
        },
        updateDialogRelex(state){
            state.dialogRelex= !state.dialogRelex
        },
        updateDialogPEC(state){
            state.dialogPEC= !state.dialogPEC
        }
    },
    actions:{
        async getMessages ({commit}){
            let messages =  (await  axios.get("http://localhost:3030/messages")).data
            commit('updatemessages',messages);
        },
        async newMessage({commit},msg){
            let new_message = (await axios.post("http://localhost:3030/messages",msg)).data;
            commit('newMessage', new_message.msg);
        }
    }
})