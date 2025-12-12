export async function getEmployees(quantity = 20) {
    try {
        const res = await fetch(`https://fakerapi.it/api/v1/persons?_quantity=${quantity}`);
        const json = await res.json();
        const data = json.data || [];

        const positions = [
            'Software Engineer',
            'Product Manager',
            'UX Designer',
            'QA Engineer',
            'DevOps Engineer',
            'Sales Manager',
            'Marketing Lead',
            'HR Manager',
            'Support Engineer',
            'CTO'
        ];

        return data.map((p, i) => ({
            id: p.uuid ?? p.id ?? String(i + 1),
            name: `${p.firstname || ''} ${p.lastname || ''}`.trim() || p.firstname || p.lastname || `Employee ${i + 1}`,
            position: p.employer?.title ?? positions[i % positions.length],
            phone: p.phone || '',
            email: p.email || '',
            image_url: p.image || p.photo || `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
            whatsapp_link: p.phone ? `https://wa.me/${(p.phone || '').replace(/\D/g, '')}` : '',
            linkedin_link: p.username ? `https://linkedin.com/in/${p.username}` : `https://linkedin.com/in/${(p.firstname || 'user').toLowerCase()}${(p.lastname || '').toLowerCase()}`,
            bio: p.description || p.text || ''
        }));
    } catch (err) {
        console.error('fakerApi getEmployees error', err);
        return [];
    }
}

export async function getEmployeeById(id) {
    // simplest approach: fetch 20 and find by id
    const list = await getEmployees(20);
    return list.find((e) => String(e.id) === String(id)) || null;
}
