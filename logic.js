var input = document.getElementById("nameInput");
    input.addEventListener("keyup", function(event){
        if(event.keyCode == 13){
		    event.preventDefault();
		    document.getElementById("add").click();
	    }
    });

    var players = [];
    function addPlayer(){
       player = new Player(document.getElementById("nameInput").value, document.getElementById("skillSelect").value);
       players.push(player);
       displayTable();
    }

    class Player{
        constructor(name,skill){
            this.name= name;
            this.skill = skill;
        }
    }

    function displayTable(){
        var table = document.getElementById("playerTable");
        clearTable();
        for(var i =0; i < players.length; i++){
            var plyr = players[i];

            var row = document.createElement("tr");
            var btnRemove = document.createElement("button");
            btnRemove.innerHTML = "Remove" + " " + plyr.name;
            btnRemove.id = plyr['name'];
            btnRemove.setAttribute("btnNumber", i);
            console.log(btnRemove.getAttribute("btnNumber"));
            
            btnRemove.onclick = ()=> {
                console.log(btnRemove.getAttribute("btnNumber"));
                for(var k = 0; k < players.length; k++){
                   //let currPlayer = players[k];
                    if(k === btnRemove.getAttribute("btnNumber")){
                        players.splice(k,1);
                        console.log(players);
                        
                    }
                   // clearTable();
                    //displayTable();
                      
                     
                } 
                
                /*players = players.filter(player => player.name!==btnRemove.id);
                clearTable();
                displayTable();
                */
            };
            var properties = ['name', 'skill'];

            for(var j =0; j < properties.length; j++){
                var cell = document.createElement("td");
                cell.innerHTML = plyr[properties[j]];
                row.appendChild(cell);
                row.appendChild(btnRemove);
            }
            table.appendChild(row);

        }
    }

    function clearTable(){
        var tb = document.getElementById('playerTable');
        while(tb.rows.length > 1) {
        tb.deleteRow(1);
        }
    }