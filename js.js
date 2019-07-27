var changeTab;

(function(){

  HTMLElement.prototype.setupClassCache = function() {
    this.classCache = {};
    var classes = this.className.split(" ");
    for ( var i = 0; i < classes.length; i++ ){
      this.classCache[ classes[i] ] = true;
    };
    return this;
  }

  HTMLElement.prototype.removeClass = function(klass) {
    if ( !this.classCache ) this.setupClassCache();
    if ( this.className === '' || !this.classCache[klass] ) return;
    var klassName = "";
    delete this.classCache[klass];
    for ( var i in this.classCache ) klassName += i; 
    this.className = klassName;
  }

  HTMLElement.prototype.addClass = function(klass) {
    if ( !this.classCache ) this.setupClassCache();
    if( this.classCache[klass] ) return;
    var klassName = "";
    this.classCache[klass] = true;
    for ( var i in this.classCache ) klassName += i+' '; 
    this.className = klassName;
  }

  var nav            = document.getElementById("top-nav").setupClassCache();
  var scrollPosition = document.getElementsByTagName("header")[0].offsetHeight;
  var tabs           = document.getElementsByClassName("tab-section");

  changeTab = function(el) {
    for ( var i = 0; i < tabs.length; i++ ) {
      tabs[i].style.display = ( tabs[i].id === "tab-"+el.value ) ? "block" : "none";
    }
  }

  document.onscroll = function(){
    if ( window.pageYOffset >= scrollPosition ) nav.addClass('fixed');
    else nav.removeClass('fixed');
  };

})();