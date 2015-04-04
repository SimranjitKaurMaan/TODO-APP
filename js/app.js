
var addButton=document.getElementsByTagName("button")[0];
var taskInput =document.getElementById("new-task");
var incompleteTasksHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");
var addTask=function()
{
	console.log("add task");
  if(taskInput.value!="")
  {
  var listItem=createNewTask(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,completedTask);
  taskInput.value="";
 }
 else
 {
  alert("Empty task not allowed !!");
 }
  
}
var editTask=function()
{
	console.log("edit task");
  var listItem=this.parentNode;

  var editInput=listItem.querySelector("input[type=text]");
  var editButton=listItem.querySelector("button.edit");
  var label=listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
  if(containsClass)
    {
     label.innerText=editInput.value;
     editButton.innerText="Edit";
    } 
    else 
    {
      editInput.value=label.innerText;
      editButton.innerText="Save";
    }
    listItem.classList.toggle("editMode");

}
var deleteTask=function()
{
	console.log("delete task");
  var listItem=this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}
var incompleteTask=function()
{
	 console.log("incomplete task");
   var listItem = this.parentNode;
   incompleteTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem,completedTask);
  }
var completedTask=function()
{
	console.log("completed task");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,incompleteTask);
}

 var createNewTask=function(taskString)
 {
  var listItem = document.createElement("li");
  var checkBox= document.createElement("input");
  var label = document.createElement("label");//PayBills
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");


  checkBox.type="checkbox";
  editInput.type="text";
  
  editButton.innerText="edit";
  editButton.className="edit"
  deleteButton.innerText="delete";
  deleteButton.className="delete";
 
 label.innerText=taskString;
 
 listItem.appendChild(checkBox);
 listItem.appendChild(label);
 listItem.appendChild(editInput);
 listItem.appendChild(editButton);
 listItem.appendChild(deleteButton);
 
  return listItem;
 }

var bindTaskEvents=function(taskListItem,checkBoxEventHandler)
{
console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.addEventListener("click",editTask);
  
  //bind deleteTask to delete button
  deleteButton.addEventListener("click",deleteTask);
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}


//event handlers
addButton.addEventListener("click",addTask);
//binding of pre existing elements 
for (var i =0; i < incompleteTasksHolder.children.length; i++) 
{
	bindTaskEvents(incompleteTasksHolder.children[i],completedTask);
}

for (var i =0; i <completedTasksHolder.children.length; i++)
 {
	bindTaskEvents(completedTasksHolder.children[i],incompleteTask);
 }