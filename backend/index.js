const express = require('express')
const app = express()
const port = 3000
const PocketBase = require('pocketbase/cjs')
require('dotenv').config()
const pb = new PocketBase(process.env.PB_URL)

app.get('/products', async (req, res) => {
  res.send(await pb.collection('products').getFullList())
})

var server = app.listen(port, async() => {
	_= await pb.admins.authWithPassword(process.env.EMAIL, process.env.PASSWORD)
	if(!pb.authStore.isValid) {
		console.log('Invalid PocketBase Authentification')
		app.close()
	}
  console.log(`Example app listening on port ${port}`)
})