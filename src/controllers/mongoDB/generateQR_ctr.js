var fs = require('fs');
var QRCode = require("qrcode");
const generateQR_ctr = {};

generateQR_ctr.createQr = async (req, res) => {
  let status = 400;
  let correct = false;
  let answer;
  const sms = req.body.sms;
  const opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 0.3,
    margin: 1,
    color: {
      dark: "#2d665f", //color
      light: "#0000", //fondo
    },
  };

  QRCode.toDataURL(sms, opts, async function (err, url) {
    // const base = await converted(url)
    status = 200
    correct = true
    // console.log(url)
    res.status(status).json({
      correct,
      resp: url
    })
  })

};

module.exports = generateQR_ctr;
