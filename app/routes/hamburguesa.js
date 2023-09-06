import express from "express";
import { getHamburguesaV1 } from "../controllers/v1/hamburguesa.js"
import { getHamburguesaCategoryV2, getHamburguesaChefV2, getHamburguesaPriceV2, getHamburguesaOrderV2 } from "../controllers/v2/hamburguesa.js"
import routesVersioning from 'express-routes-versioning';

const version = routesVersioning();
const appHamburguesa = express.Router();

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

export default appHamburguesa;
