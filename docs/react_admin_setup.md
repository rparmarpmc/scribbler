# React widgets structure

## Structure

Currently We have two repositories for react widgets:

- react_admin (git@github.com:Scribbler-Holdings-Limited/react_admin.git)
- react_components_library (git@github.com:Scribbler-Holdings-Limited/react_components_library.git)

Hint : clone both repositories and shopify theme to the same workspace folder

- react_admin - acts as a layer between shopify and react widgets. It is responsible for loading widgets into coresponding divs, parsing initial data for widgets, comunication and whole logic of widgets.

- react_components_library - for reusable components that can be reused by react admin to build widgets. Components should be generic so they can be reused in other Scribbler projects as well

## Working/Updating components

For local development use whatever local linkin method is preffered by you.
I am using YALC as yarn or npm linking doesn't work correctly for me.

```
sudo npm install -g yalc - instal yalc globaly
yalc publish - to publish component
yalc push - to push update

--- in react admin ---
yalc add scribbler-components-library - to add local package to react_admin
yalc remove scribbler-components-library - to remove package ???

```

Make changes in componets library and main dir run

```
./update.sh

#!/bin/bash
yarn build
yalc push
cd ../react_admin
rm -rf node_modules
yarn install
```

that will build new version and install new "scribbler-components-library" package

## Updating react-admin in shopify theme flow

Make changes in react_admin.

```
yarn build
```

build will move all necessary files to shopify theme repository and also reneme base js and css files according to :

```
"build": "
react-scripts build
&& mv build/static/js/main*.js ../shopify_store_theme/assets/react-admin.js
&& mv build/static/css/main*.css ../shopify_store_theme/assets/react-admin.css
&& mv build/static/js/main*.js.map ../shopify_store_theme/assets/
&& mv build/static/css/main*.css.map ../shopify_store_theme/assets/",
```

Then git add, commit and push in theme repository on correct branch.
This will automatically push and update theme on git and shopify server.
