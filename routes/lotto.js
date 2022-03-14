const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
/**
 * @swagger
 * /lotto:
 *   get:
 *     description: All lotto
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */
router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const response = await client
    .db("web")
    .collection("lotto")
    .find({})
    .toArray()
  await client.close();
  res.status(200).json(response);
});

/**
 * @swagger
 * /lotto/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The mongo ID.
 *     description: Get a mongo by id
 *     responses:
 *       200:
 *         description: Returns the requested catachphrase
 */
router.get("/:id", async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const response = await client
    .db("web")
    .collection("lotto")
    .find(ObjectId(req.params.id))
    .toArray();
  await client.close();
  res.status(200).json(response);
});

module.exports = router;
