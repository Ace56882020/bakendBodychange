const { Schema, model } = require('mongoose');

const EjerciciosSchema = Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    dataRutina: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

//retirar campos que no deseo mostrar
EjerciciosSchema.methods.toJSON = function () {
    const { __v, _id, ...Ejercicios } = this.toObject();
    Ejercicios.uid = _id
    return Ejercicios
}

module.exports = model('Ejercicios', EjerciciosSchema);