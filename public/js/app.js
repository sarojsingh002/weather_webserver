

//console.log("client side java script file")

//Fetching from client side
// fetch('http://puzzle.mead.io/puzzle').then((response)=>
// {
//     //then signifies and will only run when json data has arrived
// response.json().then((data)=>{
// console.log(data)

// })//

// })








/********************** */
//To get the data from weather form
const weatherform  = document.querySelector('form')
const search = document.querySelector('input')


//targeting the particular paragraphs
const msg1 = document.querySelector('#msg1')
msg1.textContent  = ''

const msg2 = document.querySelector('#msg2')
msg2.textContent = ''


weatherform.addEventListener('submit',(e)=>
{
    //to prevent default behaviour which is refreshing and clearing the page
    e.preventDefault()
    //to get the value submitted by the user
    const location  = search.value

msg1.textContent  = 'Loading'
msg2.textContent = ''


    if(!location)
    {
        msg1.textContent  ="Please provide some data"
    }
    fetch('http://localhost:3000/weather?address='+location).then((response)=>
{     
    response.json().then((data)=>{
        if(data.error)
        {
            msg1.textContent = (data.error)
        }
        else
        {
            msg1.textContent = data.Place
            msg2.textContent = data.Forecast_Data
        }
    }) 
})
})