async function loadStudents(){
    const profile = await apiFetch('/profile?gc=1');
    if(!profile || !profile.user || !profile.user.courses) return;
    const courses = Object.values(profile.user.courses);
    for(const course of courses){
        const members = await apiFetch(`/courses/${course.id}/members`);
        if(!members || !members.members) continue;
        const tableId = course.name.toLowerCase().includes('ing') ? 'tablaIngles'
                       : course.name.toLowerCase().includes('espa') ? 'tablaEspanol'
                       : null;
        if(!tableId) continue;
        const tbody = document.querySelector(`#${tableId} tbody`);
        if(!tbody) continue;
        tbody.innerHTML = '';
        Object.values(members.members).forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${m.id}</td><td>${m.name}</td>`+
                `<td>-</td><td>-</td><td>-</td>`;
            tbody.appendChild(tr);
        });
    }
}
window.addEventListener('DOMContentLoaded', loadStudents);
