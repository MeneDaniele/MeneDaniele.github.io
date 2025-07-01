//GET
let apod = 'https://api.nasa.gov/planetary/apod'
// POSTMANN 2022-10-15 / 2022-10-18
//API KEY
let ApiKey = 'RMYuEOiCMFgNhQWlHgzhIEqJz3ThQ0uJnL7te6bH'
let postmann ='https://api.nasa.gov/planetary/apod?start_date=2022-10-15&end_date=2022-10-18'
let fetchinfo = 'https://api.nasa.gov/planetary/apod?start_date=2022-10-15&end_date=2022-10-18&api_key=RMYuEOiCMFgNhQWlHgzhIEqJz3ThQ0uJnL7te6bH'




function getDate(){
    let date = new Date()
    let day = date.getDate()+20
    let month = date.getMonth()
    let year = date.getFullYear()
    return `${year}-${month}-${day}`
}
function getDateEnd(){
    let data = new Date()
    let day = data.getDate()
    let month = data.getMonth() + 1
    let year = data.getFullYear()
    return `${year}-${month}-${day}`
}
console.log(getDate())
console.log(getDateEnd())

let start = getDate()
let end = getDateEnd()

function createfetch(start, end){
    return `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${ApiKey}`
}
// console.log(createfetch(start, end))


fetch(createfetch(start, end))
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let container = document.querySelector('main')
        let img = document.createElement('img')
        img.src = data[1].url;
        container.append(data[1].title)
        container.append(img)
})
