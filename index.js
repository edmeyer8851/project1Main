const imagesContainer = document.getElementById('menu-bar')
const detailsContainer = document.getElementById('details') 

fetch('http://localhost:3000/serialKillers')
 .then(response => response.json())
 .then(killers => {
    killers.forEach(killer => {
        let img = document.createElement('img')
        img.addEventListener('click', displayDetails)
        img.src = killer.image
        img.id = killer.id
        imagesContainer.appendChild(img)
    })
 })

function displayDetails(e) { 
    fetch(`http://localhost:3000/serialKillers/${e.target.id}`) 
        .then(response => response.json()) 
        .then(killer => {
            // name
            detailsContainer.innerHTML = ``
            let name = document.createElement(`h1`)
            name.textContent = killer.name
            detailsContainer.appendChild(name)
            //countries active 
            let country = document.createElement(`h1`)
            country.textContent = killer.country
            detailsContainer.appendChild(countryLabel)
            //const countriesActive = document.querySelector('#countriesActive')
            //countriesActive.textContent = killer.country

            // years active //
            let yearsActive = document.createElement(`h1`)
            yearsActive.textContent = killer.yearsActive
            detailsContainer.appendChild(yearsActive)
            //const yearsActive = document.querySelector('#yearsActive')
            //yearsActive.textContent = killer.yearsActive
            // # of victims //
            let victims = document.createElement(`h1`)
            victims.textContent = killer.numberVictims
            detailsContainer.appendChild(victims)
            //const victims = document.querySelector('#victims')
            //victims.textContent = killer.numberVictims
            // description
            let description = document.createElement(`h1`)
            description.textContent = killer.description
            detailsContainer.appendChild(description)
            // dislikes //
            let dislikes = document.createElement(`h1`)
            dislikes.textContent = killer.dislikes
            detailsContainer.appendChild(dislikes)
            console.log(detailsContainer)
            // dislike button
            let dislikeButton = document.createElement('button')
            dislikeButton.textContent = 'Dislike'
            dislikeButton.id = killer.id
            dislikeButton.addEventListener('click', dislikeKiller)
            detailsContainer.appendChild(dislikeButton)
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
            dislikes: numberOfDislikes
        })
    })
}