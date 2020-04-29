
Java.perform(function () {
    const Jstring=Java.use("java.lang.String");
    const base64=Java.use("android.util.Base64");
    ['com.ss.sys.ces.a'].forEach(function (clazz,i) {
        var func = 'meta';
        Java.use(clazz)[func].implementation = function (a,b,c) {

            console.log("=============================================");
            console.log(a);
            console.log(b);
            console.log(c);
            var ret = this[func](a,b,c);
            send(Bytes2Str(ret));
            send(base64.encode(ret, 0));
            send(Jstring.$new(ret));
            console.log("-----------------------------------------------");
            return ret;
        }
    });
});