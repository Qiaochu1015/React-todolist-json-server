import React from "react";
import "./App.css";
import { getTodos, createTodo, editTodo } from "./apis/api";
import TodoItem from "./components/TodoItem";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			todos: [],
			isEdit: null,
		};
		this.textInput = React.createRef();
	}

	handleInput = (e) => {
		this.setState({
			...this.state,
			input: e.target.value,
		});
	};

	onClickAdd = () => {
		createTodo({
			content: this.state.input,
			isDeleted: false,
			isCompleted: false,
			isEditable: false,
		}).then((data) => {
			// this.state.todos = [data, ...this.state.todos];
			this.setState({
				...this.state,
				todos: [data, ...this.state.todos],
			});
			this.textInput.current.value = "";
			this.textInput.current.focus();
		});
	};

	onClickDelete = (id) => {
		editTodo(id, {
			isDeleted: true,
		}).then((data) => {
			const updatedTodos = this.state.todos.map((item) => {
				if (item.id === id) {
					item.isDeleted = true;
				}
				return item;
			});
			this.setState({
				...this.state,
				todos: [...updatedTodos],
			});
		});
	};

	handleEdit = (id) => {
		this.setState({
			isEdit: id,
		})
	};

	handleSave = (todo) => {
		editTodo(todo).then((data) => {
			this.setState({
				isEdit: null,
				todos: this.state.todos.map((item) => {
					if(item.id === data.id) {
						return data
					}
					return item
				})
			})
		})
	}

	handleComplete = (todo) => {
		editTodo({
			...todo,
			isCompleted: !todo.isCompleted,
		}).then((data) => {
			this.setState({
				todos: this.state.todos.map((item) => {
					if(item.id === data.id) {
						return {...data}
					}
					return item
				})
			});
		});
	};

	componentDidMount = () => {
		getTodos().then((data) => {
			this.setState({ ...this.state, todos: data });
			this.textInput.current.focus();
		});
	};

	render() {
		return (
			<div className="App">
				<h1>Todo List</h1>

				<div className="input-container">
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleInput}
						ref={this.textInput}
					/>
					<button
						className="add-btn"
						onClick={this.onClickAdd}
						disabled={!this.state.input}
					>
						Add Task
					</button>
				</div>

				<div className="task-container">
					<div className="pending-container">
						<h3>Pending Tasks</h3>
						{this.state.todos.some(
							(item) => !item.isDeleted && !item.isCompleted
						) ? (
							this.state.todos
								.filter(
									(item) =>
										!item.isDeleted && !item.isCompleted
								)
								.map((item) => (
									<TodoItem
										{...item}
										todo={item}
										key={item.id}
										onClickDelete={this.onClickDelete}
										handleEdit={this.handleEdit}
										handleSave={this.handleSave}
										handleComplete={this.handleComplete}
										isEdit={item.id === this.state.isEdit}
									/>
								))
						) : (
							<h4>No task to display</h4>
						)}
					</div>

					<div className="complete-container">
						<h3>Completed Tasks</h3>
						{this.state.todos.some(
							(item) => !item.isDeleted && item.isCompleted
						) ? (
							this.state.todos
								.filter(
									(item) =>
										!item.isDeleted && item.isCompleted
								)
								.map((item) => (
									<TodoItem
										{...item}
										key={item.id}
										todo={item}
										onClickDelete={this.onClickDelete}
										handleEdit={this.handleEdit}
										handleSave={this.handleSave}
										handleComplete={this.handleComplete}
										isEdit={item.id === this.state.isEdit}
									/>
								))
						) : (
							<h4>No task to display</h4>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
