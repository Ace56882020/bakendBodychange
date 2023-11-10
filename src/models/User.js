const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  token: {
    type: String,
    required: true,
  },
  dataUser: {
    type: String,
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
