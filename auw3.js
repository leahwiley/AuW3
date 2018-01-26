/* AuW3.JS January 2018 https://github.com/nathanielwiley/AuW3 */
/* Dependent on W3.JS https://www.w3schools.com/w3js/ by w3schools.com  */
;"use strict";
if(typeof(w3) === 'object'){
	var AuW3 = AuW3 || (function(){
		var v='0.7.0',oTasks = {},aSlideShows=[],slideShowIndex={},oHttpObjects={};
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
		function runTasks(event){
			readTasks(event);
			for(var i in oTasks[event.type]){
				runTask(event.type,i,event.target.value);
			}
		}
		function init(){
			if(w3.getElements('[w3-include-html]').length){
				w3.includeHTML(includeCallback());
			} else {
				includeCallback();
			}
		}
		function includeCallback(){
			var dspObjs = w3.getElements('[auw3-display-object]');
			dspObjs.forEach(function(el){
				var dspData = {}, kvPairs = el.getAttribute('auw3-display-object').split(',');
				for(var i in kvPairs){
					var kvPair = kvPairs[i].split(':');
					dspData[kvPair[0]] = eval(kvPair[1]);
				}
				w3.displayObject(el.id,dspData);
			});
			var dspHttp = w3.getElements('[auw3-display-http]');
			dspHttp.forEach(function(el){
				w3.getHttpObject(el.getAttribute('auw3-display-http'),function(data){w3.displayObject(el.id,data)});
			});
			if(w3.getElements('.AuW3-auto-slide').length) AuW3.slideshow('.AuW3-auto-slide');
			if(w3.getElements('.AuW3-auto-hide').length) w3.hide('.AuW3-auto-hide');
			for(var i in oTasks){
				document.body.addEventListener(i,function(event){ runTasks(event); });
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
		init();
		return {
			version:function(){ return v; },
			HttpObjects: function(k){
				return (typeof(k) === 'string' && oHttpObjects.hasOwnProperty(k))? oHttpObjects[k] : oHttpObjects;
			},
			getHttpObject: function(src){
				var srcKey = src || Date.now().toString();
				srcKey = srcKey.replace('.','-');
				try{ w3.getHttpObject(src, function(data){oHttpObjects[srcKey] = data;}); return srcKey; } catch (err) { return null; }
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
			SlideShows: function(i){ return (typeof(i) === 'number' && i < aSlideShows.length && i > -1)? aSlideShows[i] : aSlideShows; }
		};
	})();
}
