/* AuW3.JS 0.0.1 December 2017 https://github.com/nathanielwiley/AuW3 */
/* Dependent on W3.JS https://www.w3schools.com/w3js/ by w3schools.com  */
;"use strict";
var AuW3 = AuW3 || (function(){
	document.body.addEventListener('click',function(event){
		if(event.target.classList.contains('AuW3')){
			var aActions = event.target.getAttribute('data-auw3').split('|');
			for(var i in aActions){
				var thisAction = aActions[i].split('=');
				var aTasks = thisAction[1].split(';');
				var verb = thisAction[0];
				for(var j in aTasks){
					var args = aTasks[j].split(',');
					if(verb === 'v-') w3.hide(aTasks[j]);
					if(verb === 'v+') w3.show(aTasks[j]);
					if(verb === 'vt') w3.toggleShow(aTasks[j]);
					if(verb === 's+') w3.addStyle(args[0],args[1],args[2]);
					if(verb === 'c-') w3.removeClass(args[0],args[1]);
					if(verb === 'c+') w3.addClass(args[0],args[1]);
					if(verb === 'ct') w3.toggleClass(args[0],args[1],args[2]);
				}
			}
		}
	});
	document.body.addEventListener('input',function(event){
		if(event.target.classList.contains('AuW3')){
			var aActions = event.target.getAttribute('data-auw3').split('|');
			for(var i in aActions){
				var args = aActions[i].split(',');
				w3.filterHTML(args[0],args[1],event.target.value);
			}
		}
	});
})();