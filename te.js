// Java.perform(function () {
//     ['com.homelink.midlib.util.HttpUtil'].forEach(function (clazz,i) {
//         var func = 'b';
//         Java.use(clazz)[func].overload("java.lang.String","java.util.Map").implementation = function (a,b,c) {
//
//             console.log("=============================================");
//             console.log(a);
//             console.log(b);
//             var ret = this[func](a,b);
//             console.log(ret);
//             console.log("-----------------------------------------------");
//             return ret;
//         }
//     });
// });
Java.perform(function () {
    ['com.homelink.midlib.util.HttpUtil'].forEach(function (clazz,i) {
        var func = 'd';
        Java.use(clazz)[func].overload("java.lang.String").implementation = function (a) {

            console.log("=============================================");
            console.log(a);
            var ret = this[func](a);
            console.log(ret);
            console.log("-----------------------------------------------");
            return ret;
        }
    });
});