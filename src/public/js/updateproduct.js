const update = (id) => {
    const form = document.getElementById('UpdateProdForm');
    const data = new FormData(form);
    const updatedProd = {};
    data.forEach((value, key) => {updatedProd[key]=value});

    fetch(`/mongodb/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedProd),
    mode: "cors",
    headers:{
        'Content-Type':'application/json'
    }
  }).then(result => {
    if(result.status === 200){
        alert("Producto actualizado correctamente");
    }else {
        alert("No se pudo actualizar el producto")
    }
})
}