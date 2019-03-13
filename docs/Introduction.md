# Introduction

`spa-skeleton` is a highly opinionated NPM package that can be used to bootstrap the development of 
a SPA (Single Page Application) that integrates with a Laravel powered backend.

## Features

- VueJS 2 core
- State machine (Vuex)
- Realtime translations (VueI18n)
- Realtime WS events and global event hub
- Notifications and notification handlers
- API client library
- Route guards
- Form validation
- Vuetify support out of the box

## How to install it

Add the following to your *webpack.mix.js* in order to build the SPA-Skeleton:

    const SPASkeletonMix = require('spa-skeleton/webpack.mix.js');

    SPASkeletonMix.build();

## Extract vendor packages

It's possible to extract vendor packages to a `vendor.js` file so that if you update your 
application the user won't have to re-download all the vendor code since it's less likely to change.

    SPASkeletonMix.extract(['vuetify', 'vue']);

## Custom Webpack configuration

It's possible to merge spa-skeleton's WebPack configuration with a custom configuration.

    SPASkeletonMix.mergeWebpack({...customConfiguration})
    
## Compile SASS

Additional SASS files can be compiled.

    SPASkeletonMix.sass('path/to/file.scss');
    
The file will be compiled and included in the `all.css` outputted in the `public/css` folder.
