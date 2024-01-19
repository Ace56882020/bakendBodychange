const { Schema, model } = require("mongoose");

const UserSchema = Schema({
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
  },
  estado: {
    type: Boolean,
    required: false,
  },
  formularioChecked: {
    type: Boolean,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
  dataMedidas: {
    type: String,
    required: false,
  },
  dataFormulario: {
    type: String,
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
UserSchema.methods.toJSON = function () {
  const { __v, _id, ...User } = this.toObject();
  User.uid = _id;
  return User;
};

module.exports = model("User", UserSchema);
