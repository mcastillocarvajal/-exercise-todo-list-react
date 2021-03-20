import React, { useState, useEffect } from "react";

export function Home() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getAPI();
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		const newTodo = {
			label: todo,
			done: false
		};

		if (/^\s*$/.test(todo)) {
			alert("Your todo cannot be empty!");
		} else {
			setTodos([...todos].concat(newTodo));
			setTodo("");
			putAPI(todos);
		}
	}

	function deleteTodo(i) {
		todos.splice(i, 1);
		setTodos([...todos]);
		putAPI(todos);
	}

	const handleClear = () => {
		setTodos([]);
	};

	// FETCH FUNCTIONS

	const getAPI = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mcastillo", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				setTodos(data);
				console.log(data);
			})
			.catch(err => {
				console.error(err);
			});
	};

	const putAPI = element => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mcastillo", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(element)
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.error(err);
			});
	};

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
			{todos.map((todo, index) => (
				<div className="input-group mb-3" key={index}>
					<div className="form-control">{todo.label}</div>
					<button
						className="btn btn-outline-danger"
						onClick={() => deleteTodo(index)}>
						<i className="fas fa-trash-alt"></i>
					</button>
				</div>
			))}
			<small>{todos.length} item(s) left.</small>
			<br></br>
			<button className="btn btn-danger mt-2" onClick={handleClear}>
				Clear all tasks
			</button>
		</div>
	);
}
