//hook 遍历class
function allclass(){

	var classes = Java.enumerateLoadedClassesSync();
	console.log('[HY] Loaded Classes');
	classes.forEach(function(aClass) {
		try{
			console.log('[HY] ' + aClass);
		}
		catch(err){}
	});
}


//String转byte[]
function stringToBytes(str) {  
    var ch, st, re = []; 
    for (var i = 0; i < str.length; i++ ) { 
        ch = str.charCodeAt(i);  
        st = [];                 

       do {  
            st.push( ch & 0xFF );  
            ch = ch >> 8;          
        }    
        while ( ch );  
        re = re.concat( st.reverse() ); 
    }  
    return re;  
} 

//byte[]转String
 function byteToString(arr) {  
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',  
        _arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2),  
            v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
}

function getStackTrace(){
      var android_util_Log = Java.use('android.util.Log'), java_lang_Exception = Java.use('java.lang.Exception');
      send('[HY] [stack]' +android_util_Log.getStackTraceString(java_lang_Exception.$new()));
}

function Bytes2Str(arr){
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      var tmp = arr[i].toString(16);
      if (tmp.length == 1) {
        tmp = "0" + tmp;
      }
      str += tmp;
    }
    return str;
  }

//overloads
function hookOverloads(className, func) {
  var clazz = Java.use(className);
  var overloads = clazz[func].overloads;
  for (var i in overloads) {
    if (overloads[i].hasOwnProperty('argumentTypes')) {
      var parameters = [];
      var curArgumentTypes = overloads[i].argumentTypes, args = [], argLog = '[';
      for (var j in curArgumentTypes) {
        var cName = curArgumentTypes[j].className;
        parameters.push(cName);
        argLog += "'(" + cName + ") ' + v" + j + ",";
        args.push('v' + j);
      }
      argLog += ']';
      var script = "var ret = this." + func + '(' + args.join(',') + ") || '';\n"
        + "console.log(JSON.stringify(" + argLog + "));\n"
        + "return ret;";
      args.push(script);
      clazz[func].overload.apply(this, parameters).implementation = Function.apply(null, args);
    }
  }
}
  
setTimeout(function() {
	Java.perform(function() {
	    allclass();
        hookOverloads('java.util.HashMap', 'put');
	});   
}, 0);