const { Schema, model } = require("mongoose");

const AlimentacionSchema = Schema({
  id: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  dataAlimento: {
    type: Array,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  fechaModificacion: {
    type: Date,
    default: Date.now(),
  },
});

//retirar campos que no deseo mostrar
AlimentacionSchema.methods.toJSON = function () {
  const { __v, _id, ...Alimentacion } = this.toObject();
  Alimentacion.uid = _id;
  return Alimentacion;
};

module.exports = model("Alimentacion", AlimentacionSchema);
