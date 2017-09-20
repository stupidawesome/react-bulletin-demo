import React, { Component } from 'react';
import './Input.css';
import classNames from 'classnames';

class Input extends Component {
  render() {
    const {formGroup} = this.props;

    return (
      <div className={
        `Input
        ${classNames({
          valid: formGroup.valid,
          invalid: formGroup.invalid,
          dirty: formGroup.dirty,
          pristine: formGroup.pristine,
          touched: formGroup.touched,
          untouched: formGroup.untouched
        })}`
      }>
        {this.props.children}
        <div className="Input-focus"/>
      </div>
    );
  }
}

export default Input;
