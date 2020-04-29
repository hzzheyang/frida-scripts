Java.perform(function () {
    ['org.json.JSONObject'].forEach(function (clazz, i) {
        var func = 'putOpt';
        Java.use(clazz)[func].implementation = function (a, b) {
            var ret = this[func](a, b);
            send('[HY] [String Catch] [' + i + '] ' + ret);
            return ret;
        }
    });
});


Java.perform(function () {
    ['org.json.JSONObject'].forEach(function (clazz, i) {
        var func = 'put';
        Java.use(clazz)[func].overload("java.lang.String", "java.lang.Object").implementation = function (a, b) {
            var ret = this[func](a, b);
            send('[HY] [String Catch] [' + i + '] ' + ret);
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
            return ret;
        }
    });
});

