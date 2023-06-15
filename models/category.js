const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    name: { type: String, 
          required: true 
    },
    userId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true

    },
    TaskId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        require:true

    }

    
   



}, { timestamps: true });

module.exports = mongoose.model('Category', categoriesSchema);