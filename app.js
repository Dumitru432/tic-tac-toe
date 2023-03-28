const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')

const startCells = [
    '', '', '', '', '', '', '', '', ''
]

let go = 'circle'
infoDisplay.textContent = 'Circle goes first'

// din fiecare celula ne dorim sa facem cate un patrat

// am creat o functie createBoard()
// am creat un div (const cellElement) la care i-am dat o clasa square 
// in final trebuie sa punem functia createBoard de fiecare data in loop 

function createBoard(){
    startCells.forEach((cell, index)=>{
       const cellElement = document.createElement('div'); // am creat un div pentru o singura casuta goala, practic ar trebui sa fac 9 casute adica 9 randuri de acelasi cod 
       cellElement.classList.add('square') // am adaugat clasa pentru o celula goala si anume clasa = square 
       cellElement.id = index
       cellElement.addEventListener('click', addGo)
       // o sa aducem gameBoard si o sa folosim append(a adauga)
       // cu append practic adaug fiecare element 
       gameBoard.append(cellElement);
    })
}
createBoard();


function addGo(e){
    const goDisplay = document.createElement('div') // aici am creat un alt div in div ul care mai sus a fost creat
    goDisplay.classList.add(go) // aici i-am dat clasa circle la div 
    e.target.append(goDisplay) // iar aici il anexam unde dam noi click, adica aducem acel div cu clasa circle unde dam noi click, toata asta se intampla cu ajutorul lui e.target practic cu el apucam acel din 
                                // iar append foloseste metoda append pentru a anexa elementul pe care tocmai l-am creat
    // acum practic trebuie sa schimbam variabila go (care se refera la cerc)
    go = go === 'circle' ? 'cross' : 'circle'  // daca go === 'circle' este true returneaza cross , altfel (se refera la cele : puncte) returneaza circle
                                                // iar toata asta go === 'circle' ? 'cross' : 'circle' este asignata la go
    infoDisplay.textContent = `it is now ${go} 's go`
    e.target.removeEventListener('click', addGo) // odată ce am dat clic pe ceva, știți că am adăugat o cruce sau un cerc, voi lua din nou acel pătrat, așa că e.target și eliminați ascultătorul evenimentului
    checkScore();
}

// acum facem functia pentru a verifica scorul

function checkScore() {
   const allSquares = document.querySelectorAll('.square')
   console.log(allSquares)
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    console.log(allSquares[0]) 

    // practic aici apucam arrayul nostru winningComb care are acele mici array uri in interior 
    // iar pentru fiecare array din interior il apuc si pentru fiecare celula 
    // adica primul array este [0, 1, 2] care este la index zero si il duc in allSquares, acolo unde am liniile pentru a arata cine a castigat 
    winningCombo.forEach(array => {
       const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))

            if (circleWins) {
               infoDisplay.textContent = 'Circle wins!' 
               allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
               return
            }
    })

    winningCombo.forEach(array => {
        const crossWins = array.every(cell => 
             allSquares[cell].firstChild?.classList.contains('cross'))
 
             if (crossWins) {
                infoDisplay.textContent = 'Cross wins!' 
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                return
             }
     })
}

// daca noi looping prin fiecare aray cele de sus [0, 1, 2], [3, 4, 5], [6, 7, 8],
//      [0, 3, 6], [1, 4, 7], [2, 5, 6],
//      [0, 4, 8], [2, 4, 6]
// daca unul din ei are copilul  care are elementul cu clasa circle inseamna ca cercul a castigat 
    

