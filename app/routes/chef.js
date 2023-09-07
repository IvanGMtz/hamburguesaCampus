import express from "express";
import { getChefV1 } from "../controllers/v1/chef.js"
import { getChefV2, getChefExceptounoV2, deleteChefV2 } from "../controllers/v2/chef.js"
import routesVersioning from 'express-routes-versioning';
import { validarToken } from "../middlewares/JWT.js";
import { limitGrt } from "../middlewares/limit.js";

const version = routesVersioning();
const appChef = express.Router();
appChef.use(validarToken, limitGrt());


appChef.get("/", version({
    "^1.0.0": getChefV1,
    "~2.0.1": getChefV2
}));

appChef.get("/SinChefA", version({
    "~2.0.1": getChefExceptounoV2
}));

appChef.delete("/", version({
    "~2.0.1": deleteChefV2
}));

export default appChef;
