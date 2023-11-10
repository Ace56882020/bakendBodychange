require('dotenv').config();
const mongoose = require('mongoose');
const source = process.env.DB_MONGO;

const conectarDB = async () => {
    try {
        await mongoose.connect(source, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Project Enviroment => ', process.env.User);
    } catch (error) {
        console.log(error, "Deteniendo servidor");
        process.exit(1); // Detenemos la app
    }
}

module.exports = conectarDB