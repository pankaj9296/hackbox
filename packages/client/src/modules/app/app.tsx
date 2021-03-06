import React, { ReactElement } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Hackbox from '../hackbox/hackbox';
import { SelectedFileProvider } from '@hackbox/client/contexts/selected-file';
import { FSContext } from '@hackbox/client/contexts/fs';
import { FS } from '@hackbox/client/services/fs/fs';
import { Broadcaster } from '@hackbox/client/services/broadcaster/broadcaster';

export default function App(): ReactElement {
  // TODO: replace with template files
  const DEV_FILES = {
    './data/person.json': `{
  "name": "Ameer",
  "city": "Hyderabad"
}`,
    './components/counter.js': `import React, { useState } from 'react';
import styled from 'styled-components';
import hello from '../hello.js';

export default function Counter() { 
  const [count, setCount] = useState(0);

  const Button = styled.button\`
    /* Adapt the colors based on primary prop */
    background: \${props => props.primary ? "palevioletred" : "white"};
    color: \${props => props.primary ? "white" : "palevioletred"};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  \`;

  function increment() {
    setCount(count => count + 1);
  }

  function decrement() {
    setCount(count => count - 1);
  }

  return (
    <>
      <h1>{count}</h1>
      <Button onClick={increment} primary>+</Button>
      <Button onClick={decrement}>-</Button>
      <div>
        <button onClick={hello}>Say hello From Counter</button>
      </div>    
    </>
  );
}    
`,
    './index.js': `import React from 'react';
import ReactDOM from 'react-dom';  
import Counter from './components/counter.js';
import hello from './hello.js';
import './index.css';
import { name, city } from './data/person.json';

const App = (
  <>
    <Counter />
    <div>
      <button onClick={hello}>Say hello From App</button>
    </div>
    <div>
      <hr/>
      The below data is from JSON <br/>
      {name} lives at {city}
    </div>    
  </>
);

ReactDOM.render(App, document.getElementById('output'));
`,
    './hello.js': `export default function() {
  alert('this is to test proper caching');
}
`,
    './index.css': `body {
  background-color: red;
}`
  };

  const broadcaster = Broadcaster.getInstance();

  broadcaster.listen('PREVIEW_READY', () => {
    broadcaster.broadcast('FS_INIT', {
      fsJSON: DEV_FILES,
      entry: './index.js'
    });
  });

  return (
    <SelectedFileProvider>
      <FSContext.Provider value={new FS(DEV_FILES)}>
        <HashRouter>
          <Switch>
            <Route path={'/'} component={Hackbox} exact />
          </Switch>
        </HashRouter>
      </FSContext.Provider>
    </SelectedFileProvider>
  );
}
