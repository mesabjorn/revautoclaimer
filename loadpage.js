dummy=-1;

class ListViewer{
	constructor(){
		this.searchbar = document.getElementById("searchbar");
		this.searchbar.addEventListener("keyup",()=>{
			this.filterTracks();
		});
		//this.clearProjects();
		this.getProjects();
		
		let ths = document.getElementsByTagName("th");
		for(let t of ths){t.addEventListener("click",this.sortColumn.bind(this))};
	}
	
	getProjects() {
		parent=this;
		chrome.storage.local.get({projects:[]},function(items){						
			parent.showProj(items.projects);
		});
	}
	
	trimProjects(slicecount){				
		chrome.storage.local.get({projects:[]},function(items){			
			console.log(items.projects);
			let projects = items.projects.slice(-slicecount);
						
			chrome.storage.local.set({projects:projects}, function(){
				console.log(`Sliced last ${slicecount} of project list!`);
			});
		});		
	}
	
	
	clearProjects(){				
		chrome.storage.local.get({projects:[]},function(items){			
			console.log(items.projects);
			let projects = items.projects;
			
			projects = [];
			chrome.storage.local.set({projects:projects}, function(){
				console.log(`Emptied project list!`);
			});
		});		
	}
	
	addFakeProjects(){		
		let p = {project:["NEWRichard Houghton", "01:57", "$4.52", "$2.32", "Portuguese (Brazil)", "1h 10m", "Sep 08 13:18"],date:new Date().toLocaleString()};
		chrome.storage.local.get({projects:[]},function(items){
			console.log(items.projects);
			let projects = items.projects;
			projects.push(p);			
			chrome.storage.local.set({projects:projects}, function(){
				console.log(`Wrote ${projects.length} project(s) to storage.`);
			});
		});
	}

	showProj(projlist){		
		
		let list = document.getElementsByTagName("tbody")[0];
		list.innerHTML="";
		projlist = projlist.reverse()
		console.log(projlist);
		if(projlist.length==0)return;
		for(let i = 0; i<Math.min(projlist.length,100); i++){
			let proj = projlist[i];
			
			var row = list.insertRow(-1);
			
					
			let track = unescape(projlist[i].listname).split("-")
			
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			var cell7 = row.insertCell(6);
			var cell8 = row.insertCell(7);
			
			cell1.innerHTML = proj.date;
			cell2.innerHTML = proj.project[0].replace("NEW","(NEW) ");
			cell3.innerHTML = proj.project[1];
			cell4.innerHTML = proj.project[2];
			cell5.innerHTML = proj.project[3];
			cell6.innerHTML = proj.project[4];
			cell7.innerHTML = proj.project[5];
			cell8.innerHTML = proj.project[6];
		}
	}
	
	whichChild(elem){
		var  i= 0;
		while((elem=elem.previousElementSibling)!=null) ++i;
		return i;
	}
	
	sortColumn(e){		
		this.sortTable(this.whichChild(e.target));
	}
	
	sortTable(n) {	  
	if(n==3){
		//sorting by pay
	}
	  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	  table = document.getElementById("listcontainer");
	  switching = true;
	  // Set the sorting direction to ascending:
	  dir = "asc";
	  /* Make a loop that will continue until
	  no switching has been done: */
	  while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length-1); i++) {
		  // Start by saying there should be no switching:
		  shouldSwitch = false;
		  /* Get the two elements you want to compare,
		  one from current row and one from the next: */
		  x = rows[i].getElementsByTagName("TD")[n];
		  y = rows[i + 1].getElementsByTagName("TD")[n];
		  /* Check if the two rows should switch place,
		  based on the direction, asc or desc: */
		  //console.log(x);
		  console.log(y);
		  if (dir == "asc") {
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			  // If so, mark as a switch and break the loop:
			  shouldSwitch = true;
			  break;
			}
		  } else if (dir == "desc") {
			if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			  // If so, mark as a switch and break the loop:
			  console.log({x:x,y:y});
			  dummy={x:x,y:y};
			  shouldSwitch = true;
			  break;
			}
		  }
		}
		if (shouldSwitch) {
		  /* If a switch has been marked, make the switch
		  and mark that a switch has been done: */
		  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		  switching = true;
		  // Each time a switch is done, increase this count by 1:
		  switchcount ++;
		} else {
		  /* If no switching has been done AND the direction is "asc",
		  set the direction to "desc" and run the while loop again. */
		  if (switchcount == 0 && dir == "asc") {
			dir = "desc";
			switching = true;
		  }
		}
	  }
	}


	filterTracks(){
		//to be implemented still
		return;
		var results = 0;
		let query = document.getElementById("searchfield").value.toLowerCase().trim();
		let UserIsSearching=true;
				  	
		console.log("finished searching "+searchResult.length+" results!");
	}
	
}

		
document.addEventListener('DOMContentLoaded', function() {
	L = new ListViewer();	
});

