async function loadInstructors(){
    const data = await apiFetch('/users');
    if(!data || !data.users) return;
    const instructors = Object.values(data.users).filter(u => u.account.role === 'INSTRUCTOR');
    ["tablaProfesoresIngles","tablaProfesoresEspanol"].forEach(id => {
        const table = document.getElementById(id);
        if(!table) return;
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        instructors.forEach(inst => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${inst.id}</td><td>${inst.first_name} ${inst.last_name}</td>`+
                `<td>${inst.credentials.email}</td><td><button class="btn btn-matricular btn-sm">Matricular</button></td>`;
            tbody.appendChild(tr);
        });
    });
}

window.addEventListener('DOMContentLoaded', loadInstructors);
