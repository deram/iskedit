var SVG;
var SVG_HEAD;
var SVG_TEXT;
var INPUT_TEXT;
var INPUT_HEAD;
var CODE;
var SERIALIZE;

var svgNS = "http://www.w3.org/2000/svg";
var xmlNS = "http://www.w3.org/XML/1998/namespace";

function prepare(){
  INPUT_TEXT=document.getElementById("text");
  INPUT_TEXT.addEventListener('input', update, false);
  INPUT_TEXT.wrap='off';
  INPUT_HEAD=document.getElementById("head");
  INPUT_HEAD.addEventListener('input', update, false);
  INPUT_HEAD.wrap='off';
  CODE=document.getElementById("code");

  SERIALIZE = new XMLSerializer();

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

function create_emphasis_tspan(text) {
  var tspan = document.createElementNS(svgNS, "tspan");
  tspan.appendChild(SVG.createTextNode(text));
  tspan.setAttributeNS(null, "fill", "#FF5500");
  return tspan;
}

function create_line_tspan(text) {
  var array=text.split(/<([^>]*)>/g);
  var tspan = document.createElementNS(svgNS, "tspan");
  tspan.setAttributeNS(xmlNS, "xml:space", "preserve");
  for (var i in array) {
    if (i%2) {
      if (array[i]) tspan.appendChild(create_emphasis_tspan(array[i]));
    } else {
      if (array[i]) tspan.appendChild(SVG.createTextNode(array[i]));
    }
  }
  tspan.appendChild(SVG.createTextNode(" "));
  return tspan;
}

function set_multiline_text(output, input) {
  var linearray=input.value.split(/\r\n|\n|\r/);
  clear_element(output);
  var x=output.getAttributeNS(null, "x")
  for (var i in linearray) {
    var tspan = create_line_tspan(linearray[i]);
    if (i > 0) tspan.setAttributeNS(null, "dy", "1em");
    tspan.setAttributeNS(null, "x", x);
    output.appendChild(tspan);
  }
}



function update(){
  set_multiline_text(SVG_HEAD, INPUT_HEAD);
  set_multiline_text(SVG_TEXT, INPUT_TEXT);
  CODE.value=SERIALIZE.serializeToString(SVG);
}

function onload() {
  prepare();
  update();
};

window.addEventListener ?  window.addEventListener("load",onload,false) : 
window.attachEvent && window.attachEvent("onload",onload);
