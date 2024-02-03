const router = require("express").Router();
const { urls } = require("../goblal/data/global_data");

/* Controllers mongoBD */
const usuarioCtr = require("../controllers/mongoDB/usuario_ctr");
const authCtr = require("../controllers/mongoDB/auth_ctr");
const jsonCountries = require("../controllers/mongoDB/json_countries");
const categoriesCtr = require("../controllers/mongoDB/categoies_ctr");
const cryptoCtr = require("../controllers/functions/crypto");
const uploadCtr = require("../controllers/mongoDB/upload_ctr");
const ejerciciosCtr = require("../controllers/mongoDB/ejercicios_ctr");
const generateQR_ctr = require("../controllers/mongoDB/generateQR_ctr");
const catalogoCtr = require("../controllers/mongoDB/catalogo_ctr");
const alimentacionCtr = require("../controllers/mongoDB/alimentacion_ctr");


// users
router.post(`/${urls.getUser}`, usuarioCtr.getUser);
router.post(`/${urls.crtUser}`, usuarioCtr.createuser);
router.post(`/${urls.getUserById}`, usuarioCtr.getUserById);
router.post(`/${urls.updateUser}`, usuarioCtr.updateUser);

//categories
router.post(`/${urls.getCategories}`, categoriesCtr.getCategories);

//catalogo
router.post(`/${urls.getCatalogo}`, catalogoCtr.getCatalogo);
//auth
router.post(`/${urls.auth}`, authCtr.login);

//countries json
router.post(`/${urls.getJson}`, jsonCountries.getJson);
router.post(`/${urls.getJsonTotal}`, jsonCountries.getJsonTotal)

//crypto
router.post(`/${urls.encrypt}`, cryptoCtr.encrypt)
router.post(`/${urls.decrypt}`, cryptoCtr.decrypt)

//uploadFile
router.post(`/${urls.uploadFileCloudinary}`, uploadCtr.uploadCloudinary);
router.post(`/${urls.viewFile}`, uploadCtr.viewFile);
router.post(`/${urls.uploadFile}`, uploadCtr.uploadFile);

//formularios
router.post(`/${urls.getForms}`, ejerciciosCtr.getFormsById);
router.post(`/${urls.ctrForms}`, ejerciciosCtr.createForm);

//alimentacion
router.post(`/${urls.getEats}`, alimentacionCtr.getEatsById);

//Qr
router.post(`/${urls.generateQr}`, generateQR_ctr.createQr)

module.exports = router;
