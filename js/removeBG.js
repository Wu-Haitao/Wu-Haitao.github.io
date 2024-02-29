window.onload = function(){
    if(/(Android|webOS|iPhone|iPod|iPad|BlackBerry)/i.test(navigator.userAgent)) {
        var _element = document.getElementById("web_bg");
        var _element_header = document.getElementById("page-header");
        var _element_foot = document.getElementById("footer");
        if (_element != null) {
            _element.parentNode.removeChild(_element);
            _element_header.style.backgroundImage = null;
            _element_header.classList.add("mobile");
            _element_foot.style.backgroundImage = null;
            _element_foot.classList.add("mobile");
        }
    }
}