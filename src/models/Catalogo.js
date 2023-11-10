const { Schema, model } = require('mongoose');

const CatalogosSchema = Schema({
    data: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: false
    }
});

//retirar campos que no deseo mostrar
CatalogosSchema.methods.toJSON = function () {
    const { __v, _id, ...Catalogos } = this.toObject();
    Catalogos.uid = _id
    return Catalogos
}

module.exports = model('Catalogos', CatalogosSchema);