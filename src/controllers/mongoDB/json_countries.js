const apiData = require("../../api.json");

const jsonCountries = {};

jsonCountries.getJson = async (req, res) => {
    let status=400;
    let correct=false;
    let answer;
    const provincia = req.body.provincia
    const canton = req.body.canton
    const data= apiData[0].ciudades
    const searchProv = data.find(rq => rq.codigo === provincia);
    const searchCanton = searchProv.cantones.find(rq => rq.codigo === canton);

    if(searchCanton!==undefined){
        answer=searchCanton
        console.log(answer)
        status=200
        correct=true
    }else{
        answer='not found'
    }
    res.status(status).json({
        correct,
        resp: answer
    });

};
jsonCountries.getJsonTotal = async (req, res) => {
    let status=400;
    let correct=false;
    let answer;
    const pais = req.body.pais
    const canton = req.body.canton
    const data= apiData
    const searchProv = data.find(rq => rq.codigo === pais);
    // const searchCanton = searchProv.cantones.find(rq => rq.codigo === canton);

    if(searchProv!==undefined){
        answer=searchProv
        console.log(answer)
        status=200
        correct=true
    }else{
        answer='not found'
    }
    res.status(status).json({
        correct,
        resp: answer
    });

};

module.exports = jsonCountries;
