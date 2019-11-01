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

  fetchToys()
  toySubmit()
})

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  }).then(function(toys) {
    toys.forEach(renderToys)
  })
}

function renderToys(toy) {
  let toyCard = document.createElement("div")
  toyCard.classList.add("card")
  toyCard.id = toy.id

    let toyName = document.createElement("h2")
    toyName.innerHTML = toy.name

    let toyImg = document.createElement("img")
    toyImg.classList.add("toy-avatar")
    toyImg.src = toy.image
    
    let toyLikes = document.createElement("p")
    toyLikes.innerHTML = `${toy.likes} Likes`

    let toyBtn = document.createElement("button")
    toyBtn.classList.add("like-btn")
    toyBtn.addEventListener("click", addLike)
    toyBtn.innerHTML = "Like <3"
    
  toyCard.append(toyName, toyImg, toyLikes, toyBtn)

  let toy_collection = document.querySelector("#toy-collection")
  toy_collection.appendChild(toyCard)
}

function toySubmit() {
  toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", newToy)
}

function newToy(e) {
  e.preventDefault()

  //Can be improved
  toyInfo = document.querySelectorAll(".input-text")
  let toyName = toyInfo[0].value
  let toyImg = toyInfo[1].value
  //

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImg,
      likes: 0
    })
  }
  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json()
  }).then(function(newToy) {
    renderToys(newToy)
  })
}

function addLike(e) {
  let toyLikeStr = e.target.parentElement.querySelector("p").innerHTML
  let toyLike = parseInt(toyLikeStr, 10) + 1
  let toyID = e.target.parentElement.id

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toyLike
    })
  }
  fetch(`http://localhost:3000/toys/${toyID}`, configObj)
  .then(function(response) {
    return response.json()
  }).then(function(edittedToy) {
    renderUpdatedToy(edittedToy)
  }) 
}

function renderUpdatedToy(toy) {
  document.getElementById(toy.id).querySelector("p").innerHTML = toy.likes + " Likes"
}