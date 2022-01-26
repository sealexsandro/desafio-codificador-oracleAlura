
const inputTextArea = document.getElementById('insert-text');
let div = document.getElementById('aviso-erro');


let isMsg = false;
const regex = new RegExp("^[a-zA-Z\b]+$");

function mensagemDeAviso(mensagem) {
    div.innerHTML = `<span id="mensagem-erro">${mensagem}</span>`;
    isMsg = true;
}
function removerMensagem() {
    let spanMsg = document.getElementById('mensagem-erro');
    spanMsg.parentNode.removeChild(spanMsg);
    isMsg = false;
}

function isNumber(letra) {
    let numero = parseInt(letra);
    if (!isNaN(numero)) {
        return true;
    }
    return false;
}

function isCaractereEspecial(letra) {
    letra = letra.trim();
    if (letra.length > 0) {
        if (!regex.test(letra)) {
            return true;
        }
    }
    return false;
}

function isLetraMaiuscula(letra) {
    letra = letra.trim();
    if (letra.length > 0) {
        if (letra === letra.toUpperCase()) {
            return true;
        }
    }
    return false;
}


inputTextArea.addEventListener("keypress", function (e) {
    let letra = e.key;

    if (isNumber(letra)) {
        mensagemDeAviso("Números NÃO São Permitidos!");
        e.preventDefault();
    } else if (isCaractereEspecial(letra)) {
        mensagemDeAviso("Letras com acentos ou caracteres especiais Não são permitidos!");
        e.preventDefault();
    } else if (isLetraMaiuscula(letra)) {
        mensagemDeAviso("Letras Maiúsculas NÃO São Permitidas!");
        e.preventDefault();
    } else {
        if (isMsg) {
            removerMensagem();
        }
    }
})

function isFraseComLetraMaiuscula(text) {
    for (let index = 0; index < text.length; index++) {
        const letra = text[index];
        if (isLetraMaiuscula(letra)) {
            return true;
        }
    }
    return false;
}

function isFraseComNumeros(text) {
    for (let index = 0; index < text.length; index++) {
        const letra = text[index];
        if (isNumber(letra)) {
            return true;
        }
    }
    return false;
}

function isFraseCaractereEspecial(text) {
    for (let index = 0; index < text.length; index++) {
        const letra = text[index];
        if (isCaractereEspecial(letra)) {
            return true;
        }
    }
    return false;
}

function criptografar() {

    let inputText = document.getElementById("insert-text").value;

    if (inputText.trim().length <= 0) {
        mensagemDeAviso("Digite algo para ser Criptografado!");
        return;
    }

    if (isFraseComNumeros(inputText)) {
        mensagemDeAviso("Números NÃO são permitidos!");
        return;
    } else if (isFraseComLetraMaiuscula(inputText)) {
        mensagemDeAviso("Letras maiúsculas NÃO são aceitas para criptografar!");
        return;
    } else if (isFraseCaractereEspecial(inputText)) {
        mensagemDeAviso("Letras com acentos ou caracteres especiais NÃO são aceitos para criptografar!");
        return;
    }

    let encryptedMessage = "";
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === "a") {
            encryptedMessage += "ai";
        } else if (inputText[i] === "e") {
            encryptedMessage += "enter";
        } else if (inputText[i] === "i") {
            encryptedMessage += "imes";
        } else if (inputText[i] === "o") {
            encryptedMessage += "ober";
        } else if (inputText[i] === "u") {
            encryptedMessage += "ufat";
        } else {
            encryptedMessage += inputText[i];
        }
    }

    if (inputText === encryptedMessage) {
        mensagemDeAviso("NÃO foi possível criptografar esta frase!");
        return;
    } else {
        if (isMsg) {
            removerMensagem();
        }
        document.getElementById("output-text").value = encryptedMessage;
    }

}


function trocarLetras(text) {

    let vetor = ["ai", "enter", "imes", "ober", "ufat"];
    let silabas = [];

    for (let i = 0; i < vetor.length; i++) {
        if (text.indexOf(vetor[i]) > -1) {
            silabas = text.split(vetor[i]);
            // console.log(silabas)
            let aux = "";
            for (let j = 0; j < silabas.length; j++) {
                aux += silabas[j];
                if (j < silabas.length - 1) {
                    aux += vetor[i].charAt(0);
                }
            }
            text = aux;
        }
    }
    return text;
}

function descriptografar() {
    let encryptedText = document.getElementById("insert-text").value;
    let decryptedText = "";

    if (encryptedText.trim().length <= 0) {
        mensagemDeAviso("Digite algo para ser Descriptografado!");
        return;
    }

    let words = encryptedText.split(" ");

    for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            decryptedText += trocarLetras(words[i]);
            if (words.length === 1 || i + 1 < words.length) {
                decryptedText += " ";
            }
        }


    }

    if (encryptedText.trim() === decryptedText.trim()) {
        mensagemDeAviso("NÃO foi possível descriptografar, o texto não está criptografado!");
        return;
    } else {
        if (isMsg) {
            removerMensagem();
        }
        document.getElementById("output-text").value = decryptedText;
    }
}

// function copyText() {
//     const text = document.getElementById("img-copy").innerHTML;

//     navigator.clipboard.writeText(text).then(() => {
//         alert("Texto Copiado");
//     });


// }