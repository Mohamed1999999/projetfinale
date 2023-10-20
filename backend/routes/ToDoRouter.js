const {Router}= require('express')
const router= Router()

const {getToDo, saveToDo,updateToDo,deleteToDo} = require("../controllers/ToDoController")
router.get('/', getToDo)
router.post('/save', saveToDo)
router.post('/update', updateToDo)
router.post('/delete', deleteToDo)



module.exports = router