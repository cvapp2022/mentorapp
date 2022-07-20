import axios from "axios";
import VueCookie from 'vue-cookies';
// import CryptoJS from 'crypto-js'
import router from '../../router/index'
//import $socket from '../../socket-instance';


const state = {
    Mentor: {},
    Notification:{},
    MentorToken: {},
}

const getters = {
    Mentor: state => state.Mentor,
    Notification:state=>state.Notification,
    MentorToken: state => state.MentorToken
}

const actions = {

    //Login
    LoginMentor({ commit, dispatch }, mentor) {


        var url = process.env.VUE_APP_BASEURL + '/mn/mentor/login';
        axios.post(url, mentor).then(function (resp) {

            if (resp.data.success) {

                //encrypt token 
                // const key = process.env.VUE_APP_ENCKEY //
                // const iv = process.env.VUE_APP_ENCIV // 
                const txt = resp.data.payload.token;
                // const cipher = CryptoJS.AES.encrypt(txt, key, {
                //     iv: CryptoJS.enc.Utf8.parse(iv),
                //     mode: CryptoJS.mode.CBC
                // })

                commit('Mentor', resp.data.payload.mentor)
                console.log(resp.data.payload.mentor.MentorNotif)
                commit('Notification',resp.data.payload.mentor.MentorNotif)
                commit('MentorToken', txt)
                // commit('Requests',resp.data.payload.mentor.MentorRequests)
                
                VueCookie.set('mentorToken', txt, { expires: "1h" })
                
                //Set Token Default
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + txt;
                dispatch('getRequests')
                //$socket.emit("MENTOR_JOIN",resp.data.payload.mentor)
                //dispatch('getProfile')

                //redirect to profile view 
                router.push({ name: 'mentorDashboard' })

            }

        })
    },

    LoginMentorByCookie({ commit, dispatch }, data) {


       // const key = process.env.VUE_APP_ENCKEY //

        //Dcrypt Token
       // var dcrypted = CryptoJS.AES.decrypt(data.Token, key).toString(CryptoJS.enc.Utf8);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.Token;

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/mn/mentor/';
        axios.get(url).then((resp) => {

            if (resp.data.success) {

                commit('Mentor', resp.data.payload)
                commit('MentorToken', data.Token)
                dispatch('getRequests')
            }

        })
    },
}

const mutations = {
    Mentor: (state, Mentor) => (state.Mentor = Mentor),
    Notification:(state, Notification) => (state.Notification = Notification),
    MentorToken: (state, MentorToken) => (state.MentorToken = MentorToken),
}



export default {
    state,
    getters,
    actions,
    mutations
}