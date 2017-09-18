import React from 'react';
import ReactDOM from 'react-dom';
import PostBuilder from './PostBuilder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostBuilder />, div);
});
