const imagesContainer = document.getElementById('images')

fetch('http://localhost:3000/serialKillers')
 .then(response => response.json())
 .then(killers => {
    killers.forEach(killer => {
        let img = document.createElement('img')
        img.src = killer.image
        imagesContainer.appendChild(img)
    })
 })