import React, { Component } from "react";

class AddItem extends Component {
  state = {
    label: ""
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: ""
    });
  };
  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Введите дело"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}

export default AddItem;
