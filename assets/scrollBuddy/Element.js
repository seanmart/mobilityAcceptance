import {getTranslate,getTop, getLeft, isArray, isInt, isFloat, isObject} from './utils'

export default class{
  constructor(el, params = {}){

    this.el = el
    this.target = params.target ? params.target() : null

    // position
    this.top = 0
    this.left = 0
    this.width = 0
    this.height = 0
    this.bottom = 0
    this.right = 0
    this.offset = 0

    this.data = {}
    this.view = {
      rendered: false,
      visible: false
    }

    this.transform = params.transform === undefined ? true : params.transform
    this.padding = params.padding || 0
    this.scroll = params.scroll || null
    this.onScroll = params.onScroll || null
    this.onRender = params.onRender || null
    this.onVisible = params.onVisible || null
    this.onReveal = params.onReveal || null
    this.parallax = null
    this.sticky = null

    if (params.parallax) this.data.parallax = this.sort(params.parallax)
    if (params.sticky) this.data.sticky = this.sort(params.sticky)
    if (params.styles) this.data.styles = params.styles
    this.update()
  }

  update(){
    this.getPosition()
    this.offset = 0

    if (this.data.parallax) this.updateParallax()
    if (this.data.sticky) this.updateSticky()
    if (this.data.styles) this.updateStyles()
  }

  updateParallax(){
    let data = this.findByMinimum(this.data.parallax)
    this.parallax = data ? this.setParallax(data) : null
  }

  updateSticky(){
    let data = this.findByMinimum(this.data.sticky)
    this.sticky = data ? this.setSticky(data) : null
  }

  updateStyles(){
    this.styles = {
      target: this.data.styles.target(),
      start: this.top + this.getValue(this.data.styles.start || 0),
      end: this.getValue(this.data.styles.end || null),
      css: this.data.styles.css,
      active: this.styles ? this.styles.active : false,
    }
  }

  setParallax(data = {}){
    return{
      offset: this.getValue(data.offset),
      duration: this.getValue(data.duration),
      speed:{
        x: -parseFloat((this.getValue(data.xSpeed)/10).toFixed(3)),
        y: -parseFloat((this.getValue(data.ySpeed)/10).toFixed(3))
      }
    }
  }

  setSticky(data = {}){
    return{
      offset: !data.position ? this.getValue(data.offset) : 0,
      position: this.getValue(data.position),
      duration: this.getValue(data.duration)
    }
  }

  sort(data){
    if (!isArray(data)) return [data]
    return data.sort((a,b)=>(b.min || 0) - (a.min || 0))
  }

  findByMinimum(data){
    console.log(data.min)
    return data.reduce((a,c)=> (c.min || 0) < window.innerWidth && !a ? c : a,null)
  }

  getValue(value){
    if (!value) return 0
    if (isInt(value) || isFloat(value)) return value

    let num = parseFloat(value)

    return value.indexOf('%y') !== -1
              ? num * (this.height/100)
         : value.indexOf('%x') !== -1
              ? num * (this.width/100)
         : value.indexOf('vh') !== -1
              ? num * (window.innerHeight / 100)
         : value.indexOf('vw') !== -1
             ? num * (window.innerWidth / 100)
         : value.indexOf('px') !== -1
             ? num
         : 0
  }

  getPosition(){
    let el = this.target || this.el

    let top = getTop(el)
    let left = getLeft(el)

    this.top = Math.max(top - window.innerHeight,0)
    this.left = Math.max(left - window.innerWidth,0)
    this.width = el.offsetWidth
    this.height = el.offsetHeight
    this.bottom = top + this.height
    this.right = left + this.width

  }


}
