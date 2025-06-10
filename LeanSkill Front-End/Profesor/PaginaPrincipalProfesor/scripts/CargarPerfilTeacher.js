async function loadTeacherProfile(){
    const profile = await apiFetch('/profile');
    if(!profile || !profile.user){
        console.error("No se pudo obtener el perfil del profesor");
        return;
    }
    document.getElementById("inputNombre").value = profile.user.first_name;
    document.getElementById("inputApellidos").value = profile.user.last_name;
    document.getElementById("inputEmail").value = profile.user.credentials.email;
}

window.addEventListener("DOMContentLoaded", loadTeacherProfile);
