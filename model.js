let bigHeart = MakeElem('#bigcheck')
let aside = MakeElem('#aside')
let cheking = MakeElem('#checking')

let arr = []


function renderToAside (elem) {
    aside.innerHTML = null
    elem.forEach(item => {
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newGenreLi = CreateDom('p')
        let newBlock = CreateDom('div')
        let newWeight = CreateDom('p')
        let newAge = CreateDom('p')
        let newDelete = CreateDom('button')
        
        
        newLi.setAttribute('class', 'pokem_item')
        newLi.setAttribute('data-uuid', item.id)
        newImg.setAttribute('src', item.img)
        newImg.setAttribute('width', '80')
        newImg.setAttribute('height', '100')
        newHeading.setAttribute('class', 'pokem_item-title')
        newGenreLi.setAttribute('class', 'pokem_genre')
        newBlock.setAttribute('style', 'display:flex; justify-content:space-between')
        newDelete.setAttribute('class', 'fas fa-trash-alt')
        
        
        newHeading.textContent = item.name
        newGenreLi.textContent = item.type
        newWeight.textContent = item.weight
        newAge.textContent = item.candy_count + 'Can-c'
        
        
        newLi.appendChild(newImg)
        newLi.appendChild(newDelete)
        newLi.appendChild(newHeading)
        newLi.appendChild(newGenreLi)
        newBlock.appendChild(newWeight)
        newBlock.appendChild(newAge)
        newLi.appendChild(newBlock)
        aside.appendChild(newLi)
        
        newDelete.dataset.uuid = item.id
        
        newDelete.addEventListener('click', deleteItem)
    })
}

function deleteItem(e) {
    const liId = e.target.dataset.uuid
    let findIndex = arr.findIndex((elem) => elem.id == liId)
    
    arr.splice(findIndex, 1)
    
    renderToAside(arr)
}
