import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        sokect:io('http://localhost:3030/'),
        user:{
            userName :'',
            role :'',
            avatar :'',
        },
        messages :[],
        users : [],
        token:!!localStorage.getItem('token')|| '',
        reciever_ID : null,
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
        getUser(state , user){
            state.user=user;
        },
        updateTeam(state, users){
            state.users=users
        },
        updatemessages (state, messages){
            state.messages=messages;
        },
        newMessage(state, message){
            state.messages.push(message);
        },
        auth(state, token){
            state.token=token;
        },
        logout(state){
            state.token='';
            localStorage.clear('token');
        },
        updateDialogNewMessage(state ,index){
            state.reciever_ID=index;
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
        },
        send(){

        }
    },
    actions:{
        async getMessages ({commit}){
            let messages =  (await  axios.get("http://localhost:3030/messages")).data
            commit('updatemessages',messages);
        },
        async newMessage({commit},content){
            let msg = {}
            msg.content=content;
            msg.reciever_ID=this.state.reciever_ID;
            (await axios.post("http://localhost:3030/messages",msg)).data;
            commit('send')
            
        },
        async getTeam ({commit}){
            let users  =  (await  axios.get("http://localhost:3030/team")).data
            commit('updateTeam',users);
        },
        async creeCompte({commit},userData){
            let token =(await axios.post("http://localhost:3030/register",userData)).data;
            localStorage.setItem('token',token);
            axios.defaults.headers.common['Authorization']=token;
            commit('auth',token);       
        },
        async login({commit},userData){
            let user =(await axios.post("http://localhost:3030/login",userData)).data;
            localStorage.setItem('token',user.token);
            axios.defaults.headers.common['Authorization']=user.token;
            commit('auth',user.token);
            commit('getUser',user)       
        },
    }
})