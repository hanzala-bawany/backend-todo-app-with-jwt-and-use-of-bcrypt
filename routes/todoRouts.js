import express from "express"
import { checkToken } from "../middleware/checkToken.js"
import { addTodoController,getTodosController,getTodoController,deleteTodoController,updateTodoMassageController,replaceTodoController } from "../controllers/todoControllers.js"

const todoRoutes = express.Router()

todoRoutes.post('/addTodo',checkToken,addTodoController);
todoRoutes.patch('/updateTodoMassage/:todoName', updateTodoMassageController);
todoRoutes.put('/replaceTodo/:todoName', replaceTodoController);
todoRoutes.get('/getTodos', getTodosController);
todoRoutes.get('/getTodo/:todoName', getTodoController);
todoRoutes.delete('/deleteTodo/:todoName', deleteTodoController);


export { todoRoutes }
