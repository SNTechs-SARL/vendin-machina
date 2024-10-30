const {createBluetooth} = require('node-ble')
const {bluetooth, destroy} = createBluetooth()

class VendingMachineManager {
    // corresponds to 0000xxxx-0000-1000-8000-00805F9B34FB where xxxx is the specified address in the arduino program
    STATE_CHAR_UID = "0000FFE1-0000-1000-8000-00805F9B34FB"
    CHARGE_ATT_UID = "0000FFE0-0000-1000-8000-00805F9B34FB"
    
    // ble == const adapter = await bluetooth.defaultAdapter()
    constructor(mac, ble) {
        this.ble = ble
        this.mac = mac
    }

    async connect() {
        if (! await this.ble.isDiscovering()){
            await adapter.startDiscovery()
        }

        this.device = await adapter.waitDevice(this.mac)
        await this.device.connect()
        this.gattServer = await device.gatt()
    }

    async 
}

const tmp = async() => {
    const adapter = await bluetooth.defaultAdapter()
    if (! await adapter.isDiscovering()){
        console.log("not discovering")
        await adapter.startDiscovery()
    }
        console.log("waiting")

    const device = await adapter.waitDevice('b0:d2:78:26:fa:f3')
        console.log("connected")
    await device.connect()
        console.log("connected")
    if(device.isConnected){
        const gattServer = await device.gatt()
        const service1 = await gattServer.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb')
        console.log(JSON.stringify(await service1.characteristics()))
        const characteristic1 = await service1.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb')
        await characteristic1.writeValue(Buffer.from("10"))
        /* 
        const characteristic1 = await service1.getCharacteristic('uuid')
        await characteristic1.writeValue(Buffer.from("Hello world"))
        const buffer = await characteristic1.readValue()
        console.log(buffer) */
    }
}
module.exports = tmp