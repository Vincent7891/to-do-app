export default createTask;

class ToDo{
    constructor(title,description, dueDate, priority,completion, id){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completion = completion
        this.id = id
    }
}

function createToDo(title, description, dueDate, priority, completion, id){
    return new ToDo(title, description, dueDate, priority, completion, id)
}

export {ToDo, createToDo};