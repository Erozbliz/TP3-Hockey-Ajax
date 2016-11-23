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
       // url: 'http://127.0.0.1:4444/getListMatch',
        dataType: "text",
        url: 'data_test/getListMatch.json',
        type: 'GET',
        success: function(data,callback) {
            $(".div1").html(callback);
            miseAjourListHtml(data);
            miseAjourParis(data);
        },
        error: function(json) {
           // alert('erreur btRefresh');
            $(".div1").html(" erreur ");
        }
    });
});


//Pemet de mettre a jour + générer la liste des matchs dynamiquement
function miseAjourListHtml(data){
     //       [0]       0   1           2           3               4           5       6
    //     num_match:[Name,ButEquipe1,ButEquipe2,PenaltyEquipe1,PenaltyEquipe2,Date,StatusMatch]
    //Exemple = {"0":["red1 VS blue1",4,1,0,0,"2016\/11\/12 18:26:54","PERIODE 1"]}
    var jsondata = JSON.parse(data);
    //alert ("jsondata[0]['0']"); //à garder
    //alert ("Il y a "+Object.keys(jsondata).length+" matchs");
    //On efface l'ancien html
    $("#idListMatch").html("");
    var str= "";
    var str2="";
    for(var i=0;i<Object.keys(jsondata).length;i++){
        var mydate = new Date(jsondata[i]['5']);
        var d = new Date();
        var n = d.getTime();
        console.log(mydate.toTimeString());
        console.log(d.toTimeString());

        var hourDiff = mydate - d;    
        console.log(hourDiff);
        var milliseconde = Math.abs(mydate - d); //résultat en milliseconde
        //milliseconde = milliseconde/(60*1000); //en minutes
        //milliseconde = milliseconde/1000; //en secondes
        console.log(milliseconde);

        //Heure réel
        var x = milliseconde;
        var tempTime = moment.duration(x);
        var timerStartSubCurrent = tempTime.minutes() +":"+tempTime.seconds();
        console.log(timerStartSubCurrent);
        
        str +='<li>';
        str +='<div class="collapsible-header"><i class="material-icons">games</i>Match '+i+' : '+jsondata[i]['0']+'</div>';
        str +='<div class="collapsible-body">';
        str +='<p> Résultats : '+jsondata[i]['1']+' / '+jsondata[i]['2']+'<br> Pénalité : '+jsondata[i]['3']+' / '+jsondata[i]['4']+' <br>';
        str +='  Match commencé à '+jsondata[i]['5']+' <br> Chrono : '+timerStartSubCurrent+'<br> ';
        str +='  Status : '+jsondata[i]['6']+'  <br> </p>';
        str +='</div>';
        str +='</li>';
       $("#idListMatch").html(str);

       str2 +='<div class="col s12 m6">';
         str2 +='<div class="card-panel blue">';
           str2 +='<span class="white-text">';
           str2 +='Match '+i+' : '+jsondata[i]['0'];
            str2 +='<p> Résultats : '+jsondata[i]['1']+' / '+jsondata[i]['2']+'<br> Pénalité : '+jsondata[i]['3']+' / '+jsondata[i]['4']+' <br>';
            str2 +='  Match commencé à '+jsondata[i]['5']+' <br> Chrono : <span class="updateTime">'+timerStartSubCurrent+'</span><br> ';
            str2 +='  Status : '+jsondata[i]['6']+'  <br> </p>';
           str2 +='</span>';
         str2 +='</div>';
       str2 +='</div>';
        $("#idListMatch2").html(str2);
        updateMyTime();
        //setInterval(updateMyTime(),1000);

    }
}

//Permet d'incrementer le compteur pour le chrono
var boolSwitchTimer = false;
var killcomteur = null;
function updateMyTime(){

   
        window.clearInterval(killcomteur);
        var timerStartSubCurrent;
        var x =[];
        boolSwitchTimer=true;
        killcomteur = setInterval(function() {
            //var myObjectTime = $(".updateTime").text();
            //var myStrTime = html(myObjectTime);
            //console.log(myObjectTime);
            var secondes;
            $('.updateTime').each(function(index, obj)
            {
                x.push($(this).text());
                var splitTimer = x[index].split(":");
                var minutes = splitTimer[0];
                secondes = splitTimer[1];
                var intSecondes = parseInt(secondes)+1;
                //console.log(minutes + " "+intSecondes);
                var milliseconde = (minutes*60000)+(intSecondes*1000);
                var tempTime = moment.duration(milliseconde);
                timerStartSubCurrent = tempTime.minutes() +":"+tempTime.seconds();
                //console.log(timerStartSubCurrent);
                $('.updateTime').eq(index).html(timerStartSubCurrent);
                
            });
            //console.log(x[0]); //contient le 1er timer
            //$('.divTimer').html(timerStartSubCurrent);
            x =[];
        }, 1000); 
  
}


//Mise à jour pour la liste des paris
function miseAjourParis(data){
    $(document).ready(function() {
      // initialize
      $('select').material_select();
       var jsondata = JSON.parse(data);
       //alert(jsondata);

        // clear contents
        var $selectDropdown = 
          $("#dropdownid")
            .empty()
            .html(' ');

        for(var i=0;i<Object.keys(jsondata).length;i++){
            $selectDropdown.append(
              $("<option></option>")
                .attr("value",i)
                .text(jsondata[i]['0'])
            );
        }

        // trigger event
        $selectDropdown.trigger('contentChanged');
        $('select').on('contentChanged', function() {
        // re-initialize (update)
        $(this).material_select();
      });
      $('select').material_select();
    });
}



//Utiliser pour l'autorefresh
function refrehListMatch() {
   $.ajax({
        url: 'http://127.0.0.1:4444/getListMatch',
        type: 'GET', 
        success: function(data,callback) {
            $(".div1").html(callback);
            miseAjourListHtml(data);
            miseAjourParis(data);
        },
        error: function(json) {
            //alert('erreur btAutoRefresh');
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
                $('.divTimer').html(cnt+1);
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





$("#btEnvoieParis").click(function(){
    var user ="user1";
    //var match = $("#dropdownid").find('option:selected').attr('id');
    var match = $("#dropdownid")[0].selectedIndex;
    var matchVar = $( "#dropdownid option:selected" ).text();
    var equipe = $('input[name="group1"]:checked').val();
    var somme = $("#inputSomme").val();
    var user = $.cookie("userName");

    alert("--"+user+"--match="+match+"/"+matchVar+"--equipe="+equipe+"--"+somme)
    if(user!=null && equipe!=null && somme!=null && match!=null && matchVar!="" && somme!=""){
        $.ajax({
            url: 'http://127.0.0.1:4444/postParis',
            type: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: { user: user, match: match, equipe: equipe, somme : somme },
            success: function(data,callback) {
                var str = String(data);
                $(".divParis").html(callback +" : "+data);
                $("#history").html(data);
            },
            error: function(json) {
                $(".divParis").html(" erreur paris");
            }
        });
    }else{
        alert("Merci de bien sélectionner")
    }
});

//nouveau user + nouveau cookie
$("#btChangeUser").click(function(){
    $.removeCookie("userName");
    printRandUser();
});


//fonction qui permet de générer un utilisateur alétoire pour les paris
function generateRandUser(){
    var myvar = Math.floor((Math.random() * 1000) + 1);
    var strRandUser = "user"+myvar;
    return strRandUser;
}

//affiche le nom d'un utilisateur aléatoire + Cookie : userName
function printRandUser(){
    console.debug("ATTENTION CHROME NE SUPPORTE PAS LES COOKIES LOCAL"); 
    //console.debug($.cookie("userName")); 
    var randUser = generateRandUser();
    $("#userName").html(randUser);
    $("#history").html("");
    $.cookie("userName", randUser, {Path: "/", expires: 30});
    console.debug($.cookie("userName"));
}

//genere un utilisateur au chargement de la page
if($.cookie("userName")!=null){
    console.debug("Cookie userName trouvé"); 
    $("#userName").html($.cookie("userName"));
}else{
    window.onload = printRandUser;
}



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
