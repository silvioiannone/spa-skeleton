### Translations

Translations files can be defined in *resources/assets/locales/<locale>.json*.

    {
        "settings": {
            "company": "Bolag",
            "language": "Språk"
        }
    }
    
    // resources/assets/locales/sv.json

These files must be available in the *public/locales* folder. That can easily be accomplished using Laravel Mix:

    Mix.copy('resources/assets/locales', 'public/locales');
