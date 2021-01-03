import Vue from "vue"
import App from "./App.vue"
import VueResource from "vue-resource"
import Firebase from "firebase/app"

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Firebase)
Vue.http.options.root = "https://todo-app-stefan-default-rtdb.europe-west1.firebasedatabase.app/"

const firebaseConfig = {
  apiKey: "AIzaSyB972DYOzEukpvlUDOwrriolD590BGmGfE",
  authDomain: "todos-app-6fb2f.firebaseapp.com",
  projectId: "todos-app-6fb2f",
  storageBucket: "todos-app-6fb2f.appspot.com",
  messagingSenderId: "290860806222",
  appId: "1:290860806222:web:b8ac3be71f8cbb43ddd31f"
};
Firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
}).$mount("#app")
