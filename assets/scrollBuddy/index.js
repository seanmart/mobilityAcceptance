import Smooth from './Smooth'
import Core from './Core'
import defaults from './options'

export default class{
  constructor(options){
    this.options = options;
    Object.assign(this, defaults, options);
    this.scroll = null
    this.init()
  }

  init(){
    this.isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    this.scroll = !this.isMobile && this.smooth ? new Smooth(this.options) : new Core(this.options)
    this.scroll && this.scroll.init()
  }
  hasSmooth(){
    return !this.isMobile
  }
  pause(){
    this.scroll.stop = true
  }
  resume(){
    this.scroll.stop = false
  }

}
