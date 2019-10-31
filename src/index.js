let addToy = false
let toyCollect = document.querySelector('#toy-collection')
var likes = 0
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
   } else {
     toyForm.style.display = 'none'
    }
    initializeForm();
    fetchToys();
  })
  
  
  function fetchToys() {
    fetch("http://localhost:3000/toys")
    .then(function(response) { return response.json()})
    .then(function(toysArray){
      toysArray.forEach(renderToys)
    })
 }
 

 
 
 
 
 function initializeForm() {
   let form = document.querySelector('.add-toy-form')
   form.addEventListener("submit", handleFormSubmission)
  }
function handleFormSubmission(e) {
  e.preventDefault();
  let nameInput = document.getElementById("name").value;
  let imageInput = document.getElementById("image").value;
  let toy_data = {
    name: nameInput,
    image: imageInput
  }
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "appliation/json"
    },
    body: JSON.stringify(toy_data)
  }
  fetch("http://localhost:3000/toys", configObject)
  .then(function(response){
    return response.json();
    })
    .then(function(newToy){
      
      renderToys(newToy);
    })
  }
  
  
  
  
  
  function renderToys(toyObj) {
    let toyCard = document.createElement("div");
    toyCard.classList.add("card");
    toyCard.id = `toy-${toyObj.id}`;
    let toyHeader = document.createElement("h2");
    toyHeader.innerText = toyObj.name
    let toyImg = document.createElement("img");
    toyImg.classList.add("toy-avatar")
    toyImg.src = toyObj.image
    let toyLikes = document.createElement("p");
    toyLikes.setAttribute("id", `${toyObj.id}-likes`);
    toyLikes.innerText = `${toyObj.likes} Likes`;
    let toyBtn = document.createElement("button");
    toyBtn.classList.add("like-btn")
    toyBtn.innerHTML = "like <3"
    toyCard.append(toyHeader, toyImg, toyLikes, toyBtn)
    let toyCollection = document.querySelector("#toy-collection")
    toyCollection.append(toyCard)
    
    toyBtn.addEventListener("click", function(){
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": toyObj.likes++
        })
      })
      toyCard.querySelector("p").innerText = `${toyObj.likes} Likes`
      
        })
   
   
      
    
        }
 
  })

