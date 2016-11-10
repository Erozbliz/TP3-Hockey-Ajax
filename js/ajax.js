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
        url: 'http://127.0.0.1:4444/echoGet',
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


$("#btAutoRefresh").click(function(){
    var varmysoluce = "eee";
   $.ajax({
        url: '../includes/indice_ajax.php',
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
});


