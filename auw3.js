/* AuW3.JS 0.2.2 December 2017 https://github.com/nathanielwiley/AuW3 */
/* Dependent on W3.JS https://www.w3schools.com/w3js/ by w3schools.com  */
;"use strict";
if(typeof(w3) === 'object'){
	var AuW3 = AuW3 || (function(){
		var oTasks = {};
		function buildTask(category,name,simpleArgs,map,useValue){
			name = name || '';
			map = map || name;
			if(w3.hasOwnProperty(map)){
				name = name.toLowerCase();
				category = category || 'click';
				category = category.toLowerCase();
				simpleArgs = (typeof(simpleArgs) === 'boolean')? simpleArgs : false || false;
				useValue = (typeof(useValue) === 'boolean')? useValue : false || false;
				if(!oTasks.hasOwnProperty(category)) oTasks[category] = {};
				oTasks[category][name] = { v:'', simple:simpleArgs, value:useValue , map:map };
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
					if(thisTask.simple){
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
		/*	END Behavior Definitions	*/
		return {
			state:function(){ return oTasks; },
			runTasks:function(event){
				readTasks(event);
				for(var i in oTasks[event.type]){
					runTask(event.type,i,event.target.value);
				}
			}
		};
	})();
	for(var i in AuW3.state()){
		document.body.addEventListener(i,function(event){ AuW3.runTasks(event); });
	}	
}
