# community-services-locator-ui

1. App Site: https://scode-test.appspot.com/
2. Community services repos:
  2.1 UI: https://github.com/SCODEMeetup/community-services-locator-ui
  2.2 API: https://github.com/SCODEMeetup/mofb-api
3. Project Board: https://github.com/orgs/SCODEMeetup/projects/8
4. [Introduction website](https://scodemeetup.github.io/locator-jekyll/)

# Steps to start developing

1. download [nvm](https://github.com/creationix/nvm)
2. Install node 10
3. clone the code base
4. run the following command `npm i` - installs all node dependencies
5. to start locally run the following command `npm run dev`
6. navigate to [localhost:3000](http://localhost:3000/)

# UI mockup

1. [Services locator app mockup](https://xd.adobe.com/view/59760ef8-d849-4587-6a29-44f78a3fb151-2f47/)

# Navigating the folder structure

NOTE: All UI code is inside `src/renderer`.
`components` - contains the simple components the application uses (ie: button, appbar, icon, etc).
`containers` - contains multiple components that can be reused between different scenes
`scenes` - The main code specific to each page (ie home). This can contain containers & components
`redux/middleware` - Code for changes that need to be made during routing changes (ie fetch more data from the server, etc)
`redux/modules` - Code for redux store changes.

# Redux done with Paths

This repository does not follow the traditional approach to redux. This repository abstracts away the boilerplate of actions & reducers. Those have been replaced with two actions and paths.

## Actions

1. `setstate` - used to set a specific piece of the store (usage: `setstate(value, [path-to-state])`)
2. `select` - used to grab a specific piece of the store (usage: `select([path-to-state], store)`)

## Paths

Paths are just arrays that traverse the store to the specific peice of state the user needs to access (grab/set).

example:

```
# store
{
  toDo: {
    list: [],
    dummy: 'test'
  }
}

# path variables
const pathToList = ['toDo', 'list'];
const dummyPath = ['toDo', 'dummy'];

#grab piece of the store
const grabValue = select(pathToList, store);

# set piece of store
  dispatch(setstate('newValue', dummyPath));

  # new store after call above
  {
    toDo: {
      list: [],
      dummy: 'newValue'
    }
  }
```

## Deploying to Heroku

Continuous deployment is setup to push code in prod when master is updated.
