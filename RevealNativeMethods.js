
var RevealNativeMethods = function() {
  var pSize = Process.pointerSize;
  var env = Java.vm.getEnv();
  var RegisterNatives = 215, FindClassIndex = 6; // search "215" @ https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
  var jclassAddress2NameMap = {};
  function getNativeAddress(idx) {
    return env.handle.readPointer().add(idx * pSize).readPointer();
  }
  // intercepting FindClass to populate Map<address, jclass>
  Interceptor.attach(getNativeAddress(FindClassIndex), {
    onEnter: function(args) {
      jclassAddress2NameMap[args[0]] = args[1].readCString();
    }
  });
  // RegisterNative(jClass*, .., JNINativeMethod *methods[nMethods], uint nMethods) // https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#977
  Interceptor.attach(getNativeAddress(RegisterNatives), {
    onEnter: function(args) {
      for (var i = 0, nMethods = parseInt(args[3]); i < nMethods; i++) {

          // https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#129
          // typedef struct {
          //    const char* name;
          //    const char* signature;
          //    void* fnPtr;
          // } JNINativeMethod;

        var structSize = pSize * 3; // = sizeof(JNINativeMethod)
        var methodsPtr = ptr(args[2]);
        var signature = methodsPtr.add(i * structSize + pSize).readPointer();
        var fnPtr = methodsPtr.add(i * structSize + (pSize * 2)).readPointer(); // void* fnPtr
        var jClass = jclassAddress2NameMap[args[0]].split('/');
        console.log('\x1b[3' + '6;01' + 'm', JSON.stringify({
          module: DebugSymbol.fromAddress(fnPtr)['moduleName'], // https://www.frida.re/docs/javascript-api/#debugsymbol
          package: jClass.slice(0, -1).join('.'),
          class: jClass[jClass.length - 1],
          method: methodsPtr.readPointer().readCString(), // char* name
          signature: signature.readCString(), // char* signature TODO Java bytecode signature parser { Z: 'boolean', B: 'byte', C: 'char', S: 'short', I: 'int', J: 'long', F: 'float', D: 'double', L: 'fully-qualified-class;', '[': 'array' } https://github.com/skylot/jadx/blob/master/jadx-core/src/main/java/jadx/core/dex/nodes/parser/SignatureParser.java
          address: fnPtr
        }), '\x1b[39;49;00m');
      }
    }
  });
}

Java.perform(RevealNativeMethods);
