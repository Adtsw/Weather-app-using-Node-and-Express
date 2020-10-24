

const Form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.textContent = 'Loading'
    msg2.textContent = 'Your data will appear here!'
    console.log('testing')

    const SearchedTerm = input.value;
    //console.log(SearchedTerm)

        fetch(`http://localhost:3000/weather?address=${SearchedTerm}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            msg1.textContent = 'Error'
            msg2.textContent = 'Sorry'
        }else{
            msg1.textContent = `${data.location.name} is the place you have searched`
            msg2.textContent = `It's ${data.current.weather_descriptions} out here, with the temperature falling to ${data.current.temperature} degrees Celsius`
            console.log(data.location.name)
        }
    })
}).catch((err) => {
    console.log('Errrr')
})
})

