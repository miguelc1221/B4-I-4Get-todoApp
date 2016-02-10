import React, { Component } from 'react';
import './app.css';

import SearchBar from './searchBar/search_bar';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            term: '',
            todos: [],
            selectedCheckBoxes: []
        }
    }

    componentDidMount() {
        var storedTodos = [];
        Object.keys(localStorage).map((key) => {
            return storedTodos.push({id: key, todo: localStorage[key]})
        });
        this.setState({ todos: storedTodos })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        var todoLength = this.state.todos.length;
        var task = 'task' + todoLength;
        var concatState = this.state.todos.concat({ id: task, todo: this.state.term })
        this.setState({ todos: concatState });

        localStorage.setItem(task,this.state.term);
        this.setState({ term: ''});
    }

    handleRemoveTodo(id) {
        var filterState = this.state.todos.filter((todo) => {
            return todo.id !== id
        });

        var filterCheckBoxes = this.state.selectedCheckBoxes.filter((val) => {
            return val !== id
        });

        this.setState({ todos: filterState })
        this.setState({ selectedCheckBoxes: filterCheckBoxes })
        localStorage.removeItem(id);
    }

    handleOnChange(e) {
        this.setState({ term: e.target.value })
    }

    handleSelectedCheckbox(id) {
        var filterCheckBoxes = this.state.selectedCheckBoxes.filter((val) => {
            return val !== id
        });
        if(this.state.selectedCheckBoxes.indexOf(id) === -1) {
            this.setState({ selectedCheckBoxes: this.state.selectedCheckBoxes.concat(id)})
        } else {
            this.setState({ selectedCheckBoxes: filterCheckBoxes })
        }
    }
    render() {
        const list = this.state.todos.map((todo) => {
            return (
                <li key={todo.id}>
                    <div className="checkbox list-group-item">
                        <label className={this.state.selectedCheckBoxes.indexOf(todo.id) !== -1 ? 'todoDone' : null}>
                            <input type="checkbox"
                                val={todo.id}
                                onChange={this.handleSelectedCheckbox.bind(this, todo.id)}
                                defaultChecked={this.state.selectedCheckBoxes.indexOf(todo.id) !== -1}
                                />
                            {todo.todo}
                        </label>
                        <button className="remove-item btn btn-default btn-xs pull-right"
                            onClick={this.handleRemoveTodo.bind(this,todo.id)}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                    </div>
                </li>
            )
        });

        return (
            <div>
                <h1>B4-I-4Get</h1>
                <div className="container" styleName="todoContainer">
                    <SearchBar
                        submit={this.handleOnSubmit.bind(this)}
                        val={this.state.term}
                        change={this.handleOnChange.bind(this)}/>
                    <hr />
                    <ul className="list-unstyled list-group">
                        {list}
                    </ul>
                </div>

            </div>
        )
    }
}

// value={val}
// checked={todo.checkList.indexOf(val.toString()) !== -1}
// onChange={this.selectedValueChange}
// onClick={this.handleUpdateOnClick.bind(null,val)}
