/***************************************************************************
 This file is resposible for getiing urls from dummy json & sorting them.
 This also prepares data for view to create list elements
****************************************************************************/
"use strict"

function ContollerfbSearch() {

  this.view;
  this.pages = JsonData.pages;
  this.createView();
};

ContollerfbSearch.prototype.createView = function() {
 this.view = new fbSearchView().render();
 
};

ContollerfbSearch.prototype.searchPage = function(val) {
  var urls = [];
  var len = this.pages.length;

  for(var i = 0 ; i < len ; i++) {
  	if(this.pages[i].url.indexOf(val) > -1) {
  	  var data = {
      url: this.pages[i].url,
      index:i
     }

     urls.push(data);
  	} else {
      this.view.createListElement(null);
    }

  }

  urls.sort(function(a, b) {
    return ((a.url < b.url) ? -1 : ((a.url == b.url) ? 0 : 1));
  });
  this.updateUI(urls)
};

ContollerfbSearch.prototype.updateUI = function(searchData) {
 var self = this;

 searchData.forEach(function(data) {
    var arraObj =  self.pages[parseInt(data.index)];
    var data = {
      url: data.url,
      title: arraObj.title,
      description: arraObj.description
    }

  self.view.createListElement(data);
 });
}








