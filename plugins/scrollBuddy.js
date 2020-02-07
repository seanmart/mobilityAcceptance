import scrollBuddy from '@/assets/scrollBuddy'
import Vue from 'vue'

let sb = new scrollBuddy({
  smooth: true
})

Vue.directive('scroll',{
  inserted: function(el,binding){
    if (binding.arg === 'section') {
      sb.scroll.addSection(el, binding.value)
    } else {
      sb.scroll.addElement(el, binding.value)
    }
  }
})

Object.defineProperty(Vue.prototype, "$scrollbuddy", {
  value: sb
});
