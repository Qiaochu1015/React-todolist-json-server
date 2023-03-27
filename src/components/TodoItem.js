import React from "react";

export default class TodoItem extends React.Component {
	state = {
		inputValue: this.props.todo.content,
	};

	handleChange = (e) => {
		this.setState({
			inputValue: e.target.value,
		});
	};

	render() {
		const {
			content,
			id,
			isCompleted,
			isEdit,
			todo,
			handleEdit,
			handleSave,
			handleComplete,
			handleDelete,
		} = this.props;
		return (
			<div>
				{isEdit ? (
					<input
						value={this.state.inputValue}
						onChange={this.handleChange}
					/>
				) : (
					<span>{content}</span>
				)}{" "}
				{isEdit ? (
					<button
						onClick={() =>
							handleSave({
								...todo,
								content: this.state.inputValue,
							})
						}
					>
						Save
					</button>
				) : (
					<button onClick={() => handleEdit(id)}>Edit</button>
				)}
				<button onClick={() => handleComplete(todo)}>
					{isCompleted ? "Uncomplete" : "Complete"}
				</button>
				<button onClick={() => handleDelete(todo)}>Delete</button>
			</div>
		);
	}
}
