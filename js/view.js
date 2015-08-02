/***************************************************************************
 This file is resposible for rendering the html elements , creating page list
 & favorite list.
****************************************************************************/

"use strict"

function fbSearchView() {
  this.ViewEle = document.getElementById('views');
  this.storage = window.localStorage;
  this.favoritelist = [];
  this.init();
};

fbSearchView.prototype.init = function() {
  if (typeof this.storage['favlist'] != 'undefined') {
     this.favoritelist = JSON.parse(this.storage['favlist'])
  } else {
    this.favoritelist = [];
  }
}

fbSearchView.prototype.render = function() {
  this.ViewEle.innerHTML = this.template();
  this.listRootEle = document.getElementById('list-root');
  this.inputEle = document.getElementById('search-input');
  this.searchBt = document.getElementById('search');
  this.favoriteBt = document.getElementById('favorite');
  this.favoritListEle = document.getElementById('fav-list');
  this.favContainer = document.getElementById('view-fav');
  this.favBack = document.getElementById('fav-back');
  this.pageViewContainer  = document.getElementById('page-view');
  this.clearBt = document.getElementById('searchclear');

  if(this.favoritelist.length < 1 ) {
    this.favoriteBt.disabled = true;
  }
 
  this.bindEvents();
  return this;
};

fbSearchView.prototype.bindEvents = function() {
  this.searchBt.addEventListener("click", this.getSearchvalue.bind(this));
  this.favoriteBt.addEventListener("click", this.createFavoriteList.bind(this));
  this.favBack.addEventListener("click",this.hidefavlist.bind(this));
  this.favBack.addEventListener("click",this.hidefavlist.bind(this));
  this.clearBt.addEventListener("click",function() {
    this.inputEle.value = '';
  }.bind(this));
};

fbSearchView.prototype.getSearchvalue = function() {
  this.hidefavlist();
  if(this.inputEle.value && this.inputEle.value != '') {
    fbsearchController.searchPage(this.inputEle.value);
  }
};

fbSearchView.prototype.createFavoriteList = function() {
  this.showfavlist();
  for(var i in  this.favoritelist) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href ='https://en.wikipedia.org/wiki/Uniform_resource_locator';
    a.innerHTML = this.favoritelist[i];
    li.appendChild(a);
    this.favoritListEle.appendChild(li);
  }
};

fbSearchView.prototype.showfavlist = function() {
  this.favoritListEle.innerHTML = '';
  this.favContainer.style.display = 'block';
  this.pageViewContainer.style.display = 'none';
};

fbSearchView.prototype.hidefavlist = function() {
   this.pageViewContainer.style.display = 'block';
   this.favContainer.style.display = 'none';
};

fbSearchView.prototype.createListElement = function(data) {
  if(data == null) {
    this.listRootEle.innerHTML = 'Search not found';
    return
  } else if ( this.listRootEle.innerHTML == 'Search not found') {
    this.listRootEle.innerHTML = '';
  }
  var self = this;
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href ='https://en.wikipedia.org/wiki/Uniform_resource_locator';
  a.innerHTML = data.title;
  li.appendChild(a);

  var fv = document.createElement('div');
  if(this.favoritelist.indexOf(data.url) != -1) {
    fv.classList.add('favorite');
  } else {
    fv.classList.add('unfavorite');
  }
  
  fv.dataset.url = data.url;
  li.appendChild(fv);

  fv.onclick = function(evt) {
   var ele = evt.target;
   if(ele.classList.contains('unfavorite')) {
      ele.classList.remove('unfavorite');
      ele.classList.add('favorite');
      self.favoritelist.push(ele.dataset.url);
      self.favoriteBt.disabled = false;
      self.storage["favlist"] = JSON.stringify(self.favoritelist);
   } else {
     ele.classList.remove('favorite');
     ele.classList.add('unfavorite');
     var index = self.favoritelist.indexOf(ele.dataset.url);
     if(index!=-1) {
       self.favoritelist.splice(index, 1);
       if (self.favoritelist.length < 1) {
         self.favoriteBt.disabled = true;
       }
       self.storage["favlist"] = JSON.stringify(self.favoritelist);
     }
   }
  }

  var pageUrl = document.createElement('p');
  pageUrl.textContent = data.url;
  li.appendChild(pageUrl);

  var pageInfo = document.createElement('p');
  pageInfo.textContent = data.description;
  li.appendChild(pageInfo);


  this.listRootEle.appendChild(li);
};

fbSearchView.prototype.template =  function() {
  return '<div id="page-view">' +
  '<form id="views-search">' + 
      '<p>' +
        '<button id="searchclear" type="reset">clear</button>' + 
        '<input id="search-input" type="text" placeholder="Search page">' +
        '<button id="search" type="reset">search</button>' + 
        '<button id="favorite" type="reset">favorites</button>' + 
      '</p>' +
    '</form>' + 
    '<ul id="list-root">'+
    '</ul>' +
    '</div>' +
    '<div id="view-fav">'+
    '<button id="fav-back">Back</button>' +
    '<ul id="fav-list">'+
    '</ul>' +
    '</div>';
};