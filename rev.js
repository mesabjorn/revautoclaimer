class RevObserver{
	constructor(){
		this.observing = [];
		this.claim = false;
	}
	
	AddObserverToElement(t){
		let observer = new MutationObserver((mutations) => {
			mutations.forEach((m) => {						
				if(t==="table find-work-projects"){					
					//if(document.getElementsByClassName("virtuoso-container").length===0){return}					
					if(m.addedNodes.length>0){
						//console.log("Node added to target "+t);
						
//						if(m.type==="childList"){return}
						if(m.addedNodes[0].childNodes.length===0){return}
						if(m.addedNodes[0].childNodes[0].className==="table-row"){
							//console.log(m.addedNodes[0]);					
							console.log({m:m,t:t});

							let projectNodeRow = m.addedNodes[0].childNodes[0];
							let project = projectNodeRow.innerText.split("\n");
														
							this.addProject({project});
							
							projectNodeRow.getElementsByClassName("project-info")[0].click();
							
							setTimeout(()=>{
								//console.log(this);
								if(this.claim){
									let btn = document.getElementsByClassName("btn btn-std project-claim-btn")[0];
									console.log("clicked claim button:",btn);
									
									btn.click(); //claim it after 2.5s							
								}
							},2500);							
						}		
						
						/*
						let projects = document.getElementsByClassName("find-work-row");
						for(let i = 1;i< projects.length;i++){
							
							let proj = {project:projects[i].innerText.split("\n")};
							this.addProject(proj);
							console.log({project:proj});						 
							projects[i].childNodes[0].click()		//click project
							
							setTimeout(()=>{
								console.log(this);
								if(this.claim){
									//document.getElementsByClassName("btn btn-std project-claim-btn")[0].click(); //claim it after 2.5s							
								}
							},2500);
							
							//document.getElementsByClassName("btn btn-std project-claim-btn")[0].click(); //claim it
							
						
							
							
						}
						*/
					}
				}
			});
		});
		let target = document.getElementsByClassName(t)[0];
		let observerConfig = {subtree: true, childList: true};//,characterData:true};
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
			console.log("Added project: ",p)
			chrome.storage.local.set({projects:projects}, function(){
				console.log(`Wrote ${projects.length} project(s) to storage.`);
			});
		});		
	}
}

o = new RevObserver();
//o.AddObserverToElement("projects-banner");
o.AddObserverToElement("table find-work-projects");


target=document.getElementsByTagName("h5")[0];
observerConfig = {subtree: true, childList: true,characterData:true};

obs3 = new MutationObserver((mutations) => {	
	mutations.forEach((m) => {
		if(m.type==="characterData"){
			let text = m.target.textContent;
			console.log(text);
			if(text.indexOf("Click here to get the latest")>-1){
				target.click();
			}
		}
	});
});
obs3.observe(target, observerConfig);

console.log("Added rev crawler!");