import React, { useState } from "react";

export function Home() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const [count, setCount] = useState(0);

	function handleSubmit(e) {
		e.preventDefault();

		const newTodo = {
			id: new Date().getTime(),
			text: todo
		};

		if (/^\s*$/.test(todo)) {
			alert("Your todo cannot be empty!");
		} else {
			setTodos([...todos].concat(newTodo));
			setTodo("");
			setCount(count + 1);
		}
	}

	function deleteTodo(id) {
		const updatedTodos = [...todos].filter(todo => todo.id !== id);

		setTodos(updatedTodos);
		setCount(count - 1);
	}

	//const getAPI = () => {
	// fetch("https://assets.breatheco.de/apis/fake/todos/user/mcastillo", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
	// 	.then(res => console.log(res.json()))
	// 	.then(data => console.log(data))
	// 	.catch(err => console.log(err));
	//};

	//const postAPI = () => {
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/mcastillo", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify({
	// 			user: "mcastillo"
	// 		})
	// 	});
	//};

	return (
		<div id="container">
			<h3>Todo List</h3>
			<form className="input-group my-3" onSubmit={handleSubmit}>
				<input
					className="form-control"
					type="text"
					onChange={e => setTodo(e.target.value)}
					value={todo}
					placeholder="Type your todo"
					maxLength="32"></input>
				<div className="input-group-append">
					<button className="btn btn-outline-primary" type="submit">
						Add
					</button>
				</div>
			</form>
			{todos.map(todo => (
				<div className="input-group mb-3" key={todo.key}>
					<div className="form-control">{todo.text}</div>
					<button
						className="btn btn-outline-danger"
						onClick={() => deleteTodo(todo.id)}>
						<i className="fas fa-trash-alt"></i>
					</button>
				</div>
			))}
			<small>{count} item(s) left.</small>
		</div>
	);
}
