import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("chef");

export const getChefV1 = async (req, res) => {
    let result = await collection.find().toArray();
    res.send(result);
}