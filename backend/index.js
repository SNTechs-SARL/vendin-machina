const express = require('express')
const app = express()
const port = 3000
const PocketBase = require('pocketbase/cjs')
require('dotenv').config()
const pb = new PocketBase(process.env.PB_URL)

app.get('/products', async (req, res) => {
	const products = (await pb.collection('products').getFullList()).map(p => {
		p.thumbnail = `${process.env.PB_URL}/api/files/products/${p.id}/${p.thumbnail}`
		return p
	})
	console.log(products[0])

  res.send(products)
})

app.listen(port, async() => {
	_= await pb.admins.authWithPassword(process.env.EMAIL, process.env.PASSWORD)
	if(!pb.authStore.isValid) {
		console.log('Invalid PocketBase Authentification')
		app.close()
	}
  console.log(`Example app listening on port ${port}`)
})