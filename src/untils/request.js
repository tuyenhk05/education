const API = "https://apiedu-hons.onrender.com/";
export const get = async (path) => {
    try {
        const response = await fetch(`${API +path}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export const post = async (path, body) => {
    try {
        const response = await fetch(`${API + path}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export const del = async (path, body) => {
    const response = await fetch(`${API + path}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}
export const put = async (path, body) => {
    const result = await fetch(`${API + path}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await result.json();
    return data;
}
export const patch = async (path, body) => {
    const result = await fetch(`${API + path}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await result.json();
    return data;
}