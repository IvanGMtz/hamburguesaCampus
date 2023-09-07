import { con } from "../../../config/connection/atlas.js";
import { body, validationResult } from 'express-validator';

let db = await con();
let collection = db.collection("chef");

export const getChefV2 = async (req, res) => {
    await Promise.all([
        body('especialidad').notEmpty().isString().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result = await collection.find({ specialism: req.body.especialidad }).toArray();
    res.send(result);
}

export const getChefExceptounoV2 = async (req, res) => {
    let result = await collection.find({ name: { $ne: "ChefA" } }).toArray();
    res.send(result);
}

export const deleteChefV2 = async (req, res) => {
    try {
        const result = await collection.deleteMany({ specialism: "Cocina Vegetariana" });;

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Chef not founds" });
        }

        res.status(200).json({ message: "Chef deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Chef", error: error.message });
    }
}