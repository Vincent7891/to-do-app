export default createTask;

class ToDo{
    static nextID = 0; // Static property to keep track of the next ID to assign

    constructor(title,description, dueDate, priority,completion, id){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completion = completion
        this.id = ToDo.nextID
        ToDo.nextID++
    }
}

function createToDo(title, description, dueDate, priority, completion){
    return new ToDo(title, description, dueDate, priority, completion)
}

export {ToDo, createToDo};