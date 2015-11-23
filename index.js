var __setAttr = Element.prototype.setAttribute;
var __create = Document.prototype.createElement;

Document.prototype.createElement = function() {
     var element = __create.apply(this, arguments);
     if (element.tagName.toLowerCase() == 'script') {
        element.__defineSetter__('src', function(url) {
            element.setAttribute('src', url)
        });
        return element
     }
    else if(element.tagName.toLowerCase() == 'iframe'){
    }
    else{
        return element
    }
};
Element.prototype.setAttribute = function(name, value) {
    if(name == 'src' && value.indexOf('http')>-1 && value.indexOf('youcdndomain') == -1){
        arguments[1] = 'http://example.com/static/warning?mayad='+arguments[1]
        __setAttr.apply(this, arguments);
    }
    else{
        __setAttr.apply(this, arguments);
    }
}
