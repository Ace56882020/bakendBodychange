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
  correo: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: false,
  },
  estatura: {
    type: Number,
    required: false,
  },
  peso: {
    type: Number,
    required: false,
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
  suscripcion: {
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
