import React from 'react';
import ReactDOM from 'react-dom';
import NewComponent from './NewComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewComponent />, div);
});
