const wordEl =document.getElementById('word'),
wrongletterEl = document.getElementById('wrong-letters'),
playAgainBtn = document.getElementById('play-button'),
popup = document.getElementById('popup-container'),
notification = document.getElementById('notification-container'),
finalMessage = document.getElementById('final-message'),
figureParts = document.querySelectorAll('.figure-part');

const words = ['applications','programming','javascript','Frontend'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [],
wrongLetters = [];


let displayWord = () =>{
    wordEl.innerHTML = `${selectedWord.split('').map(letter => `<span class="letter">
        ${correctLetters.includes(letter)? letter: ''}
    </span> `).join('') }`;
    
    //This will replace all new line character in your string with ''
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations';
        popup.style.display = 'flex';
    }
    
}

let updateWrongLettersEl = () => {
    wrongletterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length ;

        if(index < errors){
            part.style.display ='block';
        }else{
            part.style.display = 'none';
        }
    });
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'YOU DIED';
        popup.style.display = 'flex';
    }
}

let showNotifaction = () => {
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },2000);
}

window.addEventListener('keydown' ,e => {
    // for listen to keyboard letters between a-z ; a : 65 , z = 90
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotifaction();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl()
            }else{
                showNotifaction();
            }
        }
    }
});

playAgainBtn.addEventListener('click' , () =>{

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();