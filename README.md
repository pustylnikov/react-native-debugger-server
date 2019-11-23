### Installation
```js
npm install -g @anvilapp/react-native-debugger-server
npm install --save @anvilapp/react-native-debugger-client
```
or 
```js
yarn global add @anvilapp/react-native-debugger-server
yarn add @anvilapp/react-native-debugger-client
```

### Usage
Run debugger server
```js
rndebugger --port=8788 --socketPort=8787
```
Open http://localhost:8788/debugger in your browser

Add to index.js
```js
import withDebugger from '@anvilapp/react-native-debugger-client';

const your_ip_address = '192.168.88.15:8787'; // default port is 8787

withDebugger(your_ip_address);

console.log('Something...');
```

### Supported methods
```js
console.clear
console.count
console.dir
console.dirxml
console.error
console.group
console.groupCollapsed
console.groupEnd
console.info
console.log
console.table
console.time
console.timeEnd
console.warn
```
