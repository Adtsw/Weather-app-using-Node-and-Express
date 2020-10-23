

const Form = document.querySelector('form')
const input = document.querySelector('input')

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('testing')

    const SearchedTerm = input.value;
    //console.log(SearchedTerm)

        fetch(`http://localhost:3000/weather?address=${SearchedTerm}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location.name)
        }
    })
}).catch((err) => {
    console.log('Errrr')
})
})

