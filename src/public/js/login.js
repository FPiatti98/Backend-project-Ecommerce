const form = document.getElementById('loginForm')

form.addEventListener('submit', e=> {
    e.preventDefault();
    const data = new FormData(form);
    const reqBody = {}
    data.forEach((value, key)=>reqBody[key]=value);
    //handler para que nos e envien datos vacios
    if (reqBody.email === '' || reqBody.password === ''){
        return alert('Por favor completar los datos correctamente')
    }
    fetch('/api/sessions/login', {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
        if(result.status===200){
            window.location.replace('/products')
        } else if(result.status === 404){
            alert("El usuario es inexistente")
        } else if(result.status === 401){
            alert("El usuario y la contraseña no coinciden")
        }
    })
})