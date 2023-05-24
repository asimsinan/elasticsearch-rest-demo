const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

routes.route("/").get(controller.sozleriGetir);
routes.route("/yeni").post(controller.yeniSozEkle);

module.exports = routes;