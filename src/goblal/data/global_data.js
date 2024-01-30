const global_data = {
  hdJson: { "Content-Type": "application/json" },
  hdText: { "Content-Type": "text/xml" },
  hdForm: { "Content-Type": "application/x-www-form-urlencoded" },
  urls: {
    getUser: "get-user",
    crtUser: "ctr-user",
    getUserById: "get-user-by-id",
    updateUser: "update-user",
    deleteUser: "delete-user",
    getJson: "get-json",
    getJsonTotal: "get-json-total",
    getCatalogo: "get-catalogo",

    //crypto
    encrypt: "encrypt",
    decrypt: "decrypt",
    //categories
    getCategories: "get-categories",
    //auth
    auth: "auth",

    //uploadFile
    uploadFile: "upload-file",
    viewFile: "view-file",
    uploadFileCloudinary: "upload-file-cloudinary",

    //formularios
    getForms: "get-forms",
    ctrForms: "ctr-forms",
    //alimentacion
    getEats: "get-eats",

    //QR
    generateQr: "generate-qr",
  },
  msgs: {
    errServer: "Error starting server",
    // startServerMsg: `Server is working on port: ${port}`,
    psqlConnected: "Postgresql connected", // Conexion con servidor back
    psqlConnectF: "Postgresql connected failure: ", // Conexion con servidor back
    formCrtdMsg: "Form created: ",
    updFormMsg: "Updated form: ",
    dltFormMsg: "Delete form id: ",
  },
};

module.exports = global_data;
