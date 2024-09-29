let input_field = document.querySelector("[input_field]");
let addTask_button = document.querySelector("[addTask_button]");
let lists_container = document.querySelector("[lists_container]");



function addTask(){
    if(input_field.value === ""){
        alert("Fill The Input Field !")
    }else{
        let li = document.createElement("li");
        li.innerHTML = input_field.value;
        lists_container.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = `<svg viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
        span.classList.add("del_list");
        li.appendChild(span);
        saveData();
    }
    
    // reset Input Field
    input_field.value = "";
}
// Event
addTask_button.addEventListener("click",addTask)



lists_container.addEventListener("click",(e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
   }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
   }else if(e.target.tagName === "svg"){
        e.target.parentElement.parentElement.remove();
        saveData();
   }else if(e.target.tagName === "path"){
        e.target.parentElement.parentElement.parentElement.remove();
        saveData();
   }
},false);



// save data To Local Storage
function saveData(){
    localStorage.setItem("data",lists_container.innerHTML);
}
// Show Save Data
function showData(){
    lists_container.innerHTML = localStorage.getItem("data");
}showData();