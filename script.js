const text = document.getElementById("text");
const taskbtn = document.querySelector('.task-btn');
const tasklist = document.querySelector('.task-list');




const addtotask = () => {
    const textInput = text.value.trim();
    if (textInput === '') {
        alert('please enter a task')  
    } 
    else{
      addItems(textInput) ;
      saveToLocalStorage(); 
    }
    text.value = '';
    
}
const addItems = (textInput) =>{
    const li = document.createElement('li');
    li.innerHTML = `<p>${textInput}</p>`;
    tasklist.appendChild(li);

    const save = document.createElement('span');
    save.textContent = "Save"; // Set text directly without a nested span
    save.style.display = "none"; // Initially hidden
    save.classList.add('save');
    li.appendChild(save);
    
    const edit = document.createElement('span');
    edit.innerHTML = `<span>Edit</span>`
    edit.classList.add('edit');
    li.appendChild(edit);
    
    const remove = document.createElement('span');
    remove.innerHTML = `<span>&times;</span>`
    remove.classList.add('remove');
    li.appendChild(remove);
    console.log(li);

    
    save.addEventListener('click', () => {
        pTag.contentEditable = false; // Disable editing
        edit.style.display = 'inline'; // Show the "edit" button
        save.style.display = 'none'; // Hide the "save" button
        saveToLocalStorage(); // Save the updated list to local storage
    });
    
    
    edit.addEventListener('click', () => {
        pTag.contentEditable = true; // Make the <p> tag editable
        pTag.focus(); 
        // Focus on the <p> tag to edit text
        edit.style.display = 'none'; // Hide the "edit" button during editing
        save.style.display = 'inline';
    });




    const pTag = li.querySelector('p');
    
    pTag.addEventListener('blur', () => {
            // Finalize the edit if the content is not blank
            pTag.contentEditable = false;
            edit.style.display = 'inline';
            save.style.display = 'none';
            saveToLocalStorage();
    
    });
   
    pTag.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent newline on Enter
            pTag.blur(); // Trigger blur to save changes
        }
    });
    
    
    
    remove.addEventListener('click', () => {
        // li.remove();
        remove.parentElement.remove();
        saveToLocalStorage(); 
        
    }) 
}


taskbtn.addEventListener('click', addtotask)

const saveToLocalStorage = () =>{
    const taskListItems = document.querySelectorAll('.task-list li p');
    const tasks = [];

    taskListItems.forEach(item => {
        tasks.push(item.textContent);
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks.forEach(textInput => {
        addItems(textInput);
    })
}
window.onload = loadFromLocalStorage;
