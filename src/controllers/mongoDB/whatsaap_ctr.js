const { decrypt } = require('./../functions/crypto.js')
const venom = require("venom-bot");
const whatsappCtr = {};
let session = {};
//iniciando sesion
whatsappCtr.initSession = async (req, res) => {
    const phone = '5930984938024';

    venom
        .create({
            session: "session-bodychange", //name of session
            multidevice: true, // for version not multidevice use false.(default: true)
        })
        .then(function start(client) {
            session = client;
            client
                .sendText(`${phone}@c.us`, 'Ejecutando Venom 🕷')
                .then((result) => {
                    return result;
                })
                .catch((erro) => {
                    console.error("Error when sending: ", erro); //return object error
                });
        })
        .catch((erro) => {
            console.log(erro);
        });
};

//envio de mensajes
whatsappCtr.sendMessageRegister = async (req, res) => {
    // Send message with options
    const generaUsuario = req.generaUsuario
    const params = req.updateUser;
    const msg = req.msg
    // const generaUsuario = await generarUsuario(params)
    const textoGenerado = await contentTextoRegister(params, generaUsuario, msg)
    await session
        .sendText(`${params.movil}@c.us`, textoGenerado)
        .then((result) => {
            console.log("Result: ", result); //return object success
            res.status(200).json(result);
        })
        .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
            res.status(400).json(erro);
        });
};

const contentTextoRegister = async (data, generaUsuario, msg) => {
    console.log(generaUsuario)
    const credenciales = generaUsuario
    const modulo = msg
    const params = data
    switch (modulo) {
        case "registro":
            texto = `¡Hola! ${params.nombre} ${params.apellido} Bienvenido a BODY-CHANGE. Las credenciales de ingreso son: Usuario ${credenciales.usuarioLogin} - contraseña ${credenciales.password}`;
            break;
        case "soporte":
            texto = `¡Hola! ${params.nombre} ${params.apellido}, Soporte ${params.msg} `;
            break;
    }
    return texto
}

//registro de usuario mensaje
whatsappCtr.sendMessage = async (req, res) => {
    // Send message with options
    const params = req.body;
    const textoGenerado = await contentTexto(params)
    await session
        .sendText(`593${params.movil}@c.us`, textoGenerado)
        .then((result) => {
            console.log("Result: ", result); //return object success
            const { text, status } = result;
            res.status(200).json({ text, status });
        })
        .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
            res.status(400).json(erro);
        });
};

const contentTexto = async (data) => {
    const modulo = 'registro'
    const params = data
    params.password = await decrypt(params.password)
    switch (modulo) {
        case "registro":
            texto = `¡Hola! ${params.nombre} ${params.apellido} Bienvenido a BODY-CHANGE. Las credenciales de ingreso son: Usuario ${params.login} - contraseña ${params.password}`;
            break;
        case "soporte":
            texto = `¡Hola! ${params.nombre} ${params.apellido}, Soporte ${params.msg} `;
            break;
    }
    return texto
}

whatsappCtr.sendMessageBtn = async (req, res) => {
    // Send Messages with Buttons Reply
    const buttons = [
        {
            buttonText: {
                displayText: "Text of Button 1",
            },
        },
        {
            buttonText: {
                displayText: "Text of Button 2",
            },
        },
    ];
    await session
        .sendButtons("59308938024@c.us", "Title", buttons, "Description")
        .then((result) => {
            console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
        });
};

whatsappCtr.sendMessageImg = async (req, res) => {
    // Send image (you can also upload an image using a valid HTTP protocol)
    const params = req.body;
    await session
        .sendImage(
            `${params.number}@c.us`,
            `${process.env.publicPath}` + "/img/logo.jpeg",
            "Logo",
            `Promociones para el numero registrado ${params.number}`
        )
        .then((result) => {
            console.log("Result: ", result); //return object success
            res.status(200).json(result);
        })
        .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
        });
};

whatsappCtr.sendMessageIMG64 = async () => {
    // Send image file base64
    await session
        .sendImageFromBase64("000000000000@c.us", base64Image, "name file")
        .then((result) => {
            console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
        });
};

whatsappCtr.sendMessageTrue = async () => {
    //checks and returns whether a message and a reply
    // exemple:
    // await session.onMessage(async (message) => {
    //     console.log(await session.returnReply(message)); // replicated message
    //     console.log(message.body ); //customer message
    //   })
    // checkReply = await session.returnReply(messagem);
    // console.log(checkReply,"checkReply")
};

module.exports = whatsappCtr;
