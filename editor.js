var SVG;
var SVG_HEAD;
var SVG_TEXT;
var INPUT_TEXT;
var INPUT_HEAD;

var svgNS = "http://www.w3.org/2000/svg";
var xmlNS = "http://www.w3.org/XML/1998/namespace";

function prepare(){
  INPUT_TEXT=document.getElementById("text");
  INPUT_TEXT.addEventListener('input', update, false);
  INPUT_TEXT.wrap='off';
  INPUT_HEAD=document.getElementById("head");
  INPUT_HEAD.addEventListener('input', update, false);
  INPUT_HEAD.wrap='off';

  var S=document.getElementById("svg");
  try{SVG=S.contentDocument}
  catch(err){SVG=S.getSVGDocument}

  SVG_TEXT=SVG.getElementById('slide_content');
  SVG_HEAD=SVG.getElementById('header');
}

function clear_element(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function set_multiline_text(output, input) {
  var array=input.value.split(/\r\n|\n|\r/);
  clear_element(output);
  var x=output.getAttributeNS(null, "x")
  for (i in array) {
    var tspan = document.createElementNS(svgNS, "tspan");
    if (i > 0) tspan.setAttributeNS(null, "dy", "1em");
    tspan.setAttributeNS(null, "x", x);
    tspan.setAttributeNS(xmlNS, "xml:space", "preserve");
    tspan.appendChild(SVG.createTextNode(array[i] + " "));
    output.appendChild(tspan);
  }
}

function update(){
  set_multiline_text(SVG_HEAD, INPUT_HEAD);
  set_multiline_text(SVG_TEXT, INPUT_TEXT);
}

function onload() {
  prepare();
  update();
};

window.addEventListener ?  window.addEventListener("load",onload,false) : 
window.attachEvent && window.attachEvent("onload",onload);
