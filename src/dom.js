import projects, { createProject, ProjectStorage } from './projects';

const projectStorage = new ProjectStorage();

let ID = 0

function addProjectModalEvent() {
    const projectForm = document.getElementById("project-form");
    projectForm.addEventListener("submit", e => {
        e.preventDefault();
        const projectTitleInput = document.getElementById("project-name-dialogue");
        const projectTitle = projectTitleInput.value;
        
        const newProject = createProject(projectTitle,ID)
        projectStorage.addProject(newProject);

        displayProject(newProject,ID);
        ID += 1


        const projectNames = projectStorage.projectStore.map(project => project.title);
        const projectIds = projectStorage.projectStore.map(project => project.id)
        console.log(projectNames,projectIds);
    });
}

// function addRemoveButtonForProject(ID){

// }

function displayProject(newProject, ID) {

    const projectDisplayDiv = document.getElementById("project-display");
    const newProjectDiv = document.createElement("div");
    const newRemoveButton = document.createElement("button");
    newProjectDiv.id = `user-project-${ID}`;
    newProjectDiv.textContent = newProject.title;

    newRemoveButton.id = `remove-project-${ID}`;
    newRemoveButton.className = "remove-project-button";
    newRemoveButton.textContent = "X";
    newProjectDiv.appendChild(newRemoveButton);
    projectDisplayDiv.appendChild(newProjectDiv);

    addProjectToSidebar(newProject.title, ID)
    addEditButtonToSidebar(ID)
    addTaskButtonToProject(ID)

    newRemoveButton.addEventListener("click", () => {
        removeProjectFromStorage(ID);
        removeProjectFromDOM(ID);
        removeProjectFromSidebar(ID)
        const projectNames = projectStorage.projectStore.map(project => project.title);
        const projectIds = projectStorage.projectStore.map(project => project.id)
        console.log(projectNames,projectIds);
    });
}


function removeProjectFromStorage(ID) {
    //Go through the array, and find the ID of the object in the array that matches the real ID (the item we want to remove)
    const index = projectStorage.projectStore.findIndex(project => project.id === ID);
    projectStorage.projectStore.splice(index, 1);
}

function removeProjectFromDOM(ID) {
    const removeButton = document.getElementById(`remove-project-${ID}`);
    const parentDiv = removeButton.parentNode;
    parentDiv.remove();
}


function handleModalEvents(){
    const addBookButton = document.getElementById('add-project-button');
    const bookDialog = document.getElementById('dialog');
    const closeDialogButton = document.getElementById('close-dialog-button');
    const submit = document.getElementById('submit-project-button')

    addBookButton.addEventListener('click', () => {
        bookDialog.showModal();
    });

    closeDialogButton.addEventListener('click', () => {
        bookDialog.close();
    });

    submit.addEventListener('click', () => {
        bookDialog.close();
    });
}

function addProjectToSidebar(projectName, ID){
    const sidebarDiv = document.createElement("div")
    sidebarDiv.id = `sidebar-project-${ID}`
    sidebarDiv.textContent = projectName
    const projectBar = document.getElementById("projects-bar")
    projectBar.appendChild(sidebarDiv)
}

function removeProjectFromSidebar(ID){
    document.getElementById(`sidebar-project-${ID}`).remove()
}

function addEditButtonToSidebar(ID){
    const projectSidebar = document.getElementById(`sidebar-project-${ID}`)
    const editButton = document.createElement("button")
    editButton.id = `sidebar-project-button-${ID}`
    editButton.textContent = "edit project"
    projectSidebar.appendChild(editButton)
}

function addTaskButtonToProject(ID){
    const projectDiv = document.getElementById(`user-project-${ID}`)
    const addTaskButton = document.createElement("button")
    addTaskButton.id = `add-task-button-${ID}`
    addTaskButton.textContent = "add a task"
    projectDiv.appendChild(addTaskButton)
}


export { addProjectModalEvent, displayProject,handleModalEvents};
