const categoryModel = require('../models/category');


const createCategory = async (req, res) => {
    // console.log(req.userId)


    const { name } = req.body;

    const newCategory = new categoryModel({
        name: name,
        userId: req.userId,

    })
    try {



        await newCategory.save();
        res.status(201).json({ newCategory });


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });


    }

}



const getCategory = async (req, res) => {


    try {

        const cat = await categoryModel.find();
    
        res.status(200).json(cat);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }





}

module.exports = {
    createCategory,
    getCategory
    
}