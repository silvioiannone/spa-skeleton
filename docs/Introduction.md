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

    const mix            = require('laravel-mix');
    const SPASkeletonMix = require('spa-skeleton/webpack.mix.js');

    SPASkeletonMix
        .mergeWebpack(...)
        .extract(...)
        .build(mix);

## Extract vendor packages

It's possible to extract vendor packages to a `vendor.js` file so that if you update your 
application the user won't have to re-download also all the vendor code since it's less likely to
change.

    SPASkeletonMix.extract(['vuetify', 'vue']);

## Custom Webpack configuration

It's possible to merge spa-skeleton's WebPack configuration with a custom configuration.

    SPASkeletonMix.mergeWebpack({...customConfiguration})
