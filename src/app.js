const express = require('express');
const conectarDB = require('./config/data_config');
const cors = require('cors');
//modulos
const path = require('path');
const routes = require('./routes/routes');
const port = process.env.PORT || 4000
const bodyParser = require('body-parser');
const { chat } = require('./controllers/functions/socketIO')

const fileUpload = require('express-fileupload')
const { name, version } = require('./../package.json');

console.log('Name: ', name);
console.log('Version: ', version);

// Creamos el servidor
const app = express();
const server = require('http').createServer(app);
// Conectamos a la BD
conectarDB();
chat(server)
//lectura y parseo de json
app.use(express.json());
app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));
app.use(cors());

app.use(express.static('public'));
// /directorio publico
process.env.publicUpload = path.join(__dirname, 'upload/');
// server.listen(3000);
//carga de archivos
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp',
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/', routes);

app.get('/home', (req, res) => {
    res.render('./index');
});

server.listen(port, () => {
    console.log('DEV-BODY, port:', port)
})
