const { pipeline } = require('stream');
const Task = require('../models/task');
const taskModel = require('../models/task');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Task'


const createTask = async (req, res) => {
    // console.log(req.userId)


    const { task, desc, status } = req.body;
   

    const newTask = new taskModel({
        task: task,
        desc: desc,
        status: status,
        userId: req.userId,
        
    })


    // const token = jwt.sign({id: newTask._id }, SECRET_KEY);
    // res.status(201).json({ Task: newTask,catId: newTask.catId, token: token })




    try {

        await newTask.save();
        res.status(201).json(newTask);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });


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

const deleteTask = (req, res) => {

}

const getTask = async (req, res) => {

    
    const id = req.params.id;
    try {


        const task = await taskModel.findByIdAndDelete(id);
        res.status(201).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }



    try {

        const task = await taskModel.find({ userId: req.userId });
        res.status(200).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }





}



const getcat = (req,res)=>{

    Task.aggregate([
        {
          $lookup: {
            from: 'Category', // Name of the collection to join
            localField: 'name',
            foreignField: '_id',
            let:{_id: "$_id"},
            as: 'Category',
            pipeline:[
                {$match:{$expr:{$eq: ['_id , $$_id']}}}
            ]
          }
        },
        {
          '$category' :{
            _id:1,
            name:1
          }

        }
      ])
      .exec(function(err, task) {
        if (err) {
          console.error('Error joining collections', err);
          return;
        }
      
        console.log(task); // Resulting joined documents
      });
      




}


module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask,
    getcat
}
