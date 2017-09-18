import React from 'react';
import ReactDOM from 'react-dom';
import Bulletin from './Bulletin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bulletin />, div);
});
