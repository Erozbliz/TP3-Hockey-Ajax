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
    var idmysoluce = "eee";
    var varmysoluce = "eee"; //indice
   //A garder
   $.ajax({
        url: '../includes/indice_ajax.php',
        type: 'POST', 
        data: {
            dataSoluce: varmysoluce, 
            dataId: idmysoluce,
        },
        success: function(data) {
            var jsondata=data; 
            alert (data);
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


