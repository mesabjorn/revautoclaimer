class RevObserver{
	constructor(){
		this.observing = []
	}
	
	AddObserverToElement(t){
		let observer = new MutationObserver((mutations) => {
			mutations.forEach((m) => {
				if(m.addedNodes.length>0){
					var node = m.addedNodes[0];
					if(node.nodeName=="A"){
						//console.log({"node":node} );
						//console.log("Found new jobs..clicking on "+node);
						node.click();
					}
				}
				if(t=="table find-work-projects"){
					//console.log("observed mutation in target "+t);
					//console.log({m:m,t:t});
					if(m.type=="childList"){return}
					let projects = document.getElementsByClassName("find-work-row");
					for(let i = 1;i< projects.length;i++){
						//p=projects[i];		
						let proj = {project:projects[i].innerText.split("\n")};
						this.addProject(proj);
						//console.log({project:proj});
						
						projects[i].childNodes[0].click()		//click project
						//document.getElementsByClassName("btn btn-std project-claim-btn")[0].click(); //claim it
						
					}
				}
			});
		});
		let target = document.getElementsByClassName(t)[0];
		let observerConfig = {subtree: true, childList: true,characterData:true};
		observer.observe(target, observerConfig);
		this.observing.push({observer:observer,target:target});
	}
		
	printObservingElements(){
		for(let i=0;i<this.observing.length;i++){
			console.log(`Observing ${this.observing[i].target.outerHTML}`);
		}
	}
	
	addProject(p){		
		chrome.storage.local.get({projects:[]},function(items){
			let projects = items.projects;
			p.date=new Date().toLocaleString();
			projects.push(p);
			chrome.storage.local.set({projects:projects}, function(){
				console.log(`Wrote ${projects.length} project(s) to storage.`);
			});
		});		
	}
}

o = new RevObserver();
o.AddObserverToElement("projects-banner");
o.AddObserverToElement("table find-work-projects");

console.log("Added rev crawler!")