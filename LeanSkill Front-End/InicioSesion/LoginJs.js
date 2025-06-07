const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const form = document.querySelector('form');

form.addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita el envío del formulario

  const email = emailInput.value;
  const password = passwordInput.value;

  // Aquí puedes agregar la lógica para verificar el inicio de sesión
  console.log('Email:', email);
  console.log('Contraseña:', password);

  // Ejemplo de redirección a otra página
  const apiResponse = await fetch("http://localhost:9090/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(r  => r.json());

  const profile = await fetch("http://localhost:9090/api/v1/profile", {
    headers: {
      Authorization: apiResponse.token
    }
  }).then(r => r.json())

  localStorage.setItem("user", JSON.stringify({
    id: profile.user.id,
    name: `${profile.user.first_name} ${profile.user.last_name}`,
    email: profile.user.credentials.email,
    role: profile.user.account.role
  }));
  localStorage.setItem('token', apiResponse.token);


  switch(profile.user.account.role) {
    case "USER":
      window.location.replace("/LeanSkill Front-End/Estudiante/PaginaPrincipalEstudiante/InicioStudent.html");
      break;
    case "INSTRUCTOR":
      window.location.replace("/LeanSkill Front-End/Profesor/PaginaPrincipalProfesor/InicioTeacher.html");
      break;
    case "ADMINISTRATOR":
      window.location.href = "http://localhost:5500/LeanSkill%20Front-End/Admin/Admin.html";
      break;
    default:
      console.error("Rol desconocido");
  }
});

async function setUserData(){
  
}

async function logout(){
  if(localStorage.getItem("token")){
    localStorage.removeItem("token");
  }
}//TODO: Usando lla ruta profile de la api