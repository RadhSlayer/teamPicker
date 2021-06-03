class Player{
    constructor(name,skill){
        this.name= name;
        this.skill = skill;
    }
}

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
       document.getElementById("nameInput").value = "";
    }

    function displayTable(){
        var table = document.getElementById("playerTable");
        clearTable();
        for(var i =0; i < players.length; i++){
            var plyr = players[i];

            var row = document.createElement("tr");
            let btnRemove = document.createElement("button");
            btnRemove.classList.add("removebtn");
            btnRemove.innerHTML = "Remove";
            btnRemove.id = plyr['name'];
            
            btnRemove.onclick = ()=> {
                      
                players = players.filter(player => player.name!==btnRemove.id);
                clearTable();
                displayTable();
                
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

    function createTeams(){
        clearTable();
        let avg = computeAverage(players);
        
        var team1 = [];
        var team2 = [];

        let pos1 = 0;
        let pos2 = 0;

        var i = players.length-1;

        var sum1 = 0;
        var sum2 = 0;
        players.sort(compare);
        

        while(pos1 < 1+(Math.floor(players.length/2)) && pos2 < 1+(Math.floor(players.length/2)) && i >= 0){
            
            if(sum1 <sum2){
                team1[pos1] = players[i];
                pos1++;
                sum1+= Number(players[i].skill);
            }

            else{
                team2[pos2] = players[i];
                pos2++;
                sum2 += Number(players[i].skill);
            }
            i--;
        }

       /* if(!isAcceptableValue(computeAverage(team1), computeAverage(team2))){
            createTeams();
        }*/

       console.log(team1, team2);
    }

    function isAcceptableValue(teamSkillAvg, globalSkillAvg){
        if(Math.ceil(Math.abs(globalSkillAvg-teamSkillAvg) < 3)){
            return true;
        }

        return false;
    }

    function computeAverage(arr){
        let skillAvg = 0;
        
        for(var i = 0; i < arr.length; i++){
            skillAvg = skillAvg + Number(arr[i]['skill']);
            //console.log(players[i]['skill']);
            //console.log(skillAvg);
        }
        skillAvg = skillAvg/arr.length;

        return skillAvg;
    }

    function compare(a,b){
        if(Number(a.skill) < Number(b.skill)){
            return -1;
        }
        
        if(Number(a.skill) > Number(b.skill)){
            return 1;
        }

        return 0;
    }