import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("ingrediente");

export const getIngredienteV2 = async (req, res) => {

    await Promise.all([
        body('cantidad').notEmpty().isNumeric().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result = await collection.aggregate([
        {
            $match:
            {
                "stock": {  $lt: req.body.cantidad }
            }
        }
    ]).toArray();
    res.send(result);
}

export const getIngredienteCaroV2 = async (req, res) => {
    let result = await collection.find().sort({ "price": -1 }).limit(1).toArray();
    res.send(result);
}

export const putIngredienteV2 = async (req, res) => {
    let valorinicial = await collection.find({ name: req.body.nombre }).toArray();
    try {

        await Promise.all([
            body('nombre').notEmpty().isString().run(req),
            body('cantidad').notEmpty().isNumeric().run(req)
        ]);

        

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const IngredienteActualizado = {
            stock: req.body.cantidad + valorinicial[0].stock
        };

        const result = await collection.updateOne({ name: req.body.nombre }, { $set: IngredienteActualizado });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Ingrediente not found" });
        }

        res.status(200).json({ message: "Ingrediente updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating ingrediente", error: error.message });
    }
}

export const getIngredienteOrderV2 = async (req, res) => {
    let result = await collection.aggregate([
        { $sort: { name: 1 } }
    ]).toArray();
    res.send(result);
}

export const getIngredienteRangoV2 = async (req, res) => {
    let result = await collection.aggregate([
        {
            $match:
            {
                "price": { $gte: 2, $lte: 50 }
            }
        }
    ]).toArray();
    res.send(result);
}

export const deleteIngredienteV2 = async (req, res) => {
    try {
        const result = await collection.deleteMany({ stock: 0});;

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Ingredientes not founds" });
        }

        res.status(200).json({ message: "Ingredientes deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Ingredientes", error: error.message });
    }
}