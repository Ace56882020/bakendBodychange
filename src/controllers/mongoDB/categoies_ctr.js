const Categories = require("../../models/Categories");

const categoriesCtr = {};

categoriesCtr.getCategories = async (req, res) => {
    let correct = false;
    let status = 400;
    let answer;
    try {
        const categories = await Categories.find()
        if (categories) {
            correct = true;
            status = 200
            answer = categories
        } else {
            answer = 'not found'
        }
        res.status(status).json({
            correct,
            resp: categories
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports = categoriesCtr;