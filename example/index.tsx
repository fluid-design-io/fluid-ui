import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
  return <div>Hi</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
