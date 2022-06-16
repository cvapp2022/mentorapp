import axios from "axios";

const state = {
    Session:{},
}


const getters = {
    Session: state => state.Session
}


const actions = {

    saveSession({ commit },data) {

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/Mn/session';
        axios.post(url,data).then((resp) => {

            if (resp.data.success) {
                commit('Session', resp.data.payload);
            }

        })

    },
    getSession({  getters, commit }, meetId) {

        console.log('Reqmeets is ',getters.ReqOne.ReqMeets)
        var meetOne = getters.ReqOne.ReqMeets.find(item => item._id === meetId)
        
        //get last session and check status
        var SessionCount=meetOne.MeetSession.length;
        if(SessionCount>0){
            var Session=meetOne.MeetSession[SessionCount-1]
            if(Session){
                commit('Session', Session)
            }
        }
    },

}

const mutations = {
    Session: (state, Session) => (state.Session = Session),
    SOCKET_MESSAGE_SENT(state,message){
        state.Session.SessionMessage.push(message)
    }
}



export default {
    state,
    getters,
    actions,
    mutations
}