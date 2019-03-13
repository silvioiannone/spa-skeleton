#App state machine module

## Introduction

The app state machine module holds the app state.

## Actions

No actions are provided by this module.

## Getters

- `app`: Get the app state.

## Mutations

- `app/INSERT`: Merge the given state with the app state.
- `app/SET_ERROR`: Set an app error.
- `app/SET_SETTINGS`: Set the app settings.
- `app/SET_STATUS`: Set the app status.
- `ui/SET_NAVIGATION_DRAWER_VISIBILITY`: Show or hide the left navigation drawer.
- `ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY`: Show or hide the right navigation drawer.
- `ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY`: Show or hide the notifications drawer.
- `user/STORE_AUTHENTICATED_USER`: Store the authenticated user.
- `user/UPDATE_AUTHENTICATED_USER`: Update the authenticated user.
- `user/REMOVE_AUTHENTICATED_USER`: Remove the authenticated user.
- `user/CHANGE_SETTING`: Change a setting for the authenticated user.
