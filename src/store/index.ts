import Vue from 'vue'
import Vuex from 'vuex'
import { extractVuexModule, createProxy } from "vuex-class-component";
import { TodoStore } from "./todo-module";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
		...extractVuexModule(TodoStore)
  }
})

export default store;
export const vxm = {
	todos: createProxy(store, TodoStore )
}