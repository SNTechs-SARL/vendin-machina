/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v7cyb4160gbf15y")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_WMlzPtr` ON `products` (`vending_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v7cyb4160gbf15y")

  collection.indexes = []

  return dao.saveCollection(collection)
})
