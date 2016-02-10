import React from 'react';

export default (props) => {
    return (
        <form onSubmit={props.submit} className='input-group'>
            <input
                type="text"
                className="form-control"
                value={props.val}
                onChange={props.change}
                placeholder="Add todo"/>
            <span className="input-group-btn">
                <button className="btn btn-success" styleName="todoButton">Add todo</button>
            </span>
        </form>
    )
}
