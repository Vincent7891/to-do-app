import projects, { createProject, ProjectStorage} from './projects';
import createTask, { ToDo, createToDo} from './createTask';

const projectStorage = new ProjectStorage();

function createNewProject(projectTitle){
    const newProject = createProject(projectTitle);
    return newProject
}

function addProjectModalEvent() {
    const projectForm = document.getElementById("project-form");
    projectForm.addEventListener("submit", e => {
        e.preventDefault();
        const projectTitleInput = document.getElementById("project-name-dialogue");
        const projectTitle = projectTitleInput.value;
        const newProject = createNewProject(projectTitle)
        projectStorage.addProject(newProject);
        displayProject(newProject);
        handleAddTaskDialog(newProject);

        // const projectNames = projectStorage.projectStore.map(project => project.title);
        // const projectIds = projectStorage.projectStore.map(project => project.id)
        // console.log(projectNames,projectIds);

    });
}

function renderNewTasks(newProject, newTask) {

    const projectDisplay = document.getElementById("project-display");
    let existingProjectContainer = document.getElementById(`project-container-${newProject.id}`);
    const leftContainerTasks = document.createElement("div")  
    leftContainerTasks.id = `left-container-tasks-${newTask.id}`
    const rightContainerTasks = document.createElement("div") 
    rightContainerTasks.id = `right-container-tasks-${newTask.id}`
    const tick = createImage("images/tick.svg", `remove-project-${newTask.id}`, "icons") 
    leftContainerTasks.append(tick)
    const title = document.createElement('p')
    title.textContent = newTask.title
    leftContainerTasks.appendChild(title)

    const remove = createImage('images/remove.svg',`remove-task-${newTask.id}`,"icons")
    const edit = createImage('images/edit.svg',`edit-task-${newTask.id}`,"icons")

    rightContainerTasks.appendChild(remove)
    rightContainerTasks.appendChild(edit)


    const dueDateElement = document.createElement('span');
    dueDateElement.classList.add('due-date');
    dueDateElement.textContent = `Due: ${newTask.dueDate}`; 
    leftContainerTasks.appendChild(dueDateElement);

    const priorityElement = document.createElement('span');
    priorityElement.classList.add('priority');
    priorityElement.textContent = `Priority: ${newTask.priority}`; 
    leftContainerTasks.appendChild(priorityElement);

    const descriptionSnippetElement = document.createElement('span');
    descriptionSnippetElement.classList.add('description-snippet');

    const descriptionSnippet = newTask.description.split(' ').slice(0, 2).join(' ') + '...';
    descriptionSnippetElement.textContent = `Description: ${descriptionSnippet}`;
    leftContainerTasks.appendChild(descriptionSnippetElement);
    

    if (!existingProjectContainer) {
        const projectContainer = document.createElement("div");
        projectContainer.id = `project-container-${newProject.id}`;
        const project = document.getElementById(`user-project-${newProject.id}`);
        projectDisplay.insertBefore(projectContainer,project)
        projectContainer.appendChild(project);
        const taskContainer = document.createElement("div");
        taskContainer.id = `task-container-${newTask.id}`; 
        taskContainer.appendChild(leftContainerTasks)
        taskContainer.appendChild(rightContainerTasks)
        projectContainer.appendChild(taskContainer);
    } else {    
        const taskContainer = document.createElement("div");
        taskContainer.id = `task-container-${newTask.id}`;
        taskContainer.appendChild(leftContainerTasks)
        taskContainer.appendChild(rightContainerTasks)
        existingProjectContainer.appendChild(taskContainer);
    }

    remove.addEventListener('click', () =>{
        removeTaskFromDom(newTask)
        removeTaskFromStorage(newProject, newTask)
    })

    edit.addEventListener('click', () => {
        showEditTaskDialog(newProject, newTask);
    });

    tick.addEventListener('click', () => {
        title.classList.toggle('crossed-out');
        if (tick.src.endsWith('images/tick.svg')) {
            tick.src = 'images/tick_green.svg';
        } else {
            tick.src = 'images/tick.svg';
        }
        toggleTaskCompletion(projectStorage, newProject.id, newTask.id)

    });
}

function createImage(src, id, className){
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.id = id;
    imgElement.className = className;
    return imgElement;
}
  
function renderNewProject(newProject){

    const projectDisplayDiv = document.getElementById("project-display")
    const newProjectDiv = document.createElement("div")
    newProjectDiv.id = `user-project-${newProject.id}`;
    projectDisplayDiv.appendChild(newProjectDiv)

    const leftContainerProjects = document.createElement("div")
    leftContainerProjects.id = `left-container-projects-${newProject.id}`
    const favourite = createImage('images/favourite.svg',`favourite-project-${newProject.id}`,"icons")
    leftContainerProjects.appendChild(favourite)

    const projectTitle = document.createElement("p")
    projectTitle.textContent = newProject.title;
    newProjectDiv.appendChild(leftContainerProjects)
    leftContainerProjects.appendChild(projectTitle)
  
    const rightContainerProjects =  document.createElement("div")
    rightContainerProjects.id = `right-container-projects-${newProject.id}`

    const remove = createImage('images/remove.svg',`remove-project-${newProject.id}`,"icons")
    const edit = createImage('images/edit.svg',`edit-project-${newProject.id}`,"icons")
    const add = createImage('images/add.svg',`add-project-${newProject.id}`,"icons")
    // const calender = createImage('images/calender.svg',`calender-project-${newProject.id}`,"icons")

    rightContainerProjects.appendChild(add)
    rightContainerProjects.appendChild(remove)
    rightContainerProjects.appendChild(edit)
    // rightContainerProjects.appendChild(calender)

    newProjectDiv.appendChild(rightContainerProjects)

    const addTaskDialog = document.getElementById("add-task-dialog") 
    const closeTaskDialog = document.getElementById("close-task-dialog-button")
    remove.addEventListener("click", () => {
        removeProjectFromStorage(newProject);
        removeProjectFromDOM(newProject);
        removeProjectFromSidebar(newProject);
    });

    add.addEventListener("click", () => {
        addTaskDialog.showModal();
            const handleSubmit = (e) => {
            e.preventDefault();
            const newTask = createNewTask(newProject);
            renderNewTasks(newProject, newTask);
            addTaskDialog.close();
            addTaskDialog.removeEventListener('submit', handleSubmit);
        };   

        addTaskDialog.addEventListener("submit", handleSubmit);
        closeTaskDialog.addEventListener("click", () => {
            addTaskDialog.removeEventListener('submit', handleSubmit);
        });
    });

}

function handleAddTaskDialog(){
    const addTaskDialog = document.getElementById("add-task-dialog")
    const closeTaskDialog = document.getElementById("close-task-dialog-button")
    const submitTaskDialog = document.getElementById("submit-task-button")
    addTaskDialog.addEventListener("submit", (e)=>{
        e.preventDefault()
        addTaskDialog.close()
    })

    closeTaskDialog.addEventListener("click", ()=>{
        addTaskDialog.close()
    });

    submitTaskDialog.addEventListener("click", ()=>{
        addTaskDialog.close()
    });
}

function displayProject(newProject) {
    renderNewProject(newProject)
    addProjectToSidebar(newProject)
}

function removeTaskFromStorage(newProject, newTask){
    const index = newProject.toDoStorage.findIndex(task => task.id === newTask.id);
    if(index !== -1) {
        newProject.toDoStorage.splice(index, 1);
    }
}

function removeProjectFromStorage(ID) {
    //Go through the array, and find the ID of the object in the array that matches the real ID (the item we want to remove)
    const index = projectStorage.projectStore.findIndex(project => project.id === ID);
    projectStorage.projectStore.splice(index, 1);
}

function removeProjectFromDOM(newProject) {
    let container = document.getElementById(`project-container-${newProject.id}`)
    if (!container){
        const userProject = document.getElementById(`user-project-${newProject.id}`)
        userProject.remove()
    } else {
        container.remove() 
    }
}

function removeTaskFromDom(newTask){
    let container = document.getElementById(`task-container-${newTask.id}`)
    container.remove() 
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

function createNewTask(newProject){
    const toDoName = document.getElementById("add-task-title").value
    const toDoDescription = document.getElementById("add-task-description").value
    const toDoDueDate = document.getElementById("add-task-due-date").value
    const toDoPriority = document.getElementById("add-task-priority").value
    const completion = "false"
    const task = createToDo(toDoName,toDoDescription,toDoDueDate,toDoPriority,completion)
    newProject.addTaskToProject(task)
    return task
}

function addProjectToSidebar(newProject){
    const sidebarDiv = document.createElement("div")
    sidebarDiv.id = `sidebar-project-${newProject.id}`
    sidebarDiv.textContent = newProject.title
    const projectBar = document.getElementById("projects-bar")
    projectBar.appendChild(sidebarDiv)
}

function removeProjectFromSidebar(newProject){
    document.getElementById(`sidebar-project-${newProject.id}`).remove()
}

function showEditTaskDialog(newProject, newTask) {
    const editTaskDialog = document.getElementById("edit-task-dialog");
    const closeTaskDialog = document.getElementById("close-edit-task-dialog-button");
    const submitTaskDialog = document.getElementById("submit-edit-task-button");

    document.getElementById("edit-task-title").value = newTask.title;
    document.getElementById("edit-task-description").value = newTask.description;
    document.getElementById("edit-task-due-date").value = newTask.dueDate;
    document.getElementById("edit-task-priority").value = newTask.priority;

    editTaskDialog.showModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        newTask.title = document.getElementById("edit-task-title").value;
        newTask.description = document.getElementById("edit-task-description").value;
        newTask.dueDate = document.getElementById("edit-task-due-date").value;
        newTask.priority = document.getElementById("edit-task-priority").value;

        const leftContainerTasks = document.getElementById(`left-container-tasks-${newTask.id}`);
        leftContainerTasks.innerHTML = '';

        const tick = createImage("images/tick.svg", `remove-project-${newTask.id}`, "icons");
        leftContainerTasks.append(tick);
        tick.addEventListener('click', () => {
            title.classList.toggle('crossed-out');
            if (tick.src.endsWith('images/tick.svg')) {
                tick.src = 'images/tick_green.svg';
            } else {
                tick.src = 'images/tick.svg';
            }
            toggleTaskCompletion(projectStorage, newProject.id, newTask.id)
    
        });

        const title = document.createElement('p');
        title.textContent = newTask.title;
        leftContainerTasks.appendChild(title);

        const dueDateElement = document.createElement('span');
        dueDateElement.classList.add('due-date');
        dueDateElement.textContent = `Due: ${newTask.dueDate}`;
        leftContainerTasks.appendChild(dueDateElement);
  
        const priorityElement = document.createElement('span');
        priorityElement.classList.add('priority');
        priorityElement.textContent = `Priority: ${newTask.priority}`;
        leftContainerTasks.appendChild(priorityElement);

        const descriptionSnippetElement = document.createElement('span');
        descriptionSnippetElement.classList.add('description-snippet');
        const descriptionSnippet = newTask.description.split(' ').slice(0, 2).join(' ') + '...';
        descriptionSnippetElement.textContent = `Description: ${descriptionSnippet}`;
        leftContainerTasks.appendChild(descriptionSnippetElement);  
        updateTaskInfo(projectStorage, newProject.id, newTask.id, 'title', document.getElementById("edit-task-title").value);
        updateTaskInfo(projectStorage, newProject.id, newTask.id, 'description', document.getElementById("edit-task-description").value);
        updateTaskInfo(projectStorage, newProject.id, newTask.id, 'dueDate', document.getElementById("edit-task-due-date").value);
        updateTaskInfo(projectStorage, newProject.id, newTask.id, 'priority', document.getElementById("edit-task-priority").value);

        editTaskDialog.close();
        editTaskDialog.removeEventListener('submit', handleSubmit);
    };

    editTaskDialog.addEventListener("submit", handleSubmit);

    closeTaskDialog.addEventListener("click", () => {
        editTaskDialog.close();
        editTaskDialog.removeEventListener('submit', handleSubmit);
    });
}

function toggleTaskCompletion(projectStorage, projectId, taskId) {
    const project = projectStorage.projectStore.find(p => p.id === projectId);
    const task = project.toDoStorage.find(t => t.id === taskId);
    task.completion = !task.completion;
}

function updateTaskInfo(projectStorage, projectId, taskId, key, newValue) {
    const project = projectStorage.projectStore.find(p => p.id === projectId);
    const task = project.toDoStorage.find(t => t.id === taskId);
    task[key] = newValue;            
}

export { addProjectModalEvent, displayProject,handleModalEvents,handleAddTaskDialog};