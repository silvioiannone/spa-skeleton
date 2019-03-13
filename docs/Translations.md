### Translations

Translations files can be defined in *resources/locales/\<locale>.json*.

    {
        "settings": {
            "company": "Bolag",
            "language": "Språk"
        }
    }
    
    // resources/locales/sv.json

These files must be available in the *public/locales* folder. That can easily be accomplished using Laravel Mix:

    Mix.copy('resources/locales', 'public/locales');
