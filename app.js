let AlreadyDrawn = [];
let limitNumber = 100;
let SecretNumber=randomNumber();
let tries = 1

//Para sempre dar um texto, Tag=local qeu quer colocar
//Text=texto a ser escrito
function textInScreen(tag,text){
    let camp = document.querySelector(tag);
    camp.innerHTML = text;
    if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR'; 
            utterance.rate = 1.2; 
            window.speechSynthesis.speak(utterance); 
        } else {
            console.log("Web Speech API não suportada neste navegador.");
    }}

function startMessage(){
textInScreen('h1','Jogo do número secreto');
textInScreen('p',`Escolha um número entre 1 e ${limitNumber}`);
}

startMessage()

function randomNumber(){
    let ChooseNumber = parseInt(Math.random() * limitNumber + 1);
    let QuantityNumbersinList = AlreadyDrawn.length;
    if (QuantityNumbersinList == limitNumber) {
        AlreadyDrawn = [];
    }

    if (AlreadyDrawn.includes(ChooseNumber)){
        return randomNumber();
    }else{
        AlreadyDrawn.push(ChooseNumber);
        console.log(AlreadyDrawn);
        return ChooseNumber;
    }
}

function cleanChance(){
    chance = document.querySelector('input');
    chance.value = '';
}

function verifyChance(){
    let chance = document.querySelector('input').value;
    if (chance== SecretNumber){
        textInScreen('h1','Acertou!');
        let wordTries = tries > 1? 'tentativas': 'tentativa';
        let message = (`Você descobriu o número secreto com ${tries} ${wordTries}!`);
        textInScreen('p',message);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chance>SecretNumber){
            textInScreen('h1','O número é menor');
            textInScreen('p','Tente novamente');
        }else{
            textInScreen('h1','O número é maior');
            textInScreen('p','Tente novamente');

        }
        tries++;
        cleanChance();
    }
}
function restartGame(){
    SecretNumber=randomNumber();
    cleanChance();
    tries = 1;
    startMessage()
    document.getElementById('reiniciar').setAttribute('disabled',true);
}