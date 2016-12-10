import request from '../utils/request';

export async function list() {
    return request('/api/lesson');
}

export async function get(id) {
    return request('/api/lesson/' + id);
}

export async function create(name) {
    return request(`/api/lesson/`, { method: 'POST', body: JSON.stringify({ name }) });
}

export async function remove(lessonId) {
    return request(`/api/lesson/${lessonId}`, { method: 'DELETE' });
}

export async function updateEntry(lessonId, entry) {
    return request(`/api/lesson/${lessonId}/entry/${entry._id}`, { method: 'PUT', body: JSON.stringify(entry) });
}

export async function createEntry(lessonId, entry) {
    return request(`/api/lesson/${lessonId}/entry/`, { method: 'POST', body: JSON.stringify(entry) });
}

export async function deleteEntry(lessonId, entryId) {
    return request(`/api/lesson/${lessonId}/entry/${entryId}`, { method: 'DELETE' });
}
