/* AuW3.JS January 2018 https://github.com/nathanielwiley/AuW3 */
/* Dependent on W3.JS https://www.w3schools.com/w3js/ by w3schools.com  */
;"use strict";
if(typeof(w3) === 'object'){
	var AuW3 = AuW3 || (function(){
		var v='0.4.0',oTasks = {},aSlideShows=[],slideShowIndex={};
		function buildTask(category,name,simpleArgs,map,useValue,slideShow){
			name = name || '';
			map = map || name;
			slideShow = (typeof(slideShow) === 'boolean')? slideShow : false || false;
			if(w3.hasOwnProperty(map) || slideShow){
				name = name.toLowerCase();
				category = category || 'click';
				category = category.toLowerCase();
				simpleArgs = (typeof(simpleArgs) === 'boolean')? simpleArgs : false || false;
				useValue = (typeof(useValue) === 'boolean')? useValue : false || false;
				if(!oTasks.hasOwnProperty(category)) oTasks[category] = {};
				oTasks[category][name] = { v:'', simple:simpleArgs, value:useValue, slide:slideShow, map:map };
			}
		}
		function readTasks(event){
			for(var i in oTasks[event.type]){
				oTasks[event.type][i].v = event.target.getAttribute('auw3-'+i);
			}
		}
		function runTask(category,name,value){
			var thisTask = oTasks[category][name];
			var taskQ = thisTask.v;
			if(taskQ !== null && typeof(taskQ) === 'string'){
				var taskA = taskQ.split(';');
				for(var i in taskA){
					var simpleArgs = taskA[i];
					var complexArgs = simpleArgs.split(',');
					if(thisTask.slide){
						var thisShowIndex = slideShowIndex[complexArgs[0]] || 0;
						var thisShow = aSlideShows[thisShowIndex];
						if(thisTask.map === 'speed'){
							var stopped = (thisShow.milliseconds === 0)? true : false;
							thisShow.milliseconds = (thisTask.value)? Number(value) : Number(complexArgs[1]);
							if(stopped || thisTask.value) thisShow.start();
						} else if(thisTask.map === 'set'){
							var slideNumber = (thisTask.value)? Number(value) : Number(complexArgs[1]);
							if(slideNumber < 1 || slideNumber > thisShow.x.length) slideNumber = 1;
							thisShow.current = slideNumber;
							thisShow.start();
						} else if(thisTask.map === 'stop'){
							thisShow.milliseconds = 0;
						} else {
							if(thisShow.milliseconds === 0 && thisTask.map === 'start') thisShow.milliseconds = 1000;
							thisShow[thisTask.map]();
						}
					} else if(thisTask.simple){
						w3[thisTask.map](simpleArgs);
					} else if(thisTask.value){
						w3[thisTask.map](complexArgs[0],complexArgs[1],value);
					} else {
						w3[thisTask.map](complexArgs[0],complexArgs[1],complexArgs[2]);
					}
				}
			}
		}
		/*	START Behavior Definitions	*/
		buildTask('input','filter-html',false,'filterHTML',true);
		buildTask('click','hide',true);
		buildTask('click','show',true);
		buildTask('click','toggle-show',true,'toggleShow');
		buildTask('click','style',false,'addStyle');
		buildTask('click','add-class',false,'addClass');
		buildTask('click','remove-class',false,'removeClass');
		buildTask('click','toggle-class',false,'toggleClass');
		buildTask('click','sort-html',false,'sortHTML');
		buildTask('click','slide-start',false,'start',false,true);
		buildTask('click','slide-previous',false,'previous',false,true);
		buildTask('click','slide-next',false,'next',false,true);
		buildTask('click','slide-stop',false,'stop',false,true);
		buildTask('click','slide-speed',false,'speed',false,true);
		buildTask('click','slide-set',false,'set',false,true);
		buildTask('change','slide-speed',false,'speed',true,true);
		buildTask('change','slide-set',false,'set',true,true);
		/*	END Behavior Definitions	*/
		return {
			version:function(){ return v; },
			state:function(){ return oTasks; },
			runTasks:function(event){
				readTasks(event);
				for(var i in oTasks[event.type]){
					runTask(event.type,i,event.target.value);
				}
			},
			hasClass:function(el,className){
				var has = false;
				className = className || '';
				if(el && el.className && typeof(el.className) === 'string'){
					var aClasses = el.className.split(' ');
					has = (aClasses.indexOf(className) > -1)? true : false;
				}
				return has;
			},
			slideshow:function(selector,interval){
				var show = w3.slideshow(selector,interval);
				slideShowIndex[selector] = aSlideShows.length;
				aSlideShows.push(show);
				return show;
			},
			SlideShows: function(){ return aSlideShows; }
		};
	})();
	for(var i in AuW3.state()){
		document.body.addEventListener(i,function(event){ AuW3.runTasks(event); });
	}
	if(w3.getElements('.AuW3-auto-slide').length) AuW3.slideshow('.AuW3-auto-slide');
	if(w3.getElements('.AuW3-auto-hide').length) w3.hide('.AuW3-auto-hide');
	if(w3.getElements('[w3-include-html]').length) w3.includeHTML();
}
