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
  token: {
    type: String,
    required: false,
  },
  dataUser: {
    type: Array,
    required: true,
  },
  dateForm: {
    type: Array,
    required: true,
  },
  dataImage: {
    type: Array,
    required: true,
  },
  usuerName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    required: true,
  },
  statusUser: {
    type: Boolean,
    required: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now(),
  },
  dateUpdate: {
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
