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

        var url = process.env.VUE_APP_BASEURL + '/Mn/Meet/' ;
        axios.post(url,data).then((resp) => {

            if(resp.data.success){
                dispatch("getRequests")

            }


         })


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