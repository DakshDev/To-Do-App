let input_field = document.querySelector("[input_field]");
let addTask_button = document.querySelector("[addTask_button]");
let lists_container = document.querySelector("[lists_container]");



function addTask(){
    if(input_field.value === ""){
        alert("Fill The Input Field !")
    }else{
        let li = document.createElement("li");
        lists_container.appendChild(li);
        let p = document.createElement("p")
        p.innerText = input_field.value;
        li.appendChild(p)
        let span = document.createElement("span");
        span.innerHTML = `<svg viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
        span.classList.add("del_list");
        li.appendChild(span);
        let div = document.createElement("div");
        div.classList.add("edit_list")
        div.innerHTML = `<img src="./edit.png">`;
        li.appendChild(div)
        saveData();
    }
    
    // reset Input Field
    input_field.value = "";
}

// Event Click By Enter Button
input_field.addEventListener("keydown",(e)=>{
    if(e.key === "Enter") addTask();
})
// Event Click By Add Task Button
addTask_button.addEventListener("click",addTask)


lists_container.addEventListener("click",(e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        e.target.firstElementChild.classList.toggle("checked");
        saveData();
   }else if(e.target.tagName === "P"){
        e.target.classList.toggle("checked");
        e.target.parentElement.classList.toggle("checked");
        saveData();
   }
   else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
   }else if(e.target.tagName === "svg"){
        e.target.parentElement.parentElement.remove();
        saveData();
   }else if(e.target.tagName === "path"){
        e.target.parentElement.parentElement.parentElement.remove();
        saveData();
   }else if(e.target.tagName === "DIV"){
        edit_list_fun(e.target.parentElement.firstElementChild.innerText,function(val){
            e.target.parentElement.firstElementChild.innerText = val;
            saveData();
        });
   }else if(e.target.tagName === "IMG"){
        edit_list_fun(e.target.parentElement.parentElement.firstElementChild.innerText,function(val){
            e.target.parentElement.parentElement.firstElementChild.innerText = val;

            saveData();
        });
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




// Edit List
function edit_list_fun(val,cb){
    let edit_list = document.querySelector(".edit_list");
    let edit_List_Container = document.querySelector("[edit_List_Container]");
    let btn = document.querySelector("[edit_List_Container] button");
    let textarea = document.querySelector("[edit_List_Container] textarea");
    let a = document.querySelector("[edit_List_Container] a");
    edit_List_Container.style.display = "flex";
    edit_List_Container.firstElementChild.firstElementChild.nextElementSibling.value = val;
    

    btn.addEventListener("click",function(){
        edit_List_Container.style.display = "none";
        cb(textarea.value);
        
    })
    a.addEventListener("click",function(e){
        e.preventDefault();
        edit_List_Container.style.display = "none";
    })
}