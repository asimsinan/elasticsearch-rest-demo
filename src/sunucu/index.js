const express      = require("express");
const cors         = require("cors");
const bodyParser   = require("body-parser");
const routes       = require("./routes");
                     require("dotenv").config();

const app  = express();
const port = process.env.NODE_PORT || 3000;

/**
 * @function start
 * @returns {void}
 * @description Http sunucusunu başlatır.
 */

function start() {

  return  app.use(cors())
             .use(bodyParser.urlencoded({ extended: false }))
             .use(bodyParser.json())
             .use("/sozler",routes)
             .use((_req, res) => res.status(404).json({ success: false,error: "Rota bulunamadı" }))
             .listen(port, () => console.log(`Sunucu ${port} portunda hazır`));

}

module.exports = {
  start
};