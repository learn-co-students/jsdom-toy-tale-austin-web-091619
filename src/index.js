let addToy = false

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
  })
  addToyInfo();
  

  const addToyForm = document.getElementsByClassName("add-toy-form")[0]
  addToyForm.addEventListener("submit", toyFormSubmission)
})

function addToyInfo() {
  
  fetch("http://localhost:3000/toys") 
    .then(response => response.json())
    .then(function(object) {
      object.forEach(toy => {
        makeAToyCard(toy)
      })
    } )
}
function makeAToyCard(toy){
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let paragraph = document.createElement("p")
  let button = document.createElement("button")
  button.addEventListener("click",addLike)
  button.classList.add("like-btn")
  button.innerHTML = "Like <3"
  h2.innerHTML = toy.name
  img.src = toy.image
  img.classList.add("toy-avatar")
  paragraph.innerHTML = `${toy.likes} Likes`
  let toyCard = document.createElement("div")
  toyCard.classList.add("card")
  toyCard.dataset.toyID = toy.id
  toyCard.dataset.toyLikes = toy.likes
  toyCard.append(h2, img, paragraph, button)
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.append(toyCard)
}
function toyFormSubmission(event){
  event.preventDefault();
  const nameInput = document.getElementById("name-input").value
  const urlInput = document.getElementById("url-input").value
  
  const toyObject= {
    name: nameInput,
    image: urlInput,
    likes: 0 
  } 
  const configObject = {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObject) 
  }
  fetch("http://localhost:3000/toys", configObject)
    .then(response => response.json())
    .then(function(toyObject){
      makeAToyCard(toyObject)
    })
}

function addLike(event){
  let cardObj = event.target.parentNode
  let newLikes = parseInt(cardObj.dataset.toyLikes) + 1
  let toyLikeID = parseInt(cardObj.dataset.toyID)

  const configObject = {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
    }
  
  fetch(`http://localhost:3000/toys/${toyLikeID}`,configObject)
    .then(response => response.json())
    .then(function(toyObject){
      cardObj.dataset.toyLikes = toyObject.likes
      const updatedParagraph = cardObj.querySelector("p")
      updatedParagraph.innerHTML = `${toyObject.likes} Likes`
    })

}
