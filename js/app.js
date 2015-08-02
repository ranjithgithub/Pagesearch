/***************************************************************************
 This file is used for starting the app.
****************************************************************************/
"use strict"
var fbsearchController;
(function(win) {
  win.onload = function start() {
   /* alert(' As Fb search API not working I have used dummy JSON, due to this please use' +
      'single character in search field');*/
    lazyload(['js/controller.js', 'js/view.js', 'dump.json'], function() {
      fbsearchController = new ContollerfbSearch();
    })
  };

  function lazyload(src_arr, callback) {
  	 if (src_arr.length < 1) {
       callback();
       return;
  	 }
      var s = document.createElement('script');
      s.async = false;
      s.src = src_arr[src_arr.length -1];
      delete src_arr.pop();
      s.onload =  function() {
         lazyload(src_arr, callback);
      }
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
  }
}(this))
