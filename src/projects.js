export default projects;

class ProjectStorage {
    constructor(){
        this.projectStore = [];
    }

    addProject(project) {
        this.projectStore.push(project);
    }

    get length(){
        return this.projectStore.length
    }
}

class Project {
    static nextID = 0; // Static property to keep track of the next ID to assign

    constructor(title, id){
        this.title = title;
        this.id = Project.nextID
        Project.nextID++; // Increment nextID for the next instance
        this.toDoStorage = [];
    }

    addTaskToProject(task){
        this.toDoStorage.push(task)
    }
}

function createProject(title) {
    return new Project(title);
}


export { ProjectStorage, Project, createProject};