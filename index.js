const imagesContainer = document.getElementById('menu-bar')
const detailsContainer = document.getElementById('detail') 
const yearsActive = document.querySelector('#yearsActive')
const victimCount = document.querySelector('#victims')
const description = document.querySelector('#description')
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
            // name
            detailsContainer.innerHTML = ``
            let name = document.createElement(`h1`)
            name.id = "killerName"
            name.textContent = killer.name
            detailsContainer.appendChild(name)

            let detailImage = document.createElement('img')
            detailImage.id = "detailImage"
            detailImage.src = killer.image
            detailsContainer.appendChild(detailImage)

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
    .then(displayDetails(currentKillerId))
}

function deleteKiller(id) {
    fetch(`http://localhost:3000/serialKillers/${id}`, {
        method: 'DELETE',
    })
    .then( res => {
        currentKillerId += 1
        console.log(currentKillerId)
        displayDetails(currentKillerId)
        document.getElementById(id).remove()
    })
}