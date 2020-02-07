export function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}

export function getTranslate(el) {
    const translate = {}
    if(!window.getComputedStyle) return;

    const style = getComputedStyle(el);
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    if (!transform) return
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);

    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

    return translate;
}

export function getTop(el){
  let top = 0
  do {
    top += el.offsetTop
    el = el.offsetParent;
  } while(el)
  return top
}

export function getLeft(el){
  let left = 0
  do {
    left += el.offsetLeft
    el = el.offsetParent;
  } while(el)
  return left
}

export function isObject(obj) {
  return obj === Object(obj);
}

export function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

export function isArray(a){
  return Array.isArray(a)
}
