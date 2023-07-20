const form = document.getElementById('registerForm');

form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    const newUser = {};
    data.forEach((value, key) => {newUser[key]=value});
    //handler para que nose envien datos vacios
    if (newUser.first_name === '' || newUser.last_name === '' || newUser.email === '' || newUser.age === '' || newUser.password === ''){
        return alert('Por favor completar los datos correctamente')
    }
    fetch('/api/sessions/register', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
        if(result.status === 201){
            result.json();
            alert("Usuario creado!")
            window.location.replace('/users/login')
        }else if(result.status === 400){
            alert("El usuario ya existe");
        } else if (result.status === 404){
            alert("Por favor complete los datos")
        } else {
            alert("No se pudo registrar el usuario")
        }
    })
})