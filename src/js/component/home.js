import React, { useState } from "react";

export function Home() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");

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
		}
	}

	function deleteTodo(id) {
		const updatedTodos = [...todos].filter(todo => todo.id !== id);

		setTodos(updatedTodos);
	}

	return (
		<div id="container">
			<h3>Todo List</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={e => setTodo(e.target.value)}
					value={todo}
					placeholder="Type your todo"></input>
				<div>
					<button type="submit">Add</button>
				</div>
			</form>
			{todos.map(todo => (
				<div key={todo.key}>
					<div>{todo.text}</div>
					<button onClick={() => deleteTodo(todo.id)}>Delete</button>
				</div>
			))}
		</div>
	);
}
