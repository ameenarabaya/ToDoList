
let colors = ["aquamarine", "#ffde59", "#c9b8da", "#ff914d", "#AEC33A"];
let notes = [
]
let taskname;
//get the task from local storage
function getTaskFromStroge() {
    let retrivedTasks = JSON.parse(localStorage.getItem("notes"));
    notes = retrivedTasks ?? []
}
getTaskFromStroge();

//store the array in the local storage
function storeTasks() {
    let taskString = JSON.stringify(notes)
    localStorage.setItem("notes", taskString);
};

// add the innerTasks to the bigNote
const addInnerTasks = (index) => {
    document.querySelector('.innerNotes').innerHTML = ``;
    let indev2 = 0;
    for (let i = 0; i < notes[index].innerTasks.length; i++) {
        document.querySelector('.innerNotes').innerHTML += `
   <h6 class='innertitle ${notes[index].innerTasks[i].click ? "done" : ""}' id="innertitle_${i}">${notes[index].innerTasks[i].title}
   <span onclick="editTask2(${index},${i})" class="material-symbols-outlined">
   edit_note
   </span>
   <i onclick="deleteTask2(${index}, ${i})"class="fa-solid fa-trash-can"></i>
   ${notes[index].innerTasks[i].click ? `
   
   <i onclick='toggleTaskCompletion(${index},${i})' class="fa-solid fa-xmark"></i>
   `: `
   <i onclick='toggleTaskCompletion(${index},${i})' class="fa-regular fa-circle-check"></i>
   `
            }
          <div class='date-div' id='div_${i}'> 
          <input id="note_${i}" onchange='storeDate(${i},${index})' class='input ${notes[index].innerTasks[i].click ? "done" : ""}'  type="datetime-local">
          </div>
          <p class="p_date">${notes[index].innerTasks[i].date}</p>
   </h6>
   `
        addobjects()
    }
}
//add the innerTasks to the small tasks outSide
const addtheTask = (i) => {
    let task = notes[i].innerTasks;
    let a = document.getElementById(`theTasks_${i}`);
    a.innerHTML = ``;
    for (let i = 0; i < task.length; i++) {
        a.innerHTML += `
        <div class="d-flex gap-2">
        <i class="fa-sharp fa-solid fa-thumbtack mt-1"></i>
        <h6>${task[i].title}</h6>
        </div>
        `
    }
}
// add the small note outSide
const addobjects = () => {
    document.getElementById('note').innerHTML = ``;
    let indev = 0;
    for (let i = 0, s = 0; i < notes.length; i++, s++) {
        if (s + 1 > colors.length) {
            s = 0;
        }
        document.getElementById('note').innerHTML += `
        <div class= "note  p-2 rounded" ${notes[i].index = s}  style="background-color:${colors[notes[i].index]}" >
        <div class=" icons  rounded-4 ">
                <div class="edit"><i onclick="edittask(${indev})" class="fa-regular fa-pen-to-square" style="color: #121b2b;"></i></div> 
                 <div class="delete"><i onclick="deletetask(${indev})" class="fa-solid fa-trash-can"></i></div>
                </div>
       <h3 class=" position-relative">${notes[i].noteTitle}<span><i class="fa-solid fa-expand fs-5 position-absolute end-0 mt-2" onclick={display(${i})} ></i></h3>
        <div class="theTasks" id="theTasks_${i}">
        </div>
        </div > `
        addtheTask(i);
        indev++;
    }
}
addobjects();

//the add Oparation of the small note
document.querySelector(".add").addEventListener("click", function () {
    swal({
        text: 'put your task name',
        content: "input",
        button: {
            text: "ok",
            closeModal: true,
        },
    }).then((val) => {
        if (val !== "" && val !== null) {
            taskname = val;
            let tasksob = {
                noteTitle: taskname,
                innerTasks: [],
            }
            notes.push(tasksob);
            storeTasks();
            addobjects();
        }
    });
});
let bigNote = document.querySelector('.bigNote');
let notess = document.querySelector('.contains');
// when expanded the small Note to Big Note
const display = (ind) => {
    let tasksobject = notes[ind];
    bigNote.innerHTML = `
    <div class="d-flex gap-5 justify-content-between title"><span class="taskTitle">${tasksobject.noteTitle}</span>
    <div  class="d-flex  mt-2 icons_inner rounded-4  justify-content-center align-items-center"> 
    <div class="icon text-end">
    <span class="material-symbols-outlined " onclick={putInnerTask(${ind})}>
heart_plus
</span>
    </div>
    <span class="text-end delete-icon"><i class="fa-solid fa-xmark" onclick={undisplay()}></i></span>
    </div>
    </div>
    <div class="innerNotes">
    </div>
    `
    bigNote.style.display = 'flex';
    var x = window.matchMedia("(max-width:768px)")
    media(x) // Call listener function at run time
    x.addListener(media)
    addInnerTasks(ind);
    addtheTask(ind);
}

const undisplay = (index) => {
    document.querySelector('.bigNote').style.display = 'none';
    document.querySelector('.contains').style.opacity = "1"
}

// the add operation of the innerTasks
let innerTaskName;
const putInnerTask = (index) => {
    swal({
        text: 'put your task name',
        content: "input",
        button: {
            text: "ok",
            closeModal: true,
        },
    }).then((val) => {
        if (val !== "" && val !== null) {
            innerTaskName = val;
            let tasksob = {
                title: innerTaskName,
                date: " ",
                click: false,
            }
            notes[index].innerTasks.push(tasksob);
            storeTasks();
            addInnerTasks(index);
        }
    });

}

//store the date
const storeDate = (i, index) => {
    let task = notes[index].innerTasks[i];
    task.date = document.getElementById(`note_${i}`).value;
    document.getElementById(`note_${i}`).value = task.date;
    addInnerTasks(index);
    storeTasks()
}
function media(x) {
    if (x.matches) { // If media query matches
        document.querySelector('.contains').style.opacity = "30%";
    } else {
        document.querySelector('.contains').style.opacity = "1";
    }
}


function deleteTask2(index, indev2) {
    let dis = document.getElementById(`innertitle_${indev2}`);
    swal({
        title: `Are you sure to delete The task ?`,
        text: "To confirm,if you delete the task you will not be able to retrieve it",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((value) => {
        let isconferm = value;
        if (isconferm == true) {
            dis.style.opacity = '30%'
            setTimeout(() => {
                notes[index].innerTasks.splice(indev2, 1);
                addInnerTasks(index);
                addobjects();
                storeTasks();
            }, 2000)
        }
    });

}
function editTask2(index, indev2) {
    swal({
        text: "put the new title you want ..",
        content: {
            element: "input",
            attributes: {
                value: notes[index].innerTasks[indev2].title,
            },
        },
        button: {
            text: "تاكيد",
            closeModal: true,
        },
    }).then((value) => {
        let newtasktitle = value;
        if (value != "" && value !== null) {
            notes[index].innerTasks[indev2].title = newtasktitle;
            storeTasks();
            addInnerTasks(index);
        }
    });

}


function deletetask(indev) {
    let test = notes[indev]

    swal({
        title: `Are you sure to delete ${test.noteTitle} task ? `,
        text: "To confirm, if you delete the task you will not be able to retrieve it",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((value) => {
        let isconferm = value;
        if (isconferm == true) {
            notes.splice(indev, 1)
            storeTasks();
            addobjects();
        }
    });
}


function edittask(indev) {
    let task = notes[indev];
    swal({
        text: "put the new title you want ..",
        content: {
            element: "input",
            attributes: {
                value: task.noteTitle,
            },
        },
        button: {
            text: "تاكيد",
            closeModal: true,
        },
    }).then((value) => {
        let newtasktitle = value;
        if (value != "" && value !== null) {
            task.noteTitle = newtasktitle;
            storeTasks();
            addobjects();
        }
    });
}

const toggleTaskCompletion = (index, i) => {
    let task = notes[index].innerTasks[i];
    task.click = !task.click;
    storeTasks();
    addInnerTasks(index);
}

