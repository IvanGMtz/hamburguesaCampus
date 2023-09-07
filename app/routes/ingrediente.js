import express from "express";
import { getIngredienteV1 } from "../controllers/v1/ingrediente.js"
import { getIngredienteV2, getIngredienteCaroV2, putIngredienteV2, getIngredienteOrderV2, getIngredienteRangoV2, deleteIngredienteV2 } from "../controllers/v2/ingrediente.js"
import routesVersioning from 'express-routes-versioning';
import { validarToken } from "../middlewares/JWT.js";
import { limitGrt } from "../middlewares/limit.js";

const version = routesVersioning();
const appIngrediente = express.Router();
appIngrediente.use(validarToken, limitGrt());

appIngrediente.get("/", version({
    "^1.0.0": getIngredienteV1,
    "~2.0.1": getIngredienteV2
}));

appIngrediente.get("/caro", version({
    "~2.0.1": getIngredienteCaroV2
}));

appIngrediente.get("/orden", version({
    "~2.0.1": getIngredienteOrderV2
}));

appIngrediente.get("/rango", version({
    "~2.0.1": getIngredienteRangoV2
}));

appIngrediente.put("/", version({
    "~2.0.1": putIngredienteV2
}));

appIngrediente.delete("/", version({
    "~2.0.1": deleteIngredienteV2
}));

export default appIngrediente;
