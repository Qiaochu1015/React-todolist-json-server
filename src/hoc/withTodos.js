import React from "react";
import { getTodos, createTodo, deleteTodo, editTodo } from "../apis/api";

export const withTodos = (WrappedComponent) => {
  return class NewComponent extends React.Component {
    state = {
        todos: [],
        isEdit: null
    }

    handleSubmit = (content) => {
		createTodo({
			content: content,
			isDeleted: false,
			isCompleted: false,
		}).then((data) => {
			this.setState({
				...this.state,
				todos: [data, ...this.state.todos],
			});
		});
	};

    handleDelete = (todo) => {
		editTodo({
            ...todo,
			isDeleted: !todo.isDeleted,
		}).then((data) => {
			const updatedTodos = this.state.todos.map((item) => {
				if (item.id === data.id) {
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

    componentDidMount() {
        getTodos().then((todos) => {
            this.setState({
                todos,
            })
        })
    }

    render() {
        return (
            <WrappedComponent 
                todos={this.state.todos}
                isEdit={this.state.isEdit}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleSave={this.handleSave}
                handleComplete={this.handleComplete}
            />
        )
    }
  }
};
