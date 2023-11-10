const { Schema, model } = require('mongoose');

const CategoriesSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

//retirar campos que no deseo mostrar
CategoriesSchema.methods.toJSON = function () {
    const { __v, _id, ...Categories } = this.toObject();
    Categories.uid = _id
    return Categories
}

module.exports = model('Categories', CategoriesSchema);