# community-services-locator-ui

1. App Site: <https://scode-test.appspot.com/>
2. Community services repos:
   1. UI: <https://github.com/SCODEMeetup/community-services-locator-ui>
   2. API: <https://github.com/SCODEMeetup/mofb-api>
3. Project Board: <https://github.com/orgs/SCODEMeetup/projects/8>
4. [Introduction website](https://scodemeetup.github.io/locator-jekyll/)

## Steps to start developing

1. download [nvm](https://github.com/creationix/nvm)
2. Install node 10
3. clone the code base
4. run the following command `npm i` - installs all node dependencies
5. follow the instructions [here](https://developers.google.com/maps/gmp-get-started#quickstart) to set up a new Google Maps project, including creating an API key
6. Copy the `.env.example` file and rename it to `.env`. Make sure `MAP_KEY` is set to your new Google Maps API Key.
7. to start locally run the following command `npm run dev`
8. navigate to [localhost:3000](http://localhost:3000/)

#### Setting up `.env`

The `.env` file is a file that is only used in development to set temporary values so each developer has the option to use unique values for different config settings. Make sure you copy the `.env.example` and rename it to `.env` for webpack to use the values in that file.

- `MAP_KEY` Used for the Google Maps API Key
  - default: `null`
- `API_BASE` Used for the base URL to the Mid-Ohio Food Back API, this can be replaced with `http://localhost:[port]` to use the `mofb-api` that is running on your local machine
  - default: `https://mofb-api.appspot.com`

## Navigating the folder structure

- `public` Contains all statically served files which are copied to `dist` on build
- `src`
  - `renderer` Contains the code for the UI
    - `components` Contains the simple components the application uses (ie: `Button`, `CustomAppBar`, `Icon`, etc).
    - `containers` Containers that have multiple components that can be reused between different scenes
    - `scenes` The main code specific to each page view. This can contain containers & components. Also contains app routes and route components for the router.
      - `index.jsx` Map of the route components
      - `router.js` Define all pages/routes here
    - `redux` contains all redux code
      - `middleware` Code for changes that need to be made during routing changes (ie fetch more data from the server, etc)
      - `modules` Individual modules containing redux operations
  - `scss` global styles
    - `_buttons.scss` contains button styles
    - `_colors.scss` contains color helper classes
    - `_flex.scss` contains flex box helper classes
    - `_shadows.scss` generates the Material Design shadow helper classes
    - `_spacing.scss` contains spacing (margin/padding helper classes)
    - `_typography.scss` contains text formatting helpers
    - `_utilities.scss` contains miscellaneous style utilities
    - `_variables.scss` contains all scss variables
      - colors, base padding, navbar height, shadows, border radius
    - `_zindex.scss` contains all z-index levels for components
    - `styles.scss` main stylesheet
  - `utils` javascript utilities
    - `general.js` General javascript utilities

## Redux done with Paths

This repository does not follow the traditional approach to redux. This repository abstracts away the boilerplate of actions & reducers. Those have been replaced with two actions and paths.

### Actions

1. `setstate` - used to set a specific piece of the store
   - usage: `setstate(value, [path-to-state])`
2. `select` - used to grab a specific piece of the store
   - usage: `select([path-to-state], store)`

### Paths

Paths are just arrays that traverse the store to the specific piece of state the user needs to access (grab/set).

## Store Example

```javascript
// import the modules to select from and commit to store
import { select, setstate } from 'redux-modules/general';
import App from 'src/renderer';

const { store } = App;

// example store object
// store.getState() === {
//   toDo: {
//     list: [],
//     dummy: 'test',
//   },
// };

// set path variables
const toDo = ['toDo'];
const pathToList = [...toDo, 'list'];
const dummyPath = [...toDo, 'dummy'];

// grab piece of the store
const grabValue = select(pathToList, store.getState());

// grabValue === []

// set piece of store
store.dispatch(setstate('newValue', dummyPath));

// store.getState() === {
//    toDo: {
//      list: [],
//      dummy: 'newValue'
//    }
// }
```

## CSS Helpers

There are lots of helper classes for styling/positioning available for better design/ui.

### Typography

Use the following classes to change text alignment

- `.text-center`
- `.text-left`
- `.text-right`

Use the following classes to change text size

- `.text-big`
- `.text-small`

Make text underlined

- `.text-underline`

Wrap text with line breaks

- `.wrap-lines`

### Margin/Padding

There are margin and padding helpers for the following pixel counts:  
`0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 300`

To give an element a margin on all sides just use the helper class `m15` which will add a margin of 15px on each side.

Padding is done the same way but with a `p15` class.

If you want to target a single side for margin or padding you can add another letter after the `m` or `p` to indicate which side you want:

- `ml5` = `margin-left: 5px;`
- `mr5` = `margin-right: 5px;`
- `mt5` = `margin-top: 5px;`
- `mb5` = `margin-bottom: 5px;`

The side classes will override the base margin/padding classes so you can use them in combination:

```html
<div class="m5 mt15">I have 5px margin on all sides except the top which has 15px margin</span>
```

### Buttons

If you want to make a very large button you can use the `.jumbo` class

### Flex box

Make an element `display: flex`:

```html
<div class="flex"></div>
```

Change flex direction to column:

```html
<div class="flex column"></div>
```

Reverse the elements:

```html
<div class="flex row reverse"></div>
<div class="flex column reverse"></div>
```

Change the flex alignment:

```html
<div class="flex items-baseline"></div>
<div class="flex items-center"></div>
<div class="flex items-end"></div>
<div class="flex items-start"></div>
<div class="flex items-stretch"></div>
```

Disable wrapping:

```html
<div class="flex no-wrap"></div>
```

Fill remaining column space:

```html
<div class="flex"><div class="col-grow"></div></div>
```

#### Using Column grid

There are 12 columns in the grid. You can use classes `.col-1` through `.col-12` to signify the width of the column. The columns must be placed inside a `.row` element.

```html
<div class="row">
  <div class="col-4">I am 1/3 width or 33.33%</div>
  <div class="col-2">I am 1/6 width or 16.67%</div>
  <div class="col-6">I am 1/2 width or 50%</div>
</div>
```

You can signify screen widths as well with:

- `xs` <= 599px
- `sm` >= 600px and <= 768px
- `md` >= 769px and <= 1023px
- `lg` >= 1024px and <= 1399px
- `xl` >= 1400px

```html
<div class="row">
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
    I am full width at or below 768px I am half width between 769px and 1023px I
    am a third width between 1024px and 1399px I am a fourth width at or above
    1400px
  </div>
</div>
```

To add spacing between columns you can use the `.xs-gutter`, `.sm-gutter`, `.md-gutter`, `.lg-gutter`, and `.xl-gutter` classes on the `.row` element.

```html
<div class="row xs-gutter">
  <div class="col-6"></div>
  <div class="col-6">I have a small space to the left of me</div>
</div>
```

### Material design shadows

There are helper classes for shadow levels from `.shadow-1` through `.shadow-24`. You can add a shadow class to any element to make it appear like it is floating.

### Miscellaneous CSS helpers

```html
<span class="muted">I have a opacity at 50%</span>

<div class="max-width">
  <p>I can only expand to 600px for better readability</p>
</div>

<div class="circle">
  I am a circle if you add equal height and width properties
</div>

<div class="pointer">
  Your mouse will turn to a pointer (link) if you hover over me
</div>

<div class="min-height-100">Make my minimum height 100%</div>

<div class="no-height">Unset my height property</div>
<div class="no-width">Unset my width property</div>

<div class="rounded">Give me a uniform border radius</div>
```

## Deploying to Heroku

Continuous deployment is setup to push code in prod when master is updated.
