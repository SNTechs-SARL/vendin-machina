/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v7cyb4160gbf15y")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ql9pd2vv",
    "name": "thumbnail",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png",
        "image/webp"
      ],
      "thumbs": [
        "600x600"
      ],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v7cyb4160gbf15y")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ql9pd2vv",
    "name": "thumbnail",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png"
      ],
      "thumbs": [
        "600x600"
      ],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
