import express from "express";
import { getHamburguesaV1 } from "../controllers/v1/hamburguesa.js"
import { getHamburguesaCategoryV2, getHamburguesaChefV2, getHamburguesaPriceV2, getHamburguesaOrderV2, getHamburguesaCaraV2 } from "../controllers/v2/hamburguesa.js"
import routesVersioning from 'express-routes-versioning';
import { validarToken } from "../middlewares/JWT.js";
import { limitGrt } from "../middlewares/limit.js";

const version = routesVersioning();
const appHamburguesa = express.Router();
appHamburguesa.use(validarToken, limitGrt());

appHamburguesa.get("/", version({
    "^1.0.0": getHamburguesaV1,
    "~2.0.1": getHamburguesaCategoryV2
}));

appHamburguesa.get("/chef", version({
    "~2.0.1": getHamburguesaChefV2
}));

appHamburguesa.get("/precio", version({
    "~2.0.1": getHamburguesaPriceV2
}));

appHamburguesa.get("/orden", version({
    "~2.0.1": getHamburguesaOrderV2
}));

appHamburguesa.get("/cara", version({
    "~2.0.1": getHamburguesaCaraV2
}));

export default appHamburguesa;
