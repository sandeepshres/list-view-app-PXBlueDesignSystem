import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('filters search results correctly', () => {
  const app = shallow(<App />).dive();
  app.instance().setState({
    list: [
      {
        "id": 1,
        "grade": "F",
        "className": "Science 101",
        "teacherName": "Prof. Vinay",
        "studentName": "xxx",
        "metaData": {
          "data": "complete",
          "background-color": "green"
        }
      },
      {
        "id": 1,
        "grade": "F",
        "className": "Science 101",
        "teacherName": "Prof. Vinay",
        "studentName": "zzz",
        "metaData": {
          "data": "complete",
          "background-color": "green"
        }
      },
      {
        "id": 1,
        "grade": "F",
        "className": "Science 101",
        "teacherName": "Prof. Vinay",
        "studentName": "xxx",
        "metaData": {
          "data": "complete",
          "background-color": "green"
        }
      }
    ]
  });
  app.instance().setState({ query: 'x' });
  let filtered = app.instance().searchResults();
  expect(filtered.length).toEqual(2);
  app.instance().setState({ query: 'z' });
  filtered = app.instance().searchResults();
  expect(filtered.length).toEqual(1);
  app.instance().setState({ query: '1' });
  filtered = app.instance().searchResults();
  expect(filtered.length).toEqual(0);
  app.instance().setState({ query: 'm' });
  filtered = app.instance().searchResults();
  expect(filtered.length).toEqual(0);
});