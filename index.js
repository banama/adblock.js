var __setAttr = Element.prototype.setAttribute;
var __createEle = Document.prototype.createElement;
var __dom_write = Document.prototype.write;
var __innerhtml = Element.prototype;
var logUrl = ADBLOCK_ADBLOCK_WORDS['log']
var WhiteList = ADBLOCK_ADBLOCK_WORDS['whitelist']

;(function(){
    eval = function(){
        log('type=unexpecteval');
    }
    // unexept alert
    alert = function(){};
})();

// waring eval
function log(params){
    var pathname = window.location.pathname;
    var logElement = document.createElement('img');
    logElement.src = logUrl + pathname + params;
    logElement.style.display = 'none';
    document.body.appendChild(logElement);
}

// get domain of uri
function domainUri(str){
    var urlReg=/http:\/\/([^\/]+)\//i;
    domain = str.toString().match(urlReg);
    return !!domain&&domain[1] ? domain[1] : ""
 }

// check if regular iframe or not
function checkIfame(element){
    // ifame rules
    if(element.getAttribute('adblock') == null){
        log('type=unexceptifame')
        element.__definedSetter__('src', function(val){
            log('type=unexceptifame&hasSrc=' + val);
        });
    }
    else{
        return element;
    }
}

function checkWhiteList(val){
    var domain = domainUri(val)
    if(!!WhiteList && WhiteList.indexOf(domain) > -1){
       return true 
    }
    return false
}

// overwrite createElement
Document.prototype.createElement = function() {
    var element = __createEle.apply(this, arguments);
    if (element.tagName.toLowerCase() == 'script') {
        element.__defineSetter__('src', function(val) {
           element.setAttribute('src', val)
        });
        return element
    }
    else if(element.tagName.toLowerCase() == 'img'){
        element.__defineSetter__('src', function(val){
            element.setAttribute('src', val)
        })
        return element
    }
    else if(element.tagName.toLowerCase() == 'iframe'){
        return checkIfame(element);
    }
    else{
        return element
    }
};

// overwrite Element
Element.prototype.setAttribute = function(name, value) {
    if(name == 'src' && !checkWhiteList(domainUri(value))){
        log('type=setAtte&content='+arguments[1])
    }
    else{
        __setAttr.apply(this, arguments);
    }
}

// overwrite write
Document.prototype.write = function(val){
    if(document.readyState == 'complete'){
        log('type=documentWriteComplete&content=' + val)
    }
    else{
        if(val.toString().indexOf('script') > -1){
            if(!checkWhiteList(val)){
                log('type=domWrite&content=' + val)
            }
            else{
                __dom_write.apply(this, arguments)
            }
        }
    }
}
