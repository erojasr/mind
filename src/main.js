// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
      firebase.initializeApp({
          apiKey: 'AIzaSyCcurOVqfv2_TwlBJD_9Ao_DBsWLz1XPJ8',
          authDomain: 'meetup-d1f79.firebaseapp.com',
          databaseURL: 'https://meetup-d1f79.firebaseio.com',
          projectId: 'meetup-d1f79',
          storageBucket: 'meetup-d1f79.appspot.com',
      })
      this.$store.dispatch('loadMeetups')
  }
})
