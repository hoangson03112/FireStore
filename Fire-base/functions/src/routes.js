const Router = require("koa-router");
const { getTasks,addTask,updateTasks,deleTasks,getTask } = require("./func");

const router = new Router({
  prefix: "/api",
});

router.get("/todos", getTasks);
router.get("/todo", getTask);
router.post("/todos", addTask);
router.put("/todo", updateTasks);
router.delete("/todo", deleTasks);

module.exports = router;
