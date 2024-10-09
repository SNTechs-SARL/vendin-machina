var server = new (require("bluetooth-serial-port").BluetoothSerialPortServer)()

var CHANNEL = 10 // My service channel. Defaults to 1 if omitted.
var UUID = "38e851bc-7144-44b4-9cd8-80549c6f2912" // My own service UUID. Defaults to '1101' if omitted

server.on("data", function (buffer) {
    console.log("Received data from client: " + buffer)

    // ...

    console.log("Sending data to the client")
    server.write(Buffer.from("..."), function (err, bytesWritten) {
        if (err) {
            console.log("Error!")
        } else {
            console.log("Send " + bytesWritten + " to the client!")
        }
    })
})

module.exports = server