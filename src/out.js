import HelloWorld from './components/HelloWorld.vue';

const install = function(Vue, opts = {}) {
    Vue.component('fan', HelloWorld)
  };

export default {install};