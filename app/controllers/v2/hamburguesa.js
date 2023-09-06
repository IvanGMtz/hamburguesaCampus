import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("hamburguesa");

export const getHamburguesaCategoryV2 = async (req, res) => {
    await Promise.all([
        body('categoria').notEmpty().isString().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result = await collection.find({category : req.body.categoria }).toArray();
    res.send(result);
}

export const getHamburguesaChefV2 = async (req, res) => {
    await Promise.all([
        body('chef').notEmpty().isString().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result = await collection.find({ chef: req.body.chef }).toArray();
    res.send(result);
}

export const getHamburguesaPriceV2 = async (req, res) => {
    await Promise.all([
        body('precio').notEmpty().isNumeric().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result = await collection.aggregate([
        {
            $match:
            {
                "price": { $lte: req.body.precio }
            }
        }
    ]).toArray();
    res.send(result);
}

export const getHamburguesaOrderV2 = async (req, res) => {
    let result = await collection.aggregate([
        { $sort: { price: 1 } }
    ]).toArray();
    res.send(result);
}