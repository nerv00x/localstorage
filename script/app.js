if (typeof (Storage) !== 'undefined') {
    console.log('compatible')
} else {
    console.log('incompatible')
}
const form = document.querySelector(".form");

const maxWords = 15;

form.addEventListener('submit', sendTextLocalStorage);
window.addEventListener('load', showLocalStorage)

function sendTextLocalStorage(e) {
    e.preventDefault()

    let message = document.querySelector("#texto").value;
    let textArea = document.querySelector("#texto");
    let error = document.createElement('p');
    let errorDiv = document.createElement('div');
    let formDiv = document.querySelector('#formularioDiv')
    let paragraph = document.createElement("p");
    let paragraphDiv = document.createElement("div");
    // let toggleClass = true;

    if (message === "") {
        console.log("entraif")

        if (!document.querySelector(".errorDiv")) {
            error.innerText = "Introduce un texto valido";
            error.classList.add("errorP");
            errorDiv.classList.add("errorDiv");
            formDiv.insertAdjacentElement("afterend", errorDiv)
            errorDiv.insertAdjacentElement("afterbegin", error);

            setTimeout(() => {
                errorDiv.classList.remove("errorDiv");
                errorDiv.style.display = "none";
            }, 2000);
        }

    } else {

        const tweetObj = {
            id: Date.now(),
            texto: message
        }
        localStorage.setItem(`Mensaje: ${tweetObj.id}`, tweetObj.texto)
        textArea.value = "";
        console.log(message);



        paragraphDiv.classList.add("paragraphDiv");
        paragraph.classList.add("paragraph");


        let eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'x';
        eliminarBtn.addEventListener('click', () => eliminarMensaje(`Mensaje: ${tweetObj.id}`));

        if (document.querySelector("#paragraphDiv")) {
            paragraphDiv.insertAdjacentElement("beforeend", paragraphDiv);
            paragraphDiv.insertAdjacentElement("afterbegin", paragraph);
            paragraph.appendChild(eliminarBtn);

        } else {
            formDiv.insertAdjacentElement("afterend", paragraphDiv);
            paragraphDiv.insertAdjacentElement("afterbegin", paragraph);
            paragraph.insertAdjacentElement("afterbegin", eliminarBtn);

        }

        eliminarBtn.addEventListener('click', () => eliminarMensaje(key));



        const words = tweetObj.texto.split(/\s+/);

        // Si el número de palabras excede el límite, agrega saltos de línea
        if (words.length > maxWords) {
            const truncatedMessage = words.slice(0, maxWords).join(" ") + " ...";
            paragraph.innerText = truncatedMessage;

        } else {
            paragraph.innerText = tweetObj.texto;
        }

    }

}

function showLocalStorage() {
    let formDiv = document.querySelector('#formularioDiv');
    let paragraphDiv = document.createElement('div');
    paragraphDiv.classList.add('paragraphDiv');

    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const value = localStorage.getItem(key);
            const paragraph = document.createElement('p');
            paragraph.classList.add('paragraph');

            const eliminarBtn = document.createElement('button');
            eliminarBtn.innerText = 'x';
            eliminarBtn.classList.add("delete")
            eliminarBtn.addEventListener('click', () => eliminarMensaje(key));

            paragraph.insertAdjacentElement("beforeend", eliminarBtn);
            paragraph.appendChild(document.createTextNode(value));

            paragraphDiv.appendChild(paragraph);
        }
    }

    formDiv.insertAdjacentElement('afterend', paragraphDiv);
}


function eliminarMensaje(key) {
    localStorage.removeItem(key);
    let paragraphDiv = document.querySelector(".paragraphDiv");
    paragraphDiv.innerHTML = "";
    showLocalStorage(); 
}


