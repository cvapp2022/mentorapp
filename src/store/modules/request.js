import axios from "axios";

const state = {
    Requests: [],
    ReqOne: {}
}


const getters = {
    Requests: state => state.Requests,
    ReqOne: state => state.ReqOne
}


const actions = {

    getRequests({ commit }) {

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/mentor';
        axios.get(url).then((resp) => {

            if (resp.data.success) {
                commit('Requests', resp.data.payload);
            }

        })

    },
    getRequestOne({ state, commit }, reqId) {

        var reqOne = state.Requests.find(item => item._id === reqId)

        commit('ReqOne', reqOne)
    },

    applyRequest({ dispatch }, reqId) {

        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/' + reqId + '/apply';
        axios.put(url).then((resp) => {

            if (resp.data.success) {
                dispatch("getRequests")
            }
        })

    },

    sceduleMeet({dispatch},data){

        var url = process.env.VUE_APP_BASEURL + '/Mn/Meet/'+data.MeetIdI ;
        axios.put(url,data).then((resp) => {

            if(resp.data.success){
                dispatch("getRequests")

            }


         })
    },
    socket_mentorAddedToProgram({dispatch}){
        //MENTOR_ADDED_TO_PROGRAM
        console.log('mentor addedd to prgram')
        dispatch('getRequests')

    },
    socket_mentorRemovedFromProgram({dispatch}){
        console.log('mentor removed from program')
        dispatch('getRequests')
    }

}

const mutations = {
    Requests: (state, Requests) => (state.Requests = Requests),
    ReqOne: (state, ReqOne) => (state.ReqOne = ReqOne)
}



export default {
    state,
    getters,
    actions,
    mutations
}