const form = document.getElementById('createProdForm');

form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    const newProd = {};
    data.forEach((value, key) => {newProd[key]=value});
    fetch('/mongodb/api/products', {
        method: "POST",
        body: JSON.stringify(newProd),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
        if(result.status === 200){
            result.json();
            alert("Producto creado!");
        }else if(result.status === 400){
            alert("por favor enviar los datos correctamente");
            location.reload();
        } else {
            alert("Error interno del servidor")
        }
    })
})