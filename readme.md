![Spooky SPA skeleton](https://i.imgur.com/f0eeixE.jpg)

# SPA-Skeleton

#### A VueJS based single page application that integrates with Laravel.

## Introduction

The main purpose of this package is to provide a quick starting point for developing a SPA.

Disclaimer: this product is used internally at Bloom Webb AB and it is subject to changes and
continuous development. I don't recommend using it as a starting point for your application at the
moment.

## Features

 - VueJS 2 core
 - State machine (Vuex)
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

    import SPASkeleton from 'spa-skeleton';

    (new SPASkeleton).boot();

Add the following to your *webpack.mix.js* in order to build the SPA-Skeleton:

    const mix            = require('laravel-mix');
    const SPASkeletonMix = require('spa-skeleton/webpack.mix.js');

    SPASkeletonMix.build(mix);
    
## Documentation

The documentation is available in the [repository wiki](https://github.com/silvioiannone/spa-skeleton/docs).
