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
           // var jsondata=data; 
            alert (data);
            $(".div1").html(callback + " : " + data);
        },
        error: function(json) {
            alert('erreur btRefresh');
            $(".div1").html(" erreur ");
        }
    });
});


function refrehListMatch() {
   var varmysoluce = "eee";
   $.ajax({
        url: 'http://127.0.0.1:4444/getListMatch',
        type: 'POST', 
        data: {
            dataSoluce: varmysoluce, 
        },
        success: function(data) {
            var jsondata=data; 
            alert (data);
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