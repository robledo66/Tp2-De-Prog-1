// Clase Producto
class Producto {
    constructor(id, nombre, descripcion, precio, imagen, categoria) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
      this.categoria = categoria;
    }
  }
  
  // Clase Carrito
class Carrito {
    constructor() {
      this.items = [];
    }
  
    agregarItem(producto) {
      // aca verifico si el producto ya existe en el carrito
      const existeProducto = this.items.some((item) => item.id === producto.id);
  
      if (!existeProducto) {
        // y aqui si el precio del producto es un número válido
        if (!isNaN(producto.precio)) {
          producto.cantidad = 1; // Asigno la cantidad inicial como 1 pq me estaba dando muchos errores
          this.items.push(producto);
        } else {
          console.log('El precio del producto no es válido');
        }
      }
    }
  
    eliminarItem(index) {
      this.items.splice(index, 1);
    }
  
    aumentarCantidad(index) {
      this.items[index].cantidad++;
    }
  
    disminuirCantidad(index) {
      if (this.items[index].cantidad > 1) {
        this.items[index].cantidad--;
      }
    }
  
    calcularSubtotal(index) {
      const producto = this.items[index];
      return producto.precio * producto.cantidad;
    }
  
    calcularTotal() {
      let total = 0;
      for (const producto of this.items) {
        const subtotal = this.calcularSubtotal(this.items.indexOf(producto));
        total += subtotal;
      }
      return total;
    }



    
  }
  // Array de productos
  const productos = [
    {
      id: 1,
      nombre: 'Microfono hyper x',
      categoria: 'Categoría 1',
      descripcion: 'Microfono Hyper x Gamer de gama Alta',
      precio: 10,
      imagen: 'Hyperxquadcast.webp',
    },
    {
      id: 2,
      nombre: 'mackbook pro',
      categoria: 'Categoría 2',
      descripcion: 'El laptop de la mas alta gama ',
      precio: 15,
      imagen: 'Mackbookpro.webp',
    },
    {
      id: 3,
      nombre: 'Samsunsg s22',
      categoria: 'Categoría 3',
      descripcion: 'Un Smarphone de alta cualidad para vos',
      precio: 20,
      imagen: 's22.jpg',
    },
    {
      id: 4,
      nombre: 'Samsung s23',
      categoria: 'Categoría 3',
      descripcion: 'El mejor de lo mejor en el mercado',
      precio: 10,
      imagen: 's23.jpg',
    },
    {
      id: 5,
      nombre: 'Microfono Samson',
      categoria: 'Categoría 1',
      descripcion: 'Microfono condenser de gama alta',
      precio: 15,
      imagen: 'samsonb.jpg',
    },
    {
      id: 6,
      nombre: 'Laptop Samsung pro 10',
      categoria: 'Categoría 2',
      descripcion: 'Laptop de gama alta con fluidez al uso asegurado',
      precio: 20,
      imagen: 'samsungpro10.jpg',
    },
  ];
  


  // Instancia del carrito
  const carrito = new Carrito();
  

  // Función para crear un elemento de producto
  function crearProductoElemento(producto) {
    const productoContainer = document.createElement('div');
    productoContainer.classList.add('producto');
  
    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
  
    const titulo = document.createElement('h3');
    titulo.textContent = producto.nombre;
  
    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;
  
    const categoria = document.createElement('p');
    categoria.textContent = `Categoría: ${producto.categoria}`;
  
    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;

  
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', () => {
      carrito.agregarItem(producto);
      actualizarCarrito();
    
    });
   
 
    productoContainer.appendChild(imagen);
    productoContainer.appendChild(titulo);
    productoContainer.appendChild(descripcion);
    productoContainer.appendChild(categoria);
    productoContainer.appendChild(precio);
    productoContainer.appendChild(botonAgregar);
  
    return productoContainer;
  }




  
    // Función para filtrar los productos por categoría
  function filtrarPorCategoria() {
    const filtroCategoria = document.getElementById('filtro-categoria');
    const categoriaSeleccionada = filtroCategoria.value;
    const productosLista = document.getElementById('productos-lista');
    productosLista.innerHTML = '';
  
    if (categoriaSeleccionada === 'todos') {
      productos.forEach(producto => {
        const productoElemento = crearProductoElemento(producto);
        productosLista.appendChild(productoElemento);
      });
    } else {
      const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
      productosFiltrados.forEach(producto => {
        const productoElemento = crearProductoElemento(producto);
        productosLista.appendChild(productoElemento);
      });
    }
  }
  





  function actualizarCarrito() {
    const carritoCantidad = document.getElementById('carrito-cantidad');
    const carritoTotal = document.getElementById('carrito-total');
    const productosCarritoModal = document.getElementById('productos-carrito-modal');
    const detalleProductosCarritoModal = document.getElementById('detalle-productos-carrito-modal');
  
    carritoCantidad.textContent = carrito.items.length;
    carritoTotal.textContent = `$${carrito.calcularTotal().toFixed(2)}`;
    productosCarritoModal.innerHTML = '';
    detalleProductosCarritoModal.innerHTML = '';
  
    carrito.items.forEach((producto, index) => {
      const productoCarritoElemento = document.createElement('div');
      productoCarritoElemento.classList.add('producto-carrito');
  
      const titulo = document.createElement('h4');
      titulo.textContent = producto.nombre;
  
      const imagen = document.createElement('img');
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;
  
      const cantidad = document.createElement('span');
      cantidad.textContent = `Cantidad: ${producto.cantidad}`;
  
      const subtotal = document.createElement('span');
      subtotal.textContent = `Subtotal: $${carrito.calcularSubtotal(index).toFixed(2)}`;
  
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', () => {
        carrito.eliminarItem(index);
        actualizarCarrito();
      });
  
      const botonAumentar = document.createElement('button');
      botonAumentar.textContent = '+';
      botonAumentar.addEventListener('click', () => {
        if (producto.cantidad) {
          carrito.aumentarCantidad(index);
          actualizarCarrito();
        }
      });
  
      const botonDisminuir = document.createElement('button');
      botonDisminuir.textContent = '-';
      botonDisminuir.addEventListener('click', () => {
        if (producto.cantidad) {
          carrito.disminuirCantidad(index);
          actualizarCarrito();
        }
      });
  
      productoCarritoElemento.appendChild(titulo);
      productoCarritoElemento.appendChild(imagen);
      productoCarritoElemento.appendChild(cantidad);
      productoCarritoElemento.appendChild(subtotal);
      productoCarritoElemento.appendChild(botonEliminar);
      productoCarritoElemento.appendChild(botonAumentar);
      productoCarritoElemento.appendChild(botonDisminuir);
  
      productosCarritoModal.appendChild(productoCarritoElemento);
  
      const detalleProductoCarritoElemento = document.createElement('div');
      detalleProductoCarritoElemento.textContent = `Nombre: ${producto.nombre} | Cantidad: ${producto.cantidad} | Subtotal: $${carrito.calcularSubtotal(index).toFixed(2)}`;
  
      detalleProductosCarritoModal.appendChild(detalleProductoCarritoElemento);
    });
  
    const valorTotalModal = document.getElementById('valor-total-modal');
    valorTotalModal.textContent = `$${carrito.calcularTotal().toFixed(2)}`;
  

    // Agregar botón "Eliminar Todo"
    const botonEliminarTodo = document.createElement('button');
    botonEliminarTodo.textContent = 'Eliminar Todo';
    botonEliminarTodo.addEventListener('click', () => {
      carrito.items = [];
      actualizarCarrito();
    });
    productosCarritoModal.appendChild(botonEliminarTodo);
  

    // Agregar botón "Comprar"
    const botonComprar = document.createElement('button');
    botonComprar.textContent = 'Comprar';
    botonComprar.addEventListener('click', () => {
      window.open('formulario.html', '_blank');
  });
  
    productosCarritoModal.appendChild(botonComprar);
  }



  // Función para abrir el modal
  function abrirModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    
  }
  

  // Función para cerrar el modal
  function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  
  // eventos a los elementos
  window.addEventListener('load', () => {
    const abrirModalButton = document.getElementById('abrirModal');
    const cerrarModalButton = document.getElementById('cerrarModal');
  
    abrirModalButton.addEventListener('click', abrirModal);
    cerrarModalButton.addEventListener('click', cerrarModal);
  
    filtrarPorCategoria();
    actualizarCarrito();
  });
  
  