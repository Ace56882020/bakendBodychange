const { Schema, model } = require('mongoose');

const AlimentacionSchema = Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dataEats: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now()
    }
});

//retirar campos que no deseo mostrar
AlimentacionSchema.methods.toJSON = function () {
    const { __v, _id, ...Alimentacion } = this.toObject();
    Alimentacion.uid = _id
    return Alimentacion
}

module.exports = model('eats', AlimentacionSchema);