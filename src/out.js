import HelloWorld from './components/HelloWorld.vue';

const install = function(Vue, opts = {}) {
    Vue.component('fan', HelloWorld)
  };
function hello(){
    console.log('woshilaofan')
}
export default {install,hello};