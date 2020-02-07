import Core from './Core'
import Element from './Element'
import VirtualScroll from 'virtual-scroll'
import {lerp,getTranslate} from './utils'

export default class extends Core{
  constructor(options = {}){
    super(options)

    this.isScrolling = false

  }
  init(){
    super.init()
    document.getElementsByTagName('body')[0].style.cssText += ';overflow: hidden; height: 100vh;'

    this.instance = {
      delta:{
        x: 0,
        y:0
      },
      ...this.instance
    }

    this.vs = new VirtualScroll({
      el: this.el,
      mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
      useKeyboard: false,
      passive: true
    })

    this.vs.on(e =>{
        if (this.stop) return
        if (!this.isScrolling) this.checkScroll()
        this.updateDelta(e)
    })

  }

  startScrolling(){
    this.isScrolling = true
  }

  stopScrolling(){
    this.isScrolling = false
    this.inertiaRatio = 1;
    this.instance.scroll.y = Math.round(this.instance.scroll.y);
  }

  // ADD -------------------------------------
  addSection(el, params = {}){
    let onRender = (rendered)=>{
      el.style.visibility = rendered ? 'visible' : 'hidden'
      params.onRender && params.onRender(rendered)
    }
    this.elements.push(new Element(el, {...params, scroll: true, padding: 500, onRender}))
  }


  // UPDATE ----------------------------------

  updateDelta(e){
    this.instance.delta.y -= e.deltaY;

    if (this.instance.delta.y < 0) this.instance.delta.y = 0;
    if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;

  }

  updateScroll(){
    this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia * this.inertiaRatio);
  }

  // CHECK ---------------------------------


  checkScroll(){

      Math.abs(this.instance.delta.y - this.instance.scroll.y) < .1
      ? this.stopScrolling()
      : this.startScrolling()

      if (this.isScrolling){
        requestAnimationFrame(() => {
          this.updateScroll();
          this.transformElements()
          this.checkScroll()
        });
      }
  }


}
