$("#btRefresh2").click(function(){
	alert ('sdf');
    $.ajax({
    	url: "demo_test.txt", 
    	success: function(result){
        	$(".div1").html("eeeeeee");
    	},
    	error: function(req, status, ex) {
    		//$(".div1").html("error");
    		$(".div1").append("erreur");
    	 	console.log(req,status,ex);
    	 }
    });
});



$("#btRefresh").click(function(){
   //A garder
   $.ajax({
        url: 'http://127.0.0.1:4444/getListMatch',
        type: 'GET',
        success: function(data,callback) {
            $(".div1").html(callback);
            miseAjourListHtml(data);
        },
        error: function(json) {
            alert('erreur btRefresh');
            $(".div1").html(" erreur ");
        }
    });
});


//Pemet de mettre a jour la liste des matchs dynamiquement
function miseAjourListHtml(data){
     //       [0]       0   1           2           3               4           5       6
    //     num_match:[Name,ButEquipe1,ButEquipe2,PenaltyEquipe1,PenaltyEquipe2,Date,StatusMatch]
    //Exemple = {"0":["red1 VS blue1",4,1,0,0,"2016\/11\/12 18:26:54","PERIODE 1"]}
    var jsondata = JSON.parse(data);
    //alert ("jsondata[0]['0']");
    alert ("Il y a "+Object.keys(jsondata).length+" matchs");
    //On efface l'ancien html
    $("#idListMatch").html("");
    var str= "";
    for(var i=0;i<Object.keys(jsondata).length;i++){
        str +='<li>';
        str +='<div class="collapsible-header"><i class="material-icons">games</i>Match '+i+' : '+jsondata[i]['0']+'</div>';
        str +='<div class="collapsible-body">';
        str +='<p> Résultats : '+jsondata[i]['1']+' / '+jsondata[i]['2']+'<br> Pénalité : '+jsondata[i]['3']+' / '+jsondata[i]['4']+' <br>';
        str +=' Chrono : '+jsondata[i]['5']+' <br> Status : '+jsondata[i]['6']+'  <br> </p>';
        str +='</div>';
        str +='</li>';
       $("#idListMatch").html(str);
    }
}

//Utiliser pour l'autorefresh
function refrehListMatch() {
   $.ajax({
        url: 'http://127.0.0.1:4444/getListMatch',
        type: 'GET', 
        success: function(data,callback) {
            $(".div1").html(callback);
            miseAjourListHtml(data);
        },
        error: function(json) {
            alert('erreur btAutoRefresh');
            $(".div1").html(" erreur btAutoRefresh");
        }
    });
};

//bouton a off par défaut
var boolSwitch = false;
var counter = null;
$("#btAutoRefresh").click(function(){
     if(boolSwitch==false){
        var seconde = 5;
        var cnt = 0;
        boolSwitch = true;
        counter = setInterval(function() {
            if (cnt < seconde) {
                console.log(cnt);
                $('.divTimer').html(cnt);
                cnt++;
                if(cnt==seconde){
                    refrehListMatch();
                $('.divTimer').html("0");
                    cnt=0;
                }
            }
        }, 1000);    
    }else{
        boolSwitch = false;
        //on kill le compteur
        clearInterval(counter);
    }
    console.log(boolSwitch);
});





/**
//       [0]       0   1           2           3               4           5       6
//     num_match:[Name,ButEquipe1,ButEquipe2,PenaltyEquipe1,PenaltyEquipe2,Date,StatusMatch]
//Exemple = {"0":["red1 VS blue1",4,1,0,0,"2016\/11\/12 18:26:54","PERIODE 1"]}
EXEMPLE JSON
{
  "0": [
    "red1 VS blue1",
    4,
    1,
    0,
    0,
    "2016/11/12 18:26:54",
    "PERIODE 1"
  ],
  "1": [
    "red2 VS blue2",
    0,
    1,
    1,
    2,
    "2016/11/12 18:27:26",
    "PERIODE 1"
  ]
}
**/
