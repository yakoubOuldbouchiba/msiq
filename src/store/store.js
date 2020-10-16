import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import io from 'socket.io-client'
import jwt from 'jsonwebtoken'
Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        menuProps: {
            disabled: false
        },
        user:{
            email : '',
            avatar : '',
            userName : '',
            FirstName: '',
            LastName: '',
            fonction : '',
            typeUtilisateur:'',
            structure : '',
            mobile: '',
            departement: '',
            posteTelephonique: '',
            dateNaissance: '',

        },
        sokect:io('http://localhost:3030/'),
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
        forDemandeRelex :false ,
        
    },
    mutations:{
        
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
        async deleteUser({state},item){
            let deleted = (await axios.delete("http://localhost:3030/users/"+item.email)).data;
            if(deleted){
                var index = state.users.indexOf(item);
                state.users.splice(index,1);
            }
        }, 
        getuser ({state}){
            const token = localStorage.getItem("token");
            if(token!=null){
                let userData =jwt.decode(token , 'TMPK3Y');
                state.user.email = userData.user.email;
                state.user.LastName = userData.user.nomUtilisateur;
                state.user.FirstName = userData.user.prenomUtilisateur;
                state.user.userName = userData.user.nomUtilisateur + " " + userData.user.prenomUtilisateur
                state.user.fonction = userData.user.fonction;
                state.user.typeUtilisateur = userData.user.typeUtilisateur;
                state.user.structure = userData.user.structure;
                state.user.departement = userData.user.departement;
                state.user.dateNaissance = userData.user.dateNaissance;
                state.user.posteTelephonique = userData.user.posteTelephonique;
                state.user.mobile = userData.user.mobile;
            }
        }
    }
})