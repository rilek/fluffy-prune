/**
 * Simple library made for utility reasones. 
 */

var R = {};

(function () {

  // Initial configuration
  R.options = {
    "closeButton": false,
    "newestOnTop": false,
    "positionClass": "assert-bottom-right",
    "showDuration": 5000,
    "hideDuration": 1000,
    "hideEasing": "ease-in",

  }

  /**
   * Function assert checks boolean value and returns message
   * @param  {bool}     value     Expression to test
   * @param  {string}   message   Message to show
   */

    R.assert = function(value, message) {
      var results = document.getElementById('results');
      var li = document.createElement('li');
      var text = document.createTextNode(message);
      
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

      hideAssert(li, R.options.showDuration, R.options.hideDuration);

      results.appendChild(li);

      return;
    };

  //Funkcja zamieniająca zagniezdzone ul na menu wielopoziomowe
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
      document.getElementById('menu').addEventListener(event, toggleMenu, false);
    };


  //dodaj event
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


  R.setAttributes = function(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };


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


  function hideAssert(elem, showTime, hideTime) {
    setTimeout(function(){ 
      elem.style.opacity = 0;
    }, showTime);

    setTimeout(function(){ 
      elem.parentNode.removeChild(elem);
    }, showTime + hideTime); 
  }



  R.assert(true,'TEST');



})();
