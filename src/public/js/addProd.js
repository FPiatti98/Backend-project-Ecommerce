const addProdToCart = (id, cartId) => {

//se hace la peticion ala api para agregar un producto al carrito
  fetch(`/mongodb/api/carts/${cartId}/product/${id}`, {
    method: 'POST',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("producto agregado");
    }
  });
  
};

const logOut = () => {
  fetch(`/api/sessions/logout`, {
    method: 'GET',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      window.location.replace('/users/login')
    }
  });
}

const goToCart = (id)=> {
  window.location.replace(`/carts/${id}`)
}

const createProd = () => {
  window.location.replace(`/products/createproduct`)
}

const deleteProd = (id) => {
  //se hace una peticion a la api para eliminar el producto
  fetch(`/mongodb/api/products/${id}`, {
    method: 'DELETE',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("producto eliminado exitosamente");
      location.reload();
    } else {
      alert("No se pudo eliminar el producto");
    }
  });
}

const updateProd = (id) => {
  window.location.replace(`products/updateproduct/${id}`)
}

const getUsers = () => {
  window.location.replace(`/users`)
}