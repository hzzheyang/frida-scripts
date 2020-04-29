import time
import frida


def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])


def javaByteArrayToString(data):
    return ''.join(map(lambda x: chr(x % 256), data))


def start_hook(package_name):
    device = frida.get_usb_device(timeout=50)
    # device = frida.get_device_manager().add_remote_device("127.0.0.1:1234")
    print(device)
    device.attach("com.android.systemui")
    pid = device.spawn([package_name])
    device.resume(pid)
    time.sleep(1)
    session = device.attach(pid)

    with open("trace.js", encoding="utf-8") as f:
        script = session.create_script(f.read())
    script.on("message", on_message)
    script.load()
    input()


if __name__ == "__main__":
    start_hook("com.meitu.meipaimv")