# grunt-css-2-data-uri

Replace image urls to data uri. Also warns if a data uri would be duplicated, so developer can move them under one CSS rule to save size.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-img-2-data-uri --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-img-2-data-uri');
```

## The "css_img_2_data_uri" task

### Overview
In your project's Gruntfile, add a section named `css_img_2_data_uri` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    css_img_2_data_uri: {
        options: {
            files: [
                {
                    src: 'path/to/source.css',
                    dest: 'path/to/output.css'
                },
                {
                    src: 'path/to/another/source.css',
                    dest: 'path/to/another/output.css'
                }
            ]
        }
    }
})
```

### Options

#### options.files
Type: `Array`

List of css files which needs to be processed.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### v0.1.1

 * Detect and warn if duplicated image path found.

### v0.1.0

 * Inital release, it can replace file paths to data uri in css files.
