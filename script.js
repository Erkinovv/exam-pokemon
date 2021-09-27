let elForm = MakeElem('#form')
let pokemList = MakeElem('.pokem__list')
let pokemGenre = MakeElem('.pokem__genre')
let pokemSearch = MakeElem('.pokem__search')
let pokemFilter = MakeElem('.pokem__filter')
let pokemBtn = MakeElem('.pokem__btn')

function renderGenresSelect(pokemons, element) {
    const result = []
    pokemons.forEach(pokem => {
        pokem.type.forEach(genre => {
            if (!result.includes(genre)) {
                result.push(genre)
            }
        })
    })

    result.forEach(genre => {
        const newOption = CreateDom('option')
        newOption.value = genre;
        newOption.textContent = genre

        element.appendChild(newOption)
    })
}

renderGenresSelect(pokemons, pokemGenre)

function render(arrPokem, element) {

    element.innerHTML = null
    arrPokem.forEach(pokem => {
        
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newGenreLi = CreateDom('p')
        let newBlock = CreateDom('div')
        let newWeight = CreateDom('p')
        let newAge = CreateDom('p')
        let newLikes = CreateDom('input')

        newLi.setAttribute('class', 'pokem__item')
        newImg.setAttribute('src', pokem.img)
        newImg.setAttribute('width', '150')
        newImg.setAttribute('height', '200')
        newGenreLi.setAttribute('class', 'pokem__genre')
        newBlock.setAttribute('style', 'display:flex; justify-content:space-between')
        newLikes.setAttribute('class', 'btn-like')
        newLikes.setAttribute('id', 'btn-like')
        newLikes.setAttribute('type', 'checkbox')
        
        newHeading.textContent = pokem.name
        newGenreLi.textContent = pokem.type
        newWeight.textContent = pokem.weight
        newAge.textContent = pokem.candy_count + 'Can-C'
        newLikes.dataset.uuid = pokem.id;

        newLi.appendChild(newImg)
        newLi.appendChild(newLikes)
        newLi.appendChild(newHeading)
        newLi.appendChild(newGenreLi)
        newBlock.appendChild(newWeight)
        newBlock.appendChild(newAge)
        newLi.appendChild(newBlock)
        pokemList.appendChild(newLi)

        newLikes.addEventListener('click', () => {
            if (newLikes.checked == true) {
                if (!arr.includes(pokem)) {
                    arr.push(pokem)
                    renderToAside(arr)
                }
            }
        })
    });
}

render(pokemons, pokemList)

elForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let selectGenres = pokemGenre.value.trim()
    let searchValue = pokemSearch.value.trim()
    let filterValue = pokemFilter.value.trim()

    let regex = RegExp(searchValue, 'gi')

    let filteredPokems = pokemons.filter((pokem) => {
        return pokem.name.match(regex)
    })

    let foundPokem = []

    if (selectGenres == 'All') {
        foundPokem = filteredPokems
    } else {
        foundPokem = filteredPokems.filter(pokem => {
            return pokem.type.includes(selectGenres)
        })
    }
    render(foundPokem, pokemList)

    const sortWord = foundPokem.sort((a, b) =>{
        if(a.title > b.title){
            return 1
        }else if(a.title < b.title){
            return -1
        }else{
            return 0
        }
    });
    
    if(filterValue === 'All'){
        return foundPokem
    }else if(filterValue === 'a_z'){
        sortWord
    }else if(filterValue === 'z_a'){
        sortWord.reverse()
    }
    
    searchValue.value = null;
    
    render(foundPokem, pokemList);
})

bigcheck.addEventListener( 'click', () => {
    aside.classList.toggle('pos-left')
})
cheking.addEventListener( 'click', () => {
    aside.classList.remove('pos-left')
})