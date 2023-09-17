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
        // const projectNames = projectStorage.projectStore.map(project => project.title);
        // const projectIds = projectStorage.projectStore.map(project => project.id)
        // console.log(projectNames,projectIds);
    });
}

function addButtonsToProject(){
    const rightContainer = document.getElementById("right-container-projects")

}

function changePage(){

}


function addProjectRemoveButton(ID){
    const newRemoveButton = document.createElement("button");
    newRemoveButton.id = `remove-project-${ID}`;
    newRemoveButton.className = "remove-project-button";
    newRemoveButton.textContent = "X";
    newRemoveButton.addEventListener("click", () => {
        removeProjectFromStorage(ID);
        removeProjectFromDOM(ID);
        removeProjectFromSidebar(ID)
    });
    return newRemoveButton;
}

function renderNewImages() {
    const leftProjectDiv = document.getElementById("right-container-projects")
}


function renderNewProject(newProject, ID){
    const projectDisplayDiv = document.getElementById("project-display")
    const newProjectDiv = document.createElement("div")
    newProjectDiv.id = `user-project-${ID}`;
    projectDisplayDiv.appendChild(newProjectDiv)

    const leftContainerProjects = document.createElement("div")
    leftContainerProjects.id = `left-container-projects-${ID}`
    const favourite = document.createElement('img');
    favourite.src = 'images/favourite.svg';
    favourite.id = `favourite-project-${ID}`
    favourite.className = "icons"
    leftContainerProjects.appendChild(favourite)
    const projectTitle = document.createElement("p")
    projectTitle.textContent = newProject.title;
    newProjectDiv.appendChild(leftContainerProjects)
    leftContainerProjects.appendChild(projectTitle)
  
    const rightContainerProjects =  document.createElement("div")
    rightContainerProjects.id = `right-container-projects-${ID}`

    const remove = document.createElement('img');
    remove.src = 'images/remove.svg';
    remove.id = `remove-project-${ID}`
    remove.className = "icons"

    const edit = document.createElement('img');
    edit.src = 'images/edit.svg';
    edit.id = `edit-project-${ID}`
    edit.className = "icons"

    const calender = document.createElement('img');
    calender.src = 'images/calender.svg';
    calender.id = `calender-project-${ID}`
    calender.className = "icons"

    const add = document.createElement('img');
    add.src = 'images/add.svg';
    add.id = `add-project-${ID}`
    add.className = "icons"

    rightContainerProjects.appendChild(add)
    rightContainerProjects.appendChild(remove)
    rightContainerProjects.appendChild(edit)
    rightContainerProjects.appendChild(calender)

    newProjectDiv.appendChild(rightContainerProjects)


    const addTaskDialog = document.getElementById("add-task-dialog")

    remove.addEventListener("click", () => {
        removeProjectFromStorage(ID);
        removeProjectFromDOM(ID);
        removeProjectFromSidebar(ID)
    });

    add.addEventListener("click", () => {
        handleAddTaskDialog()
    })

}

function displayProject(newProject, ID) {
    renderNewProject(newProject,ID)
    addProjectToSidebar(newProject.title, ID)
    addEditButtonToSidebar(ID)
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

function handleAddTaskDialog(){
    const addTaskDialog = document.getElementById("add-task-dialog")
    const closeTaskDialog = document.getElementById("close-task-dialog-button")
    const submitTaskDialog = document.getElementById("submit-task-button")
    
    addTaskDialog.showModal()

    addTaskDialog.addEventListener("submit", (e)=>{
        e.preventDefault()
    })

    closeTaskDialog.addEventListener("click", ()=>{
        addTaskDialog.close()
    });

    submitTaskDialog.addEventListener("click", ()=>{
        addTaskDialog.close()
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

function goToTaskPage(){

}



export { addProjectModalEvent, displayProject,handleModalEvents};
