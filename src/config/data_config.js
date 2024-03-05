require("dotenv").config();
const mongoose = require("mongoose");
const source = process.env.DB_MONGO;
const config = {
  connectTimeoutMS: 5000,
};
const conectarDB = async () => {
  try {
    await mongoose.connect(source, config);
    console.log("Project Enviroment => ", process.env.USER);
  } 
  catch (error) {console.log(error, "Deteniendo servidor");}
};

module.exports = conectarDB;
