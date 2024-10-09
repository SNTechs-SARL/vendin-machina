const {createBluetooth} = require('node-ble')
const {bluetooth, destroy} = createBluetooth()



const tmp = async() => {
    const adapter = await bluetooth.defaultAdapter()
    if (! await adapter.isDiscovering()){
        console.log("not discovering")
        await adapter.startDiscovery()
    }
        console.log("waiting")

    const device = await adapter.waitDevice('a8:61:0a:af:03:ba')
    await device.connect()
        console.log("connected")
    const gattServer = await device.gatt()
    const service1 = await gattServer.getPrimaryService('uuid')
    const characteristic1 = await service1.getCharacteristic('uuid')
    await characteristic1.writeValue(Buffer.from("Hello world"))
    const buffer = await characteristic1.readValue()
    console.log(buffer)
}
module.exports = tmp