const router = require("express").Router();
const { urls } = require("../goblal/data/global_data");

/* Controllers mongoBD */
const userCtr = require("../controllers/mongoDB/user_ctr");
const authCtr = require("../controllers/mongoDB/auth_ctr");
const jsonCountries = require("../controllers/mongoDB/json_countries");
const categoriesCtr = require("../controllers/mongoDB/categoies_ctr");
const cryptoCtr = require("../controllers/functions/crypto");
const uploadCtr = require("../controllers/mongoDB/upload_ctr");
const formularioCtr = require("../controllers/mongoDB/formularios_ctr");
const generateQR_ctr = require("../controllers/mongoDB/generateQR_ctr");
const catalogoCtr = require("../controllers/mongoDB/catalogo_ctr");
const alimentacionCtr = require("../controllers/mongoDB/alimentacion_ctr");


// users
router.post(`/${urls.getUser}`, userCtr.getUser);
router.post(`/${urls.crtUser}`, userCtr.createuser);
router.post(`/${urls.getUserById}`, userCtr.getUserById);
router.post(`/${urls.updateUser}`, userCtr.updateUser);

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
router.post(`/${urls.getForms}`, formularioCtr.getFormsById);
router.post(`/${urls.ctrForms}`, formularioCtr.createForm);

//alimentacion
router.post(`/${urls.getEats}`, alimentacionCtr.getEatsById);

//Qr
router.post(`/${urls.generateQr}`, generateQR_ctr.createQr)

module.exports = router;
