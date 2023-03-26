function myFetch(url, options = {}) {
	return new Promise((res, rej) => {
		let xhr = new XMLHttpRequest();
		xhr.open(options.method || "GET", url);
		xhr.responseType = "json";
		for (let header in options.headers) {
			xhr.setRequestHeader(header, options.headers[header]);
		}
		xhr.onload = () => {
			res(xhr.response);
		};
		xhr.onerror = () => {
			rej(new Error("An error occurred"));
		};
		xhr.send(options.body);
	});
}

const url = "http://localhost:8000/todos"

export const getTodos = () => {
    return myFetch(url)
}

export const createTodo = (newTodo) => {
    return myFetch(url, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {"Content-Type": "application/json"}
    })
}

export const deleteTodo = (id) => {
    return myFetch(`${url}/${id}`, {
        method: "DELETE",
    })
}

export const editTodo = (todo) => {
    return myFetch(`${url}/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify(todo),
        headers: {"Content-Type": "application/json"}
    })
}