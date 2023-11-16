// Función para mostrar mensajes en la lista
function renderMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageList = document.getElementById('message-list');
  
    // Limpiar la lista
    messageList.innerHTML = '';
  
    // Mostrar los mensajes en la lista
    messages.forEach(message => {
      const listItem = document.createElement('li');
      listItem.classList.add('message-item');
      listItem.textContent = message.texto;
  
      // Crear botón de eliminar (X)
      const deleteButton = document.createElement('span');
      deleteButton.textContent = ' ❌';
      deleteButton.classList.add('delete-button');
      deleteButton.dataset.id = message.id;
  
      // Agregar el evento de eliminar al botón
      deleteButton.onclick = function (event) {
        const messageId = event.target.dataset.id;
        deleteMessageFromLocalStorage(messageId);
      };
  
      // Agregar el botón de eliminar al elemento de la lista
      listItem.appendChild(deleteButton);
  
      // Agregar el mensaje a la lista
      messageList.appendChild(listItem);
    });
  }
  
  // Función para guardar mensajes en localStorage
  function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const tweetObj = {
      id: Date.now(),
      texto: message
    };
    messages.push(tweetObj);
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
  }
  
  // Función para eliminar un mensaje del localStorage
  function deleteMessageFromLocalStorage(id) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages = messages.filter(message => message.id != id);
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
  }
  
  // Función para agregar un mensaje
  function addMessage(event) {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
    const messageInput = document.getElementById('message-input');
    const errorMessage = document.getElementById('error-message');
    const message = messageInput.value.trim();
  
    if (message === '') {
      errorMessage.textContent = 'Debe introducir el texto a añadir';
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 2000);
    } else {
      saveMessage(message);
      messageInput.value = ''; // Limpiar el input después de agregar el mensaje
    }
  }
  
  // Función para eliminar un mensaje al hacer clic en el botón (X)
  function deleteMessage(event) {
    if (event.target.classList.contains('delete-button')) {
      const messageId = event.target.dataset.id;
      deleteMessageFromLocalStorage(messageId);
    }
  }
  
  // Event listener para el botón de agregar mensaje y reiniciar el formulario
  const form = document.getElementById('message-form');
  form.addEventListener('submit', addMessage);
  form.reset(); // Reiniciar el formulario al cargar la página
  
  // Cargar mensajes al cargar la página
  renderMessages();
  