import { Router } from "express";
import HTTPStatus from "http-status";
import TransitoryController from "../controllers/Transitory.controller";
import APIError from "../services/error";

import logErrorService from "../services/log";

const routes = new Router();

routes.get("/", (req, res, next) => {
  res.status(HTTPStatus.OK).send("Transitory IPFS Share");
});

routes.post("/upload", TransitoryController.upload);
routes.get("/download/:fileName", TransitoryController.download);
routes.get("/zip/download/:fileName", TransitoryController.zipDownload);

routes.all("*", (req, res, next) =>
  next(new APIError("Not Found!", HTTPStatus.NOT_FOUND, true))
);

routes.use(logErrorService);

export default routes;
