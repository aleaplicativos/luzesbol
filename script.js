let s = document.querySelectorAll('.solid')
const light = document.querySelector('#light'),
      solid_width = 100,
      solid_half = solid_width * .5,
      light_width = 50,
      light_half = light_width * .5

function setSolidsLocations() {
  for(var i=0;i<s.length;i++) {
    s[i].style.setProperty('--solid-size', Math.floor(Math.random()*100) + 25 + 'px')
    s[i].style.left = Math.floor(Math.random()*50) + 25 + '%'
    s[i].style.top = Math.floor(Math.random()*50) + 25 + '%'
  }
}
setSolidsLocations()

function getDistance(x1, y1, x2, y2){
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

function moveLight(e){
  var x = e.clientX,
      y = e.clientY,
      dist = []

  light.style.left = x - light_half + 'px'
  light.style.top = y - light_half + 'px'

  s.forEach(function(elm){
    elm.style.zIndex = ''
    var elm_loc = elm.getBoundingClientRect(),
        elm_x = elm_loc.x + (elm_loc.width * .5),
        elm_y = elm_loc.y + (elm_loc.width * .5),
        vector = { x: x - elm_x, y: y - elm_y },
        angle = Math.atan2(vector.y, vector.x) * (180 / Math.PI) + 90

    dist.unshift(getDistance(x,y,elm_x,elm_y))   

    elm.style.setProperty('--shadow-rot', 'rotate('+angle+'deg)')
  })
  s[dist.indexOf(Math.min(...dist))].style.zIndex = '-1'   
}

window.addEventListener('mousemove', moveLight)
window.addEventListener('click', setSolidsLocations)