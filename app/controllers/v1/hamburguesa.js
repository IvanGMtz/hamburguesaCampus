import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("hamburguesa");

export const getHamburguesaV1 = async (req, res) => {
    let result = await collection.find().toArray();
    res.send(result);
}