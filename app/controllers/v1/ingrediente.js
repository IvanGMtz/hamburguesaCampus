import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("ingrediente");

export const getIngredienteV1 = async (req, res) => {
    let result = await collection.find().toArray();
    res.send(result);
}