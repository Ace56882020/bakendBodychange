const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  estatura: {
    type: Number,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  rol: {
    type: String,
    required: false,
    default: 'user',
  },
  estado: {
    type: Boolean,
    required: false,
    default: true,
  },
  formularioChecked: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    required: false,
  },
  dataMedidas: {
    type: Array,
    required: false,
  },
  dataFormulario: {
    type: Array,
    required: false,
  },
  dataImagenes: {
    type: Array,
    required: false,
  },
  images: {
    type: String,
    required: false,
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
UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, ...Usuario } = this.toObject();
  Usuario.uid = _id;
  return Usuario;
};

module.exports = model("Usuario", UsuarioSchema);
