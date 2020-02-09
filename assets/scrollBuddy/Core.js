
import Element from './Element'

export default class {
  constructor(options = {}){

    Object.assign(this, {}, options);

    this.stop = options.stop || false
    this.checkScroll = this.checkScroll.bind(this);
    this.checkResize = this.checkResize.bind(this);
    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth
    this.shouldUpdate = null
    this.isTicking = false
    this.inertia = this.inertia * .1
    this.inertiaRatio = 1;
    this.elements = [];
    this.instance = {
      scroll:{x: 0,y:0},
      limit: this.el.offsetHeight - this.windowHeight,
    }

    window.scrollTo(0,0)
    window.addEventListener('resize', this.checkResize, false);

    window.addEventListener("load", () => {
      this.updateElements()
    });

  }

  init() {
    window.addEventListener("scroll", () => {
      if (this.stop) return
      if (!this.isTicking) {
        requestAnimationFrame(this.checkScroll)
        this.isTicking = true;
      }
      this.updateScroll();
    });
  }

  // CHECK -------------------------------

  checkScroll() {
    this.transformElements();
    this.isTicking = false
  }

  checkResize(){
    clearTimeout(this.shouldUpdate)
    this.shouldUpdate = setTimeout(()=>{
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.update()
    },300)
  }

  // ADD -----------------------------

  addSection(el, params = {}){
    this.elements.push(new Element(el, params))
  }

  addElement(el,params = {}){
    let element = new Element(el, params)
    this.transformElements({element})
    this.elements.push(element)
  }

  // UPDATE -------------------------------

  update(){
    this.setScrollLimit()
    this.updateScroll()
    this.updateElements()
    this.updateElementOffsets()
    this.transformElements({transition: true})
  }

  updateScroll() {
    this.instance.scroll.y = window.scrollY;
    this.instance.scroll.x = window.scrollX;
  }

  updateElements(){
    this.elements.forEach(current=> current.update())
  }

  updateElementOffsets(){
    let scrollTop = this.instance.scroll.y
    let scroll = 0
    do{
      this.transformElements({scrollTop: scroll,update: false})
      scroll += 1
    }while(scroll < scrollTop)
  }

  // TRANSFORM ---------------------------

  transformElements(props = {}){

    let scroll = {}
    let update = props.update || true
    let transition = props.transition || false
    let instance = this.instance
    let elements = props.element ? [props.element] : this.elements

    scroll.top = props.scrollTop || instance.scroll.y
    scroll.bottom = scroll.top + this.windowHeight

    elements.forEach((current, i)=>{

      let bottom = current.bottom + current.offset

      let view = {
        rendered: current.top - current.padding <= scroll.top && bottom + current.padding > scroll.top,
        visible: current.top <= scroll.top && bottom > scroll.top
      }

      if (view.rendered){

        let scrolled = scroll.top - current.top
        let distance = {x:0,y:0}
        let offset = 0

        if (current.parallax){

          let pOffset = Math.max(scrolled - current.parallax.offset,0)
          if (current.parallax.duration) pOffset = Math.min(pOffset,current.parallax.duration)
          distance.y = pOffset * current.parallax.speed.y
          distance.x = pOffset * current.parallax.speed.x
          offset = distance.y
        }

        if (current.sticky){
          let sOffset = Math.min(Math.max(scrolled - current.sticky.offset,0),current.sticky.duration)
          distance.y += sOffset - current.sticky.position
          offset = distance.y
        }

        if (current.scroll){
          distance.y -= scroll.top + distance.y
        }

        if (update) {

          if (current.styles){
            let styles = current.styles
            let end = styles.end ? bottom - styles.end : this.instance.limit

            if (!styles.active && scroll.top >= styles.start && scroll.top <= end){
              styles.target.style.cssText = styles.css
              current.styles.active = true
            }
            if (styles.active && (scroll.top < styles.start || scroll.top > end)){
              styles.target.style.cssText = ''
              current.styles.active = false
            }

          }

          if (current.onScroll){
            current.onScroll({
              scroll: instance.scroll,
              delta: instance.delta,
              scrolled: scrolled,
              percent: Math.min(Math.max((scroll.top - current.top) / (bottom - current.top),0), 1),
              entering: bottom > scroll.bottom,
              onScreen: bottom < scroll.bottom,
              leaving:current.top < scroll.top
            })
          }

          if (current.transform){
            current.el.style.transition = transition ? 'transform 1s' : ''
            this.transform(current.el, distance.y,distance.x)
          } else {
            console.log(current)
          }
        }

        current.offset = offset

      }

      if (update){
        if (current.onVisible && view.visible !== current.view.visible){
          current.onVisible(view.visible)
        }
        if (current.onRender && view.rendered !== current.view.rendered){
          current.onRender(view.rendered)
        }
      }

      current.view = view

    })
  }


  // SET ----------------------------------
  setScrollLimit() {
    this.instance.limit = this.el.offsetHeight - this.windowHeight;
  }

  // TRANSFORM ----------------------------
  transform(el,y = 0,x = 0){
    let transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
    el.style.webkitTransform = transform;
    el.style.msTransform = transform;
    el.style.transform = transform;
  }

}
