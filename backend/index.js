const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const PocketBase = require('pocketbase/cjs')
require('dotenv').config()
const pb = new PocketBase(process.env.PB_URL)


app.use(cors())

app.get('/products', async (req, res) => {
	const products = (await pb.collection('products').getFullList({
		filter: "stock > 0"
	})).map(p => {
		p.thumbnail = `${process.env.PB_URL}/api/files/products/${p.id}/${p.thumbnail}`
		return p
	})

  res.send(products)
})

app.post('/buy/:product_id', async (req, res) => {
	let success = false;
	let product;
	let products;
	// TODO FIND ITEM
	const delay = ms => new Promise(res => setTimeout(res, ms));
  	delay(5000)
	try {
		product = (await pb.collection('products').getFirstListItem(`vending_id = ${req.params.product_id}`));
		success = true;
	} catch (e) {
		console.log("Item not found")
	}

	if(success) {
		product = (
			{
				...product,
				stock : product.stock - 1
			}
		)

		await pb.collection('products').update(product.id, product);

		products = (await pb.collection('products').getFullList({
			filter: "stock > 0"
		})).map(p => {
			p.thumbnail = `${process.env.PB_URL}/api/files/products/${p.id}/${p.thumbnail}`
			return p
		})
	}
	
	res.send({success, products})
})

app.listen(port, async() => {
	_ = await pb.admins.authWithPassword(process.env.EMAIL, process.env.PASSWORD)
	if(!pb.authStore.isValid) {
		console.log('Invalid PocketBase Authentification')
		app.close()
	}
  console.log(`Example app listening on port ${port}`)
})