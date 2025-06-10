const API_ROOT = 'http://localhost:9090/api/v1';

async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token');
    const opts = Object.assign({}, options);
    opts.headers = Object.assign({}, opts.headers);
    if (token) {
        opts.headers['Authorization'] = token;
    }
    const res = await fetch(API_ROOT + path, opts).catch(() => null);
    if (!res || !res.ok) return null;
    return res.json().catch(() => null);
}
