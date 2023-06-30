function validarFormulario(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const tarjeta = document.getElementById('tarjeta').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
  
    if (nombre === '') {
      mostrarError('Ingrese su nombre');
      return;
    }
  
    if (!/^[a-zA-Z\s]*$/.test(nombre)) {
      mostrarError('Ingrese un nombre válido');
      return;
    }
  
    if (email === '') {
      mostrarError('Ingrese su correo electrónico');
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarError('Ingrese un correo electrónico válido');
      return;
    }
  
    if (direccion === '') {
      mostrarError('Ingrese su dirección');
      return;
    }
  
    if (tarjeta === '') {
      mostrarError('Ingrese el número de tarjeta');
      return;
    }
  
    if (isNaN(tarjeta)) {
      mostrarError('Ingrese solo números en el campo de tarjeta');
      return;
    }
  
    if (cvv === '') {
      mostrarError('Ingrese el CVV de la tarjeta');
      return;
    }
  
    if (isNaN(cvv)) {
      mostrarError('Ingrese solo números en el campo de CVV');
      return;
    }
  
    // 
  }
  
  function mostrarError(mensaje) {
    const errorContainer = document.getElementById('error-container');
    const errorMensaje = document.getElementById('error-mensaje');
    errorMensaje.textContent = mensaje;
    errorContainer.style.display = 'block';
  }
  