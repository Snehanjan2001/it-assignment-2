const { response } = require("express")

const viewList = document.getElementById('view-List')
const submitButton = document.getElementById('submit-button')
const userName = submitButton.value

submitButton.addEventListener((e) => {
    e.preventDefault()
    fetch('http://localhost:8000/upload/' + userName)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

})