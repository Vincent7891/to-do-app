// import projects from './projects';

// const dom = (() => {
//     function addProjectModalEvent() {
//         const projectForm = document.getElementById("project-form");
//         projectForm.addEventListener("submit", e => {
//           e.preventDefault();
//           const projectTitleInput = document.getElementById("project-name-dialogue");
//           const projectTitle = projectTitleInput.value;
      
//           // Create the project and add it to your projects array
//           const newProject = projects.createProject(projectTitle); 
//           projects.ProjectStorage.push(newProject);
      
//           // Update the display
//           displayProject();
//         });
//     }
    
//     function displayProject() {
//         const projectDisplayDiv = document.getElementById("project-display");
//         projectDisplayDiv.innerHTML = "";
      
//         projects.forEach((project, index) => {
//           const newProjectDiv = document.createElement("div");
//           newProjectDiv.id = `user-project-${index + 1}`;
//           newProjectDiv.textContent = project.title;
//           projectDisplayDiv.appendChild(newProjectDiv);
//         });
//     }
      
    
//     function handleModalEvents(){
//         const addBookButton = document.getElementById('add-project-button');
//         const bookDialog = document.getElementById('dialog');
//         const closeDialogButton = document.getElementById('close-dialog-button');
//         const submit = document.getElementById('submit-project-button')
    
//         addBookButton.addEventListener('click', () => {
//             bookDialog.showModal();
//         });
    
//         closeDialogButton.addEventListener('click', () => {
//             bookDialog.close();
//         });
    
//         submit.addEventListener('click', () => {
//             bookDialog.close();
//         });
//     }
//     function initiateAll(){
//         handleModalEvents()
//         addProjectModalEvent()
//         displayProject()
//     }
//     return {
//     handleModalEvents,
//     addProjectModalEvent,
//     displayProject,
//     initiateAll
//     }
// })();

// export default dom;


import { createProject, ProjectStorage } from './projects';

const projectStorage = new ProjectStorage();

function addProjectModalEvent() {
    const projectForm = document.getElementById("project-form");
    
    projectForm.addEventListener("submit", e => {
        e.preventDefault();
        const projectTitleInput = document.getElementById("project-name-dialogue");
        const projectTitle = projectTitleInput.value;
        
        // Create the project and add it to projectStorage
        const newProject = createProject(projectTitle); 
        projectStorage.addProject(newProject);
        
        // Update the display
        displayProject();
        console.log(projectStorage, "is the storage left")
        // const projectNames = projectStorage.projectStore.map(project => project.title);
        // console.log(projectStorage.projectStore[0]);
    });
}

function displayProject() {
    const projectDisplayDiv = document.getElementById("project-display");    
    projectStorage.projectStore.forEach((project, index) => {
        const newProjectDiv = document.createElement("div");
        const newRemoveButton = document.createElement("button")
        newProjectDiv.id = `user-project-${index+1}`;
        newProjectDiv.textContent = project.title;

        newRemoveButton.id = `remove-project-${index+1}`;
        newRemoveButton.className = "remove-project-button";
        newRemoveButton.textContent = "X"

        newProjectDiv.appendChild(newRemoveButton);
        projectDisplayDiv.appendChild(newProjectDiv);
    });
}
function attachRemoveProjectEvents() {
    // Select all remove buttons
    const removeButtons = document.querySelectorAll('.remove-project-button');
    
    // Attach event listeners
    removeButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            removeProjectFromStorage(index);  // Function to remove project from storage
            removeProjectFromDOM(index);  // Function to remove project from DOM
        });
    });
}

function removeProjectFromStorage(index) {
    projectStorage.projectStore.splice(index, 1);
}

function removeProjectFromDOM(index) {
    const removeButton = document.getElementById(`remove-project-${index}`);
    if (removeButton) {
        const parentDiv = removeButton.parentNode;
        if (parentDiv) {
            parentDiv.remove();
        }
    }
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
export { addProjectModalEvent, displayProject,handleModalEvents, attachRemoveProjectEvents};

