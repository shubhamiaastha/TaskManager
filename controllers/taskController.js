
const Task = require('../models/task');
const taskModel = require('../models/task');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Task'


const createTask = async (req, res) => {
  


    const { task, desc, status } = req.body;



    const newTask = await taskModel.create({
        task: task,
        desc: desc,
        status: status,
        userId: req.userId,
        catId:req.body.catId


    })


    try {

        await newTask.save();
        res.status(201).json(newTask);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });


    }

}

const catByTask = async (req,res)=>{
    try{

        const taskData = await taskModel.find({_id:req.body.task_id}).populate('catId');
        res.status(200).json(taskData)



    }catch(err){
        console.log(err)
    }

}





const updateTask = async (req, res) => {



    const id = req.params.id;
    const { task, desc, status } = req.body;

    const newNote = {
        task: task,
        desc: desc,
        status: status,
        userId: req.userId
    }

    try {

        await taskModel.findByIdAndUpdate(id, newTask, { new: true });
        res.status(200).json(newNote);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: "something went wrong" });


    }

}

const deleteTask = async(req, res) => {

    
    const id = req.params.id;
    try {


        const task = await taskModel.findByIdAndDelete(id);
        res.status(201).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }

}

const getTask = async (req, res) => {

    try {

        const task = await taskModel.find({ userId: req.userId });
    
        res.status(200).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask,
    catByTask

}
