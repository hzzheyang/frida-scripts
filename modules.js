
Java.perform(function(){
	var utils=Java.use("com.ss.sys.ces.a");
	console.log(utils);
	Process.enumerateModules({
		onMatch: function(module){

			send(module);
		},
		onComplete: function(){}


	});

});