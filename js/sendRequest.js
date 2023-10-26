async function sendRequest(url, method, body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data)
        }
        return data

    } catch (error) {
        throw error;
    }
}
export default sendRequest