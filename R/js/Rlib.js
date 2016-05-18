/**
 * Simple library made of utility reasones. 
 */

var R = {};

(function () {

// Initial configuration
R.options = {
  "closeButton": false,
  "newestOnTop": false,
  "positionClass": "assert-top-right",
  "showDuration": 5000,
  "hideDuration": 800,
  "hideEasing": "ease-in",
};


/**
 * Function assert checks boolean value and returns message
 * @param  {bool}     value     Expression to test
 * @param  {string}   message   Message to show
 */
R.assert = function(value, message) {
  var results = document.getElementById('results');
  var li = document.createElement('li');
  var text = document.createTextNode(message);
  var timeOutId;
  
  if(results === null) {
    results = document.createElement('ul');
    results.className = R.options.positionClass;
    results.id = 'results';
    document.getElementsByTagName('body')[0].appendChild(results);
  }

  li.appendChild(text);
  li.className = (value ? 'pass' : 'fail');
  li.style.transition =  
    R.options.hideDuration + 
    "ms opacity " +
    R.options.hideEasing;

  timeoutId = setTimeout(function () {
    hideAssert(li, R.options.hideDuration);
  }, R.options.showDuration);

  R.addEvent(li, 'click', function () {
    clearTimeout(timeoutId);
    hideAssert(li, R.options.hideDuration);
  }, false);


  R.options.newestOnTop ? 
    results.appendChild(li) :
    results.insertBefore(li, results.firstChild);


  return;
};


/**
 * createMenu changes nested /ul/ tags into drop-down menu
 * @param  {Event}   event  What the was that for?
 */
R.createMenu = function(event) {
  var list = document.getElementsByTagName('ul');

  for(var i = 0; i < list.length; i++) {
    var parent = list[i].parentNode;
    if(parent.nodeName == 'LI') {
      var sign = document.createTextNode('+ ');
      parent.firstChild
      .insertBefore(sign,parent.firstChild.childNodes[0]);
      parent.className = 'node';
      list[i].style.display = 'none';
    }
  }

  var toggleMenu = function(e) {

    var t = e.target.parentNode;
    var tc = t.className;
    if(tc.indexOf('node') != -1) {
      var a = t.childNodes[0].innerHTML;
      var menuList = t.childNodes[2];
      menuList.style.display = 
      (menuList.style.display == 'none') ? 'block' : 'none';
      R.assert(true, 'a');

      t.childNodes[0].innerHTML = 
      (a.indexOf('+') != -1) ? 
      a.replace('+', '-') : 
      a.replace('-','+');

      e.preventDefault();
    }
  };
  document.getElementById('menu')
  .addEventListener(event, toggleMenu, false);
};


/**
 * Multi-browser method to add event listener
 * @param {DOM}       obj          HTML DOM object
 * @param {String}    evType       type of event to listen to
 * @param {Function}  fn           callback function
 * @param {Boolean}   useCapture   wheater to use capture
 */
R.addEvent = function(obj, evType, fn, useCapture){
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be attached");
  }
}


/**
 * Add attributes to HTML DOM object
 * @param {DOM}     el      DOM element to add attributes
 * @param {Object}  attrs   Object filled with attributes to add
 *                          { attribute: 'value' }
 */
R.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};


/**
 * Pure JS function to animate things
 * @param  {DOM}      elem    DOM element to animate
 * @param  {CSS}      style   [description]
 * @param  {Integer}  to      [description]
 * @param  {Integer}  time    [description]
 * @param  {String}   unit    [description]
 * @param  {Integer}  from    [description]
 */
R.animate = function (elem,style,to,time,unit,from) {
  if( !elem) return;
  var start = new Date().getTime();
  var timer = setInterval(function() {
    var step = Math.min(1,(new Date().getTime()-start)/time);
    elem.style[style] = (from+step*(to-from)) + unit;
    if(step == 1) clearInterval(timer);
  },25);
  elem.style[style] = from+unit;
}


/**
 * Hide assert result
 * @param  {DOM}      elem      /li/ element
 * @param  {Integer}  hideTime  time (ms) after which elem will be deleted
 */
function hideAssert(elem, hideTime) {
  elem.style.opacity = 0;
  elem.timeOutId = setTimeout(function(){ 
    elem.parentNode.removeChild(elem);
  }, hideTime);
}
})();
