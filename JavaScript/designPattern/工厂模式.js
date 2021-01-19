function pop (type,content,color) {
    if (this instanceof pop) {
        var s = new this[type](content,color);
        return s;
    } else {
        return new pop(type,content,color);
    }
}
pop.prototype.infoPop = function() {

}
pop.prototype.confirmPop=function(){
	
}
pop.prototype.cancelPop=function(){
	
}

// jquery 每个dom都是一个jq对象
(function(){
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	}
	jQuery.fn=jQuery.prototype={
		init:function(){
			
		}
	}
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend = jQuery.fn.extend = function() {
        
	}
	jQuery.extend({

	});
    window.$=jquery;
})()