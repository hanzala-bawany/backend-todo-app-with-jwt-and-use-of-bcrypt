import { todos } from "../models/todoModel.js"
import { errorHandler, successHandler } from "../utills/responseHandle.js";

// add todo controller

export const addTodoController = async (req, res) => {

    console.log(req.loginUserId, "----> creator id");

    if (!req.loginUserId) return errorHandler(res, 404, `you have to login first`)

    console.log(req.body);
    const { todoName, todoMassage } = req.body;

    if (!todoName, !todoMassage) return errorHandler(res, 404, `missing fields`)

    try {
        await todos.create({
            todoName,
            todoMassage,
            creatorId: req.loginUserId
        })
        successHandler(res, 200, `todo is created successfully`)
    }
    catch (error) {
        console.log(error, "--> todos creation me error he");
    }

}

// update/patch todo controller

export const updateTodoMassageController = async (req, res) => {

    const loginUserId = req.loginUserId;
    console.log(req.body);
    const { todoName } = req.params;
    const { todoMassage } = req.body;

    if (!todoMassage) return errorHandler(res, 404, `missing fields`)

    try {

        // const updateTodo = await todos.findOneAndUpdate({ todoName: todoName }, { todoMassage: todoMassage }, { new: true });
        const updateTodo = await todos.findOneAndUpdate({ todoName: todoName }, { todoMassage: todoMassage });
        if (!updateTodo) return errorHandler(res, 404, `No Todo Found`)

        if (loginUserId !== updateTodo.creatorId) return errorHandler(res, 404, `you cannot update any others todo`)

        successHandler(res, 200, `todo is updated successfully`, updateTodo)
    }
    catch (error) {
        console.log(error, "--> todos updation me error he");
    }

}

// replace/put todo controller

export const replaceTodoController = async (req, res) => {

    console.log(req.body);

    const loginUserId = req.loginUserId;
    const { todoName } = req.params;

    console.log(todoName);

    if (!todoName || !req.body) return errorHandler(res, 404, `missing fields`)

    try {

        const replaceHoneWalaTodo = await todos.findOne({ todoName: todoName });
        if (loginUserId !== replaceHoneWalaTodo.creatorId) return errorHandler(res, 404, `you cannot relplace any others todo`)

        const replaceTodo = await todos.findOneAndReplace(
            { todoName: todoName },
            { ...req.body , creatorId: replaceHoneWalaTodo.creatorId }
        )
        console.log(replaceTodo);

        if (!replaceTodo) return errorHandler(res, 404, `No Todo Found`)

        successHandler(res, 200, `todo is replaced successfully`, replaceTodo)
    }
    catch (error) {
        console.log(error, "--> todos replaced me error he");
    }

}


// get todos controller

export const getTodosController = async (req, res) => {

    console.log(req.body);
    const allTodos = await todos.find({ todoName: { $exists: true } });
    // const allTodos = await todos.find({todoName : {$exists : true}}).sort({createdAt : 1});

    try {
        successHandler(res, 200, `data recieved succesfully`, allTodos)
    }
    catch (error) {
        console.log(error, "--> todos getting me error he");
    }

}

// get todo controller

export const getTodoController = async (req, res) => {

    console.log(req.params, "---> params");
    const getTodo = await todos.findOne({ todoName: req.params.todoName });
    console.log(getTodo, "---> get todo");


    if (!getTodo) return errorHandler(res, 404, `no todo found`)

    try {
        successHandler(res, 200, `todo recieved succesfully`, getTodo)
    }
    catch (error) {
        console.log(error, "--> todo getting me error he");
    }

}

// delete todo controller

export const deleteTodoController = async (req, res) => {

    const loginUserId = req.loginUserId;
    console.log(req.params);
    const {todoName} = req.params

    const deleteHoneWalaTodo = await todos.findOne({ todoName: todoName });
    if (loginUserId !== deleteHoneWalaTodo.creatorId) return errorHandler(res, 404, `you cannot delete any others todo`)

    const deleteTodo = await todos.findOneAndDelete({ todoName:todoName });

    if (!deleteTodo) return errorHandler(res, 404, `no todo found`)

    try {
        successHandler(res, 200, `todo deleted succesfully`, deleteTodo)
    }
    catch (error) {
        console.log(error, "--> todos deletion me error he");
    }

}