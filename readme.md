![Spooky SPA skeleton](https://i.imgur.com/f0eeixE.jpg)

# SPA-Skeleton

#### A VueJS based single page application that integrates with Laravel.

## Introduction

The main purpose of this package is to provide a quick starting point for developing a SPA.

Disclaimer: this product is used internally at Bloom Webb AB and it is subject to changes and
continuous development. I don't recommend using it as a starting point for your application at the
moment.

## Features

- Written in TS
- VueJS 2 core
- State machine (Vuex)
- Client ORM (Vuex ORM)
- Realtime translations (VueI18n)
- Realtime WS events and global event hub
- API client library
- Route guards
- Form validation
- Vuetify support out of the box

## Usage

Require the package using **npm**:

    npm install spa-skeleton --save

Bootstrap the SPA simply using:

    import App from 'spa-skeleton';
    
    (new App).start();

Add the following to your *webpack.mix.js* in order to build the SPA-Skeleton:

    const SPASkeletonMix = require('spa-skeleton/webpack.mix.js');
    
    SPASkeletonMix.build();

## Documentation

Read [the documentation ](https://github.com/silvioiannone/spa-skeleton/blob/master/docs/Readme.md) 
in order to learn more about the project.
