# fo-markdown-note Component for Vue.js

**fo-markdown-note** is a **Vue.js** component that provides a simple Markdown editor that can be included in your Vue.js project.

fo-markdown-note is a thin Vue.js wrapper around the **SimpleMDE** Markdown editor JavaScript control.  SimpleMDE can be found at:
- https://simplemde.com/
- https://github.com/sparksuite/simplemde-markdown-editor

fo-markdown note is written in **ECMAScript 6th Edition** (a.k.a. **ECMAScript 2015**, a.k.a. **ES6**) and is intended for inclusion in an ES6 application.  No provision has been made for supporting earlier JavaScript editions.

fo-markdown-note is provided as an **ES6 module**. No provision has been made for older idiosyncratic module formats such as CommonJS or AMD.

fo-markdown-note is packaged into a single file using **rollup.js**.  Currently the bundle is not minified or uglified; we intend to do this in a later release.

## Using fo-markdown-note

To include fo-markdown-note in your project, simply import it using the ES6 *import* statement:

```JavaScript
import FoMarkdownNote from 'fo-markdown-note-bundle.js'
```

Then include it as a component in your Vue.js model:

```JavaScript
var vueModel = new Vue({
    el: '#app',
    components: {
        FoMarkdownNote
    }
})
```

This will make the *\<fo-markdown-note\>* tag available for use within your project's HTML. 

## Getting fo-markdown-note from NPM

If you want to use the **dist/fo-markdown-note-bundle.js** in your project and don't think you'll ever need to re-build it, you can obtain it from NPM using the command

```bash
npm install fo-markdown-note
```

This will place a copy of **fo-markdown-note-bundle.js** in your project's **node_modules** directory along with its dependencies.  You can then import it into your ES6 JavaScript using the command

```JavaScript
import FoMarkdownNote from 'node_modules/fo-markdown-note-bundle.js'
```

### Attributes

The following attributes can be included in an *\<fo-markdown-note\>* tag:

- *id*&nbsp;&nbsp;&nbsp;Required; every *\<fo-markdown-note\>* instance must have a unique *id* value
- *note*&nbsp;&nbsp;&nbsp;The initial contents of the note

Values for the following attributes are expressed using **CSS** syntax:

- *bgcolor*&nbsp;&nbsp;&nbsp;The markdown note's background color
- *color*&nbsp;&nbsp;&nbsp;The note's text color
- *fontFamily*&nbsp;&nbsp;&nbsp;The typeface to use
- *fontSize*&nbsp;&nbsp;&nbsp;How big you want the type to be

### Events

*on-change* is the only event fo-markdown-note explicitly raises.

### Example

```html
<fo-markdown-note 
    id="note1"                    
    note="Remember to do what I forgot to do."
    bgcolor="LemonChiffon"
    v-on:change="noteOnChange()">
</fo-markdown-note>
```

## Building fo-markdown-note

The source code for fo-markdown-note can be found in the **src** directory. The build process uses the file **fo-markdown-note.js** plus files from the **src/lib** directory and the **src/node_modules** directory.

When you clone or download the **git** repo, you don't get the **src/node_modules** directory. Since this directory can be easily re-generated using **npm**, there's no reason to include it in the git repo.  The **src/package.json** contains all of the information needed to re-generate the **src/node_modules** directory.  To do this, *cd* to the **src** directory and enter the command:

```bash
npm install
```

npm will fetch and install all of the node modules listed in **package.json**.

fo-markdown-note is built into a rollup.js bundle using the **build.sh** script found in the **src** directory.  At this writing, **build.sh** contains only the command *rollup -c*. We have the habit of creating a **build.sh** script no matter how simple its contents so that we never have to remember which command(s) to use for different kinds of projects.

To build the bundle, *cd* to the **src** directory and enter the command

```bash
./build.sh
```

After a successful build, you should see the following results:

```
fo-markdown-note.js → ../dist/fo-markdown-note-bundle.js...
created ../dist/fo-markdown-note-bundle.js in 1.8s
```

## Running the Test Application

The included test application can be run from the **test** directory.

As you did with the **src** directory, you must run *npm install* to re-generate the **node_modules** directory used by the test application.

The test application can be run using the *http-server* npm module.  To run it, *cd* to the **test** directory and enter the command

```bash
http-server
```

This will open a simple web server that serves its content on *http://localhost:8080*.

## Dependencies

fo-markdown-note's dependencies fall into two categories, those that are bundled into **fo-markdown-note-bundle-js** and those that are expected to be present in the project in which fo-markdown-note is used.

The latter category includes widely-used libraries such as JQuery, Lodash, and Vue.js.

Bundled into **fo-markdown-note-bundle-js** are libraries that are unique or specific to fo-markdown-note. Since the main purpose of fo-markdown-note is to wrap SimpleMDE into a Vue.js component, SimpleMDE and its CodeMirror dependency are bundled.

You can change which libraries you want to bundle or keep external by editing the **src/package.json** file and moving them between the *dependencies* and *devDependencies* sections, or through use of the *external* option in **src/rollup.config.js**.  You need to re-build the bundle after making any such changes.

## Acknowledgements

Like most open source projects, fo-markdown-note is based on the work of others. The small value fo-markdown-note adds is to wrap and bundle these components into a single-file Vue.js component.  The greater value is provided by these amazing projects:

- [Vue.js](https://vuejs.org/) by [Evan You](https://github.com/yyx990803) and a host of [other contributors](https://vuejs.org/v2/guide/team.html)
- [SimpleMDE](https://simplemde.com/) by [Sparksuite](https://www.sparksuite.com/)
- [CodeMirror](https://codemirror.net/), the text editor on which SimpleMDE is based, by [Marijn Haverbeke](https://github.com/marijnh) and many [other contributors](https://github.com/codemirror/CodeMirror/)
- [Detect Element Resize](https://github.com/sdecima/javascript-detect-element-resize) by Sebastián Décima
- [rollup.js](https://rollupjs.org) by [Rich Harris](https://github.com/Rich-Harris), [Lukas Taegert](https://github.com/lukastaegert), and a host of [other contributors](https://github.com/rollup/rollup/graphs/contributors)

We also gratefully acknowledge the [JQuery](https://jquery.com/) and [Lodash](https://lodash.com/) projects on which so much the web is built, and the [gridstack.js](http://gridstackjs.com/) component used in our test application.