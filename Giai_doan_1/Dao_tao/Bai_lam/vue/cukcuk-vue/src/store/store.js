import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {    
        displayModal: 'none',
        employeeCode: '',
        employees: [],
    },
    getters: {
        DISPLAY_MODAL: state => {
            return state.displayModal;
        },
        EMPLOYEE_CODE: state => {
            return state.employeeCode;
        }
    },
    mutations: {
        SHOW_MODAL(state) {
            state.displayModal = 'block';
        },
        HIDDEN_MODAL(state) {
            state.displayModal = 'none';
        },
        GET_EMPLOYEES(state, employees) {
            state.employees = employees;
        }
    },
    actions: {
        getEmployeeCode() {
            axios
            .get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
            .then(function(res) {
                console.log(res.data);
                this.state.employees = res.data;
            }) 
            .catch((res) => console.log(res));
        },
        async getEmployees({commit}) {
            //Goi Api thuc hien lay du lieu
            console.log('oke')
            await axios
            .get("http://cukcuk.manhnv.net/v1/Employees")
            .then(function(res) {
                console.log(res.data);
                // this.state.employees = res.data;
                commit("GET_EMPLOYEES", res.data);
            }) 
            .catch((res) => console.log(res));
        },
    }
});

export default store