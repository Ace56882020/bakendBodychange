
const { uploadValidate, uploadgetImg } = require('./../functions/validate-file-upload')
const uploadCtr = {};

uploadCtr.uploadFile = async (req, res) => {
    let status = 400
    let correct = false
    let answer;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(status).send('No files were uploaded.');
    }
    //carga de imagenes
    try {
        const file = await uploadValidate(req.files,)
        if (file) {
            status = 200
            correct = true
            answer = file
        }
        res.status(status).json({
            correct,
            resp: answer
        })
    } catch (error) {
        console.log(error)
    }
    
}

uploadCtr.viewFile = async (req, res) => {
    let status = 400
    let correct = false
    let answer;
    try {
        const img = req.body.img
        const file = await uploadgetImg(img)
        if (file) {
            status = 200
            correct = true
            answer = file
        }
        res.status(status).json({
            correct,
            resp: answer
        })
    } catch (error) {
        console.log(error)
    }
}


uploadCtr.cargarArchivo = async(req, res = response) => {


    try {
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

module.exports = uploadCtr;
