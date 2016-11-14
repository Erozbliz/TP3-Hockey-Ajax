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
    for(var i=0;i<Object.keys(jsondata).length;i++){
        str +='<li>';
        str +='<div class="collapsible-header"><i class="material-icons">games</i>Match '+i+' : '+jsondata[i]['0']+'</div>';
        str +='<div class="collapsible-body">';
        str +='<p> Résultats : '+jsondata[i]['1']+' / '+jsondata[i]['2']+'<br> Pénalité : '+jsondata[i]['3']+' / '+jsondata[i]['4']+' <br>';
        str +='  Match commencé à '+jsondata[i]['5']+' <br> Chorno : '+jsondata[i]['5']+' (- current_date)  <br> ';
        str +='  Status : '+jsondata[i]['6']+'  <br> </p>';
        str +='</div>';
        str +='</li>';
       $("#idListMatch").html(str);
    }
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
    var equipe = $('input[name="group1"]:checked').val();
    var somme = $("#inputSomme").val();
    var user = $.cookie("userName");

    alert("--"+user+"--match="+match+"--equipe="+equipe+"--"+somme)
    if(user!=null && equipe!=null && somme!=null){
        $.ajax({
            url: 'http://127.0.0.1:4444/postParis',
            type: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: { user: user, match: match, equipe: equipe, somme : somme },
            success: function(data,callback) {
                var str = String(data);
                $(".divParis").html(callback +" : "+data);
              
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
