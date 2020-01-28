## tree()

This non-component function can also have a playground to test it out.

Styleguidist has determined rendering a props table for non-components is out of scope for them.
I'm too lazy to render my own let alone expect it to be maintained.
https://github.com/styleguidist/react-styleguidist/issues/1218

```js
import {TreeAll} from './tree.js';

const value = TreeAll();

<>{value}</>
```


```js
//import {TreeGrid} from './tree-grid.js';

//const value = TreeGrid();

//<>{value}</>
```


```js
//import {TreeViewer} from './tree-viewer.js';

//const value = TreeViewer();

//<>{value}</>
```

## material-table based data-tree
### Uses ScheduleBox to render visual task status

```js
import {DataTree} from './data-tree.js';
const language = 'en';
const release  = '1.2.1';
const value = DataTree( language, release );

<>{value}</>
```