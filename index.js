const btn =document.getElementById("add");
const content =document.getElementById("container")

btn.addEventListener("click", addtask);
    function addtask(){
    const box=document.createElement("div");
    box.classList.add("box");
    box.innerHTML=`
            <div class="menu">
               <i class="fa-solid fa-floppy-disk"></i>
                <i class="fa-regular fa-trash-can"></i>
            </div>
<textarea></textarea>
    `;
const save = box.querySelector(".fa-floppy-disk");
const remove = box.querySelector(".fa-trash-can");
const textarea = box.querySelector("textarea");

save.addEventListener("click",savetask);
textarea.addEventListener("input",savetask);
remove.addEventListener("click",()=>{
box.remove();
savetask();

});




content.appendChild(box);

};

function savetask(){
    const notes = document.querySelectorAll(".box textarea");
    const data = Array.from(notes)
        .map(item => item.value.trim())
        .filter(text => text !== "");

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}


function loadnotes() {
    const note = JSON.parse(localStorage.getItem("notes"));

    if (!note || note.length === 0) {
        addtask();
    } else {
        note.forEach(element => {
            addtask();
            const textarea = document.querySelectorAll(".box textarea");
            const lastnote = textarea[textarea.length - 1];
            lastnote.value = element;
        });
    }
}
loadnotes();