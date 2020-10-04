import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        authenticed : false,
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
        setAuth(state,authenticed){
            state.authenticed=authenticed;
        },
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
            state.authenticed=false;
            state.token='';
            state.user=null;
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
        }
    },
    actions:{
        async getMessages ({commit}){

            let messages =  (await  axios.get("http://localhost:3030/messages")).data
            commit('updatemessages',messages);
        
        },
        async newMessage(_,content){

            let msg = {}
            msg.content=content;
            msg.reciever_ID=this.state.reciever_ID;
            (await axios.post("http://localhost:3030/messages",msg)).data; 

        },
        async getTeam ({commit}){
            let users  =  (await  axios.get("http://localhost:3030/team")).data
            commit('updateTeam',users);
        },
        async deleteUser({state},userName){
            let deleted = (await axios.delete("http://localhost:3030/users/"+userName)).data;
            if(deleted){
                var index = state.users.indexOf(userName);
                state.users.splice(index,1);
            }
        }
        ,
        async creeCompte({commit},userData){

            let token =(await axios.post("http://localhost:3030/register",userData)).data;
            if(typeof token !== "undefined")
            {
                localStorage.setItem('token',token);
                axios.defaults.headers.common['Authorization']=token;
                commit('auth',token);
                commit('setAuth',true);  
            }     
        },
        async login({commit},userData){

            let res =(await axios.post("http://localhost:3030/login",userData)).data;
            if(typeof res.token !== "undefined"){
                localStorage.setItem('token',res.token);
                axios.defaults.headers.common['Authorization']=res.token;
                commit('auth',res.token);
                commit('setAuth',true);
                commit('getUser',userData) 
            }
        }
    }
})