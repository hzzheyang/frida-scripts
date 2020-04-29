// Java.perform(function () {
//     ['java.lang.String'].forEach(function (clazz) {
//         var func = 'toString';
//         const JavaString = Java.use('java.lang.String');
//         var JavaBase64 = Java.use('java.util.Base64');
//         Java.use(clazz)[func].implementation = function () {
//
//             console.log("=============================================");
//             var ret = this[func]();
//             if (ret.indexOf("xlog")!=-1) {
//                 var android_util_Log = Java.use('android.util.Log'),
//                     java_lang_Exception = Java.use('java.lang.Exception');
//                 console.log('[HY] [stack]' + android_util_Log.getStackTraceString(java_lang_Exception.$new()));
//             }
//             console.log(ret);
//             send('[HY] [String Catch] [' + i + '] ' + JavaString.$new(ret));
//             send('[HY] [Base64 Code] ['+i+']'+JavaBase64.$new().getEncoder().encodeToString(ret));
//
//             console.log("-----------------------------------------------");
//             return ret;
//         }
//     });
// });


// Java.perform(function () {
//     ['com.bytedance.ttnet.a.a'].forEach(function (clazz,i) {
//         var func = 'aW';
//         Java.use(clazz)[func].implementation = function (a,b,c) {
//
//             console.log("=============================================");
//             console.log(a);
//             console.log(b);
//             console.log(c);
//             var ret = this[func](a,b,c);
//             console.log(ret);
//             console.log("-----------------------------------------------");
//             return ret;
//         }
//     });
// });

// Java.perform(function () {


    // ['com.bytedance.ttnet.a.a'].forEach(function (clazz,i) {
    // var func = 'aW';
    // Java.use(clazz)[func].implementation = function (a,b,c) {
    //     console.log("=============================================");
    //     console.log(a);
    //     console.log(b);
    //     console.log(c);
    //     var ret = this[func](a,b,c);
    //     console.log(ret);
    //     console.log("-----------------------------------------------");
    //     return ret;
    // }
    // });
    // 	com.ss.sys.ces.b.e$1
    // console.log("statrt");
    //
    // ['com.ss.sys.ces.b.e'].forEach(function (clazz, i) {
    //     var func = 'i';
    //     Java.use(clazz)[func].implementation = function () {
    //
    //         console.log("=====================ei======================");
    //         // console.log(a);
    //         // console.log(b);
    //         var ret = this[func]();
    //
    //         console.log(ret);
    //         // console.log(this.r);
    //         console.log("---------------------ei-----------------------");
    //         return ret;
    //     }
    // });
    // ['com.ss.sys.ces.b.a'].forEach(function (clazz, i) {
    //     var func = 'd';
    //     Java.use(clazz)[func].implementation = function () {
    //
    //         console.log("=====================ad======================");
    //         // console.log(a);
    //         // console.log(b);
    //         var ret = this[func]();
    //
    //         console.log(ret);
    //         // console.log(this.r);
    //         console.log("---------------------ad-----------------------");
    //         return ret;
    //     }
    // });
    //
    // ['com.ss.sys.ces.b.b'].forEach(function (clazz, i) {
    //     var func = 'd';
    //     Java.use(clazz)[func].implementation = function () {
    //
    //         console.log("=====================bd======================");
    //         // console.log(a);
    //         // console.log(b);
    //         var ret = this[func]();
    //
    //         console.log(ret);
    //         // console.log(this.r);
    //         console.log("---------------------bd-----------------------");
    //         return ret;
    //     }
    // });
    // ['com.ss.sys.ces.b.d'].forEach(function (clazz, i) {
    //     var func = 'i';
    //     Java.use(clazz)[func].implementation = function () {
    //
    //         console.log("=====================di======================");
    //         // console.log(a);
    //         // console.log(b);
    //         var ret = this[func]();
    //
    //         console.log(ret);
    //         // console.log(this.r);
    //         console.log("---------------------di-----------------------");
    //         return ret;
    //     }
    // });


    //     ['com.bytedance.ttnet.f.f'].forEach(function (clazz, i) {
    //     var func = 'b';
    //     Java.use(clazz)[func].implementation = function (a) {
    //
    //         console.log("=====================di======================");
    //         console.log(a);
    //         // console.log(b);
    //         var ret = this[func](a);
    //
    //         send(ret.o);
    //         send(ret.d);
    //         send(ret.h);
    //         // console.log(this.r);
    //         console.log("---------------------di-----------------------");
    //         return ret;
    //     }
    // });


    // var hookclass = Java.use("com.ss.sys.ces.b.c");
    // hookclass.a.overload("java.lang.String","java.util.List").implementation = function (v0,v1) {
    //     var ret = this.a(v0,v1);
    //     send(v0);
    //     send(v1);
    //     return ret;
    // };

    // var hookclass = Java.use("com.bytedance.ttnet.f.c");
    // hookclass.b.implementation = function (v0,v1) {
    //     var ret = this.b(v0,v1);
    //     console.log(v0);
    //     console.log(v1);
    //     console.log(ret.toString());
    //     // send(v1);
    //     // send(v2);
    //     return ret;
    // };
    // var hookclass = Java.use("com.ss.sys.ces.out.StcSDKFactory");
    // hookclass.E.implementation = function (a,b,c) {
    //     console.log(a);
    //     console.log(b);
    //     console.log(c);
    //
    //     var ret = this.E(a,b,c);
    //
    //     // console.log(ret.toString());
    //     // send(v1);
    //     // send(v2);
    //     return ret;
    // };



// });

/**
   * 字节数组转十六进制字符串
   * [16, 1, 2, 3, 4, 5, 6, 7, 8] 转换 100102030405060708
   * @param {Array} arr 符合16进制数组
   */
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



function byteToString(arr) {
try{
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
    }catch(err){
    return "nnn";
    }

}

// Java.perform(function () {
//     // const Jstring=Java.use("java.lang.String");
//     // const base64=Java.use("android.util.Base64");
//     ['com.ss.sys.ces.a'].forEach(function (clazz,i) {
//         var func = 'meta';
//         Java.use(clazz)[func].implementation = function (a,b,c) {
//
//             console.log("=============================================");
//             console.log(a);
//             console.log(b);
//             console.log(c);
//             var ret = this[func](a,b,c);
//             send(Bytes2Str(ret));
//             // send(base64.encode(ret, 0));
//             // send(Jstring.$new(ret));
//             console.log("-----------------------------------------------");
//             return ret;
//         }
//     });
// });


// Java.perform(function () {
//     // const Jstring=Java.use("java.lang.String");
//     // const base64=Java.use("android.util.Base64");
//     ['com.ss.sys.ces.c.g'].forEach(function (clazz,i) {
//         var func = '$init';
//         Java.use(clazz)[func].implementation = function (a,b) {

//             console.log("=============================================");
//             console.log("params1:"+a);
//             console.log("params2:"+b);
//             // send(a);
//             var reta = this[func](a,b);
//             // console.log("ret:"+reta);
//             console.log("-----------------------------------------------");
//             return reta;
//         }
//     });
// });

// Java.perform(function () {
//     var tt1 = Java.use("com.ss.sys.ces.a");
//     tt1.leviathan.implementation = function (a, b,c) {
//         console.log(a);
//         console.log(b);
//         console.log(c);
//         var ret = this.leviathan(a,b,c);
//         console.log(ret);
//         return ret;
//     }
// });

