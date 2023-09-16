// import dom from './dom';

// const projects = (() =>{

//     class ProjectStorage{
//         constructor(){
//             this.projectStore = []
//         }
//     }
    
//     class Project{
//         constructor(title){
//             this.title = title
//             this.toDoStorage = []
//         }
//     }
    
//     function createProject(title){
//         return new Project(title);
//     }
    
    
//     class ToDo{
//         constructor(title,description, dueDate, priority,checkList){
//             this.title = title
//             this.description = description
//             this.dueDate = dueDate
//             this.priority = priority
//             this.completion = completion
//         }
//     }
//     return{
//         ProjectStorage,
//         Project,
//         createProject,
//         ToDo
//     }

// })();

export default projects;

class ProjectStorage {
    constructor(){
        this.projectStore = [];
    }

    addProject(project) {
        this.projectStore.push(project);
    }
}

class Project {
    constructor(title){
        this.title = title;
        this.toDoStorage = [];
    }
}

function createProject(title) {
    return new Project(title);
}

class ToDo{
    constructor(title,description, dueDate, priority,checkList){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completion = completion
    }
}
export { ProjectStorage, Project, ToDo, createProject};