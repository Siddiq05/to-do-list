const text = document.getElementById("text");
const taskbtn = document.querySelector('.task-btn');
const tasklist = document.querySelector('.task-list');




const addtotask = () => {
    if (text.value.trim() === '') {
        alert('please enter a task')  
    }
    else{
        const li = document.createElement('li');
        li.innerHTML = `<p>${text.value}</p>`
        tasklist.appendChild(li);
        const span = document.createElement('span');
        span.innerHTML = `<span>&times;</span>`
        li.appendChild(span);

        const remove = () => {
            li.remove();
            
        }
    
        span.addEventListener('click', remove)
    }
    text.value = '';
    
}




taskbtn.addEventListener('click', addtotask)

