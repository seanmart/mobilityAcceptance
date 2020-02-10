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
      scrollbar:{
        offset:0,
        lastY:0,
        delayHide: null
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
        if (!this.isScrolling && !this.isTouchingScrollbar) this.checkScroll()
        this.updateDelta(e)
    })

    this.addScrollbar()

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

  addScrollbar(){
    this.scrollbar = document.createElement('span')
    this.isTouchingScrollbar = false
    let height = this.getScrollbarHeight()
    console.log(height)

    this.scrollbar.style.cssText = 'position:fixed;' +
                                   'z-index: 1000;' +
                                   'border-radius: 20px;' +
                                   'top: 0px;' +
                                   'right: 2.5px;' +
                                   'width: 12px;' +
                                   'transition: opacity .5s;' +
                                   'opacity: 0;' +
                                   `height: ${height}px;` +
                                   `background: ${this.scrollbarColor};`

    this.touchScrollbar = this.touchScrollbar.bind(this)
    this.moveScrollbar = this.moveScrollbar.bind(this)
    this.releaseScrollbar = this.releaseScrollbar.bind(this)

    this.scrollbar.addEventListener('mousedown', this.touchScrollbar)
    window.addEventListener('mousemove', this.moveScrollbar)
    window.addEventListener('mouseup', this.releaseScrollbar)

    document.body.append(this.scrollbar);

    this.updateScrollbar()
  }

  addSection(el, params = {}){
    let onRender = (rendered)=>{
      el.style.visibility = rendered ? 'visible' : 'hidden'
      params.onRender && params.onRender(rendered)
    }
    this.elements.push(new Element(el, {...params, scroll: true, padding: 500, onRender}))
  }


  // UPDATE ----------------------------------
  update(){
    super.update()
    this.updateScrollbar()
  }

  updateDelta(e){
    this.instance.delta.y -= e.deltaY;
    if (this.instance.delta.y < 0) this.instance.delta.y = 0;
    if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
  }

  updateScrollbar(){
    let height = this.getScrollbarHeight()
    this.scrollbar.style.height = `${height}px`
  }

  updateScroll(){
    this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia * this.inertiaRatio);
  }

  // TRANSFORM -----------------------------
  transformScrollbar(){
    clearTimeout(this.instance.scrollbar.delayHide)
    this.scrollbar.style.opacity = 1
    let distance = this.windowHeight * (this.instance.scroll.y / (this.instance.limit + this.windowHeight))
    this.transform(this.scrollbar,distance,0)
    this.instance.scrollbar.delayHide = setTimeout(()=> this.scrollbar.style.opacity = 0, 300)
  }

  // CHECK ---------------------------------


  checkScroll(){

      Math.abs(this.instance.delta.y - this.instance.scroll.y) < .1
      ? this.stopScrolling()
      : this.startScrolling()

      if (this.isScrolling){
        requestAnimationFrame(() => {
          this.updateScroll();
          this.transformScrollbar()
          this.transformElements()
          this.checkScroll()
        });
      }
  }

  //SCROLLBAR --------------------------------
  getScrollbarHeight(){
    return this.windowHeight * (this.windowHeight / (this.instance.limit + this.windowHeight))
  }
  touchScrollbar(e){
    this.isTouchingScrollbar = true
    this.instance.scrollbar.offset = e.clientY
    this.instance.scrollbar.lastY = this.instance.scroll.y
    this.scrollbar.style.opacity = 1
  }
  moveScrollbar(e){
    if (this.isTouchingScrollbar){
        e.preventDefault()

        let difference = ((e.clientY - this.instance.scrollbar.offset) / this.windowHeight) * (this.instance.limit + this.windowHeight)
        let y = this.instance.scrollbar.lastY + difference
        if (y > 0 && y < this.instance.limit){
          this.instance.delta.y = y
          this.checkScroll()
        }
    }
  }
  releaseScrollbar(){
    this.isTouchingScrollbar = false
  }


}
