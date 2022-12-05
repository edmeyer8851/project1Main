const imagesContainer = document.getElementById('menu-bar')

fetch('http://localhost:3000/serialKillers')
 .then(response => response.json())
 .then(killers => {
    killers.forEach(killer => {
        let img = document.createElement('img')
        img.src = killer.image
        img.id = killer.id
        imagesContainer.appendChild(img)
    })
 })

 // this is my test commit #2