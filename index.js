const imagesContainer = document.getElementById('menu-bar')
const detailsContainer = document.getElementById('detail') 
const yearsActive = document.querySelector('#yearsActive')
const victimCount = document.querySelector('#victims')
const description = document.querySelector('#description')
const addForm = document.querySelector('form.addKillerForm')
addForm.addEventListener('submit', e => {
    e.preventDefault()
    addKiller(e)
    addForm.reset()
})

let detailImage = document.getElementById("detail-image")
let currentKillerDislikes;
let currentKillerId;


fetch('http://localhost:3000/serialKillers')
 .then(response => response.json())
 .then(killers => {
    killers.forEach(killer => {
        let img = document.createElement('img')
        img.addEventListener('click', e => {
            let currentId = e.target.id
            currentKillerId = e.target.id
            displayDetails(currentId)
        })
        img.src = killer.image
        img.id = killer.id
        img.title = killer.name
        imagesContainer.appendChild(img)
    })
    displayDetails(killers[0].id)
    currentKillerId = killers[0].id
 })

function displayDetails(id) { 
    fetch(`http://localhost:3000/serialKillers/${id}`) 
        .then(response => response.json()) 
        .then(killer => {
            // clears out the current details
            detailsContainer.innerHTML = ``
            detailImage.src = ""

            //name
            let name = document.createElement(`h1`)
            name.id = "killerName"
            name.textContent = killer.name
            detailsContainer.appendChild(name)
            
            detailImage.src = killer.image

            // countries active
            let countriesActive = document.createElement(`h1`)
            countriesActive.id = "countriesActive"
            let countriesString
            killer.country.forEach(country => {
                if (country === killer.country[0]){
                    countriesString = country
                } else{
                    countriesString = countriesString + `, ${country}`
                }
            })
            countriesActive.textContent = `Countries Active: ${countriesString}`
            detailsContainer.appendChild(countriesActive)

            // vitcim count
            let victimCount = document.createElement('h1')
            victimCount.id = "victimCount"
            victimCount.textContent = `Victim Count: ${killer.numberVictims}`
            detailsContainer.appendChild(victimCount)

            // years active
            let yearsActive = document.createElement('h1')
            yearsActive.id = "yearsActive"
            yearsActive.textContent = `Years Active: ${killer.yearsActive}`
            detailsContainer.appendChild(yearsActive)

            // description
            let description = document.createElement('p')
            description.id = "description"
            description.textContent = `${killer.description}`
            detailsContainer.appendChild(description)

            // number of dislikes
            let dislikes = document.createElement('h1')
            dislikes.id = "dislikes"
            dislikes.textContent = `Dislikes: ${killer.dislikes}`
            currentKillerDislikes = killer.dislikes
            detailsContainer.appendChild(dislikes)
            
            // dislike button
            let dislikeButton = document.createElement('button')
            dislikeButton.textContent = 'Dislike'
            dislikeButton.id = killer.id
            dislikeButton.addEventListener('click', dislikeKiller)
            detailsContainer.appendChild(dislikeButton)

            // delete button
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete'
            deleteButton.id = 'Delete'
            deleteButton.addEventListener('click', e => {
                deleteKiller(currentKillerId)
            })
            detailsContainer.appendChild(deleteButton)
        })
}

function dislikeKiller(e){
    //make sure to update this depending on how wendy creates the dislike element
    numberOfDislikes = parseInt(e.target.parentNode.querySelector('p').textContent) + 1
    fetch(`http://localhost:3000/serialKillers/${e.target.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            dislikes: currentKillerDislikes + 1
        })
    })
    .then(res => {
        currentKillerDislikes += 1
        document.getElementById('dislikes').textContent = `Dislikes: ${currentKillerDislikes}`
    })
}

function deleteKiller(id) {
    fetch(`http://localhost:3000/serialKillers/${id}`, {
        method: 'DELETE',
    })
    .then( res => {
        location.reload()
    })
}

function addKiller(e){
    let name = e.target.name.value
    let countries = e.target.countriesActive.value
    let imageUrl = e.target.image.value
    let victims = e.target.victimCount.value
    let yearsActive = e.target.yearsActive.value
    let description = e.target.description.value

    let countriesArray = countries.split(", ")

    fetch(`http://localhost:3000/serialKillers`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            country: countriesArray,
            image: imageUrl,
            yearsActive: yearsActive,
            numberVictims: Number.parseInt(victims),
            description: description,
            dislikes: 0
        })
    })
    .then(res => res.json())
    .then(killer => {
        let img = document.createElement('img')
        img.addEventListener('click', e => {
            let currentId = e.target.id
            currentKillerId = e.target.id
            displayDetails(currentId)
        })
        img.src = killer.image
        img.id = killer.id
        img.title = killer.name
        imagesContainer.appendChild(img)
    })
}