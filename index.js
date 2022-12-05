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
            detailsContainer.innerHTML = ''
            let name = document.createElement('h1')
            name.textContent = killer.name
            detailsContainer.appendChild(name)
            // countries active // 
            let countryLabel = document.createElement('h1')
            countryLabel.textContent = `Country: `
            let country = document.createElement('h1') 
            country.textContent = killer.country
            countryLabel.appendChild(country)
            detailsContainer.appendChild(countryLabel)
            // years active // 
            let yearsActive = document.createElement('h1')
            yearsActive.textContent = killer.yearsActive
            detailsContainer.appendChild(yearsActive)
            // # of victims // 
            let victims = document.createElement('h1') 
            victims.textContent = killer.numberVictims 
            detailsContainer.appendChild(victims)
            // description 
            let description = document.createElement('h1')
            description.textContent = killer.description
            detailsContainer.appendChild(description)
            // dislikes //
            let dislikes = document.createElement('h1') 
            dislikes.textContent = killer.dislikes
            detailsContainer.appendChild(dislikes)
            console.log(detailsContainer)
        })
}