/* AuW3.JS 0.1.0 December 2017 https://github.com/nathanielwiley/AuW3 */
/* Dependent on W3.JS https://www.w3schools.com/w3js/ by w3schools.com  */
;"use strict";
if(typeof(w3) === 'object'){
	var AuW3 = {
		tasks:{
			click:{hide:'',show:'','toggle-show':'',style:'','add-class':'','remove-class':'','toggle-class':''},
			input:{'filter-html':''}
		},
		mapping:{
			click:{hide:'hide',show:'show','toggle-show':'toggleShow',style:'addStyle','add-class':'addClass','remove-class':'removeClass','toggle-class':'toggleClass'},
			input:{'filter-html':'filterHTML'}
		},
		useSimpleArgs:['hide','show','toggle-show'],
		readTasks:function(event){
			for(var i in AuW3.tasks[event.type]){
				AuW3.tasks[event.type][i] = event.target.getAttribute('auw3-'+i);
			}
		},
		runTasks:function(event){
			AuW3.readTasks(event);
			for(var i in AuW3.tasks[event.type]){
				AuW3.runTask(event.type,i,event.target.value);
			}
		},
		runTask:function(category,name,value){
			var taskQ = AuW3.tasks[category][name];
			if(taskQ !== null && typeof(taskQ) === 'string'){
				var taskA = taskQ.split(';');
				for(var i in taskA){
					var simpleArgs = taskA[i];
					var complexArgs = simpleArgs.split(',');
					if(AuW3.useSimpleArgs.indexOf(name) > -1){
						w3[AuW3.mapping[category][name]](simpleArgs);
					} else if(name === 'filter-html'){
						w3[AuW3.mapping[category][name]](complexArgs[0],complexArgs[1],value);
					} else {
						w3[AuW3.mapping[category][name]](complexArgs[0],complexArgs[1],complexArgs[2]);
					}
				}
			}
		}
	};
	document.body.addEventListener('click',function(event){ AuW3.runTasks(event); });
	document.body.addEventListener('input',function(event){ AuW3.runTasks(event); });
}
