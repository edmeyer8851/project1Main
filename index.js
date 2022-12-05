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
            // 
            let country = document.createElement('h1') 

        })
    
    

}