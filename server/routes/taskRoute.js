const express = require("express");
const common = require("../common");
const Task = require("../models/task");
const router = express.Router();



router.get("/",common.verifyToken,async (req, res) => {
    let tasks = await Task.find();
    res.send(tasks);
    res.end();
});
  
router.get("/:id",common.verifyToken,async (req, res) => {
  try {
    let task = await Task.findOne({
        _id: req.params.id
    })
    if (task) {
      
    }
    res.status(200).send(task).end();
  }
  catch(error){
    res.status(500).send(error).end();
  }

});

router.post("/",common.verifyToken, async (req, res) => {
    const { title, description, priority,isDone } = req.body;
  
    try {
      const newTask = new Task({
        title,
        description,
        isDone,
        priority
      });
        
      newTask.save();
  
      res.status(201).json({ message: "Task registered successfully",Task: newTask });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while registering the task" });
    }
});

router.delete("/:id", common.verifyToken, async (req, res) => {
    try {
        await Task.deleteOne({
            _id: req.params.id
        })
        res.status(200).send("Task Deleted successfully").end();
      }
      catch(error){
        res.status(500).send(error).end();
      }
    
});



module.exports = router;
