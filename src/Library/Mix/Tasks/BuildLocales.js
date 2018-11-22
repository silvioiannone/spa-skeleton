const Task = require('laravel-mix/src/tasks/Task'),
      FS = require('fs'),
      Path = require ('path'),
      File = require('laravel-mix/src/File'),
      _ = require('lodash');

/**
 * Laravel Mix task that builds locales for the app.
 */
class BuildLocalesTask extends Task
{
    /**
     * Run the task.
     */
    run()
    {
        this.appLocalesPath = 'resources/locales';
        this.skeletonLocalesPath = __dirname + '/../../../Assets/Locales';

        this.skeletonLocales = [];

        let appLocales = [];
        let files = [];

        FS.readdirSync(this.appLocalesPath)
            .forEach(file =>
            {
                appLocales.push(file);
                files.push(new File(this.appLocalesPath + '/' + file));
            });

        FS.readdirSync(this.skeletonLocalesPath)
            // We can filter out all the locales that are not present in the app.
            .filter(file => appLocales.indexOf(file) >= 0)
            .forEach(file =>
            {
                this.skeletonLocales.push(file);
            });

        // The parent class uses the `files` property in order to set the files that should be
        // watched but it's expecting a `FilesCollection`. In this case we can't use the
        // `FilesCollection` because we need to look at the files from two different sources.
        // Instead we create a files that behaves in a a compatible way.
        //
        // Files contains all the files that shoul be watched for changes.
        this.files = {
            get() {
                return files.map(file => file.relativePath());
            }
        };

        appLocales.forEach(file => {
            this.mergeLocales(file);
            this.assets.push('locales/' + file);
        });
    }

    /**
     * Handle when a relevant source file is changed.
     *
     * @param {string} updatedFile
     */
    onChange(updatedFile)
    {
        this.mergeLocales(Path.basename(updatedFile));
    }

    /**
     * Merge a skeleton locale with an app locale.
     *
     * @param {string} file
     */
    mergeLocales(file)
    {
        let appLocale = JSON.parse(
            FS.readFileSync(this.appLocalesPath + '/' + file)
        );

        let skeletonLocale = null;

        if (this.skeletonLocales.find(locale => locale === file)) {
            skeletonLocale = JSON.parse(
                FS.readFileSync(this.skeletonLocalesPath + '/' + file)
            );
        }

        if (skeletonLocale) {
            appLocale = _.merge(skeletonLocale, appLocale);
        }

        if (! FS.existsSync('public/locales')) {
            FS.mkdirSync('public/locales');
        }

        FS.writeFileSync('public/locales/' + file, JSON.stringify(appLocale, null, 4));
    }
}

module.exports = BuildLocalesTask;
