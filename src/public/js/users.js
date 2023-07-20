const deleteUser = (email) => {
    //se hace una peticion a la api para eliminar el usuario
    fetch(`http://localhost:8080/api/users/${email}`, {
    method: 'DELETE',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("usuario eliminado exitosamente");
      location.reload();
    } else {
        alert("No se pudo eliminar el usuario");
    }
  });
}

const updateUser = (email) => {
  //se hace una peticion a la api para promover el usuario a administrador
  fetch(`http://localhost:8080/api/users/${email}`, {
    method: 'PUT',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("usuario promovido a administrador");
      location.reload();
    } else {
        alert("No se pudo promover a el usuario");
    }
  });
}

const deleteManyUsers = () => {
  //se hace una peticion a la api para eliminar a los usuarios inactivos 
  fetch(`http://localhost:8080/api/users/deletemany`, {
    method: 'GET',
    mode: "cors",
  })
  .then(result => {
    if(result.status==200){
      alert("usuarios inactivos eliminados exitosamente");
      location.reload();
    } else if (result.status == 404){
      alert("No hay usuarios inactivos en este momento");
    }else if (result.status == 500){
      alert(`error interno del servidor`);
    }
  });
}