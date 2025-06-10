async function loadProfile(){
    const profile = await apiFetch('/profile?gc=1');
    if(!profile || !profile.user){
        console.error("No se pudo obtener el perfil");
        return;
    }

    document.getElementById("inputNombre").value = profile.user.first_name;
    document.getElementById("inputApellidos").value = profile.user.last_name;
    document.getElementById("inputEmail").value = profile.user.credentials.email;

    const courses = profile.user.courses || {};
    const usersData = await apiFetch('/users') || {users:{}};
    const tbody = document.getElementById("tablaCursos");
    tbody.innerHTML = "";
    Object.values(courses).forEach(c => {
        const instructor = usersData.users[c.instructor_id];
        const instructorName = instructor ? `${instructor.first_name} ${instructor.last_name}` : c.instructor_id;
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.id}</td><td>${c.name}</td><td>${instructorName}</td>`;
        tbody.appendChild(tr);
    });
}

window.addEventListener("DOMContentLoaded", loadProfile);
