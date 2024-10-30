const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const PocketBase = require('pocketbase/cjs')
require('dotenv').config()
const pb = new PocketBase(process.env.PB_URL)


app.use(cors())

app.get('/products', async (req, res) => {
	const products = (await pb.collection('products').getFullList()).map(p => {
		p.thumbnail = `${process.env.PB_URL}/api/files/products/${p.id}/${p.thumbnail}`
		return p
	})
	console.log(products[0])

  res.send(products)
})

app.post('/buy/:product_id', async (req, res) => {
	let success = false;
	// TODO FIND ITEM
	const delay = ms => new Promise(res => setTimeout(res, ms));
  	delay(5000)
	try {
		const product = (await pb.collection('products').getFirstListItem(`vending_id = ${req.params.product_id}`));
		success = true;
	} catch (e) {
		console.log("Item not found")
	}
	
	res.send({success})
})

app.listen(port, async() => {
	_ = await pb.admins.authWithPassword(process.env.EMAIL, process.env.PASSWORD)
	if(!pb.authStore.isValid) {
		console.log('Invalid PocketBase Authentification')
		app.close()
	}
  console.log(`Example app listening on port ${port}`)
})