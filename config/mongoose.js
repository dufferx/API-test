const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost = process.env.DBHOST || "00156021"
const dbpassword = process.env.DBPORT || "7hbTsb4RMLn2ABW5"
const dbname = process.env.DBNAME || "clusterscholarplay.wvxabhe.mongodb.net"

const dburi = process.env.DBURI || `mongodb+srv://${dbhost}:${dbpassword}@${dbname}/`

const connect = async () => {
   debug(dburi);
   try {
    await Mongoose.connect(dburi);
    debug("Conexion a la base exitosa");
   } catch (error) {
    debug("Error en la conexion de la base");
    process.exit(1);
   }
}

module.exports = {
    connect
}
