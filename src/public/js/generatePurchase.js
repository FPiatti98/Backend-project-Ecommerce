const generatePurchase = (id) => {
    fetch(`http://localhost:8080/mongodb/api/carts/${id}/purchase`, {
    method: 'GET',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("Ticket creado!, se le enviara los detalles por mail y las formas de pago, muchas gracias!");
      window.location.replace('/products')
    } else if (result.status==404){
      alert("El carrito esta vacio");
    }
    if(result.status==500){
        alert("No se pudo generar el ticket");
    }
  });
}

const emptyCart = (id) => {
  fetch(`http://localhost:8080/mongodb/api/carts/${id}`, {
    method: 'DELETE',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("todos lo productos fueron eliminados del carrito exitosamente");
      location.reload();
    } else {
      alert("No se pudo vaciar el carrito");
    }
  });
}

const removeProd = (cartId, prodId) => {
  fetch(`http://localhost:8080/mongodb/api/carts/${cartId}/product/${prodId}`, {
    method: 'DELETE',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("el producto fue eliminado del carrito exitosamente");
      location.reload();
    } else {
      alert("No se pudo eliminar el producto del carrito");
    }
  });
}