const ToDoModel= require('../models/ToDoModel')

module.exports.getToDo= async (req, res) => {
    const toDo= await ToDoModel.find()
    res.send(toDo)
}

module.exports.saveToDo= async (req, res) => {
    const { title } =req.body

    await ToDoModel.create({title})
        .then((data) => {
            console.log("added successfully...");
            console.log(data);
            res.send(data)
    })
}

module.exports.updateToDo= async (req, res) => {
    const {_id, title } =req.body

    ToDoModel.findByIdAndUpdate(_id, {title})
        .then(() => res.send("Updated Successfully..."))
        .catch((err) => console.log(err))
    
}

module.exports.deleteToDo= async (req, res) => {
    const {_id } =req.body

    ToDoModel.findByIdAndDelete(_id)
            .then(()=>res.send("Deleted Successfully..."))
            .catch((err)=> console.log(err))     
}