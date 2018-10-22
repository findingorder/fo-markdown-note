# fo-markdown-note Component for Vue.js

**fo-markdown-note** is a **Vue.js** component that provides a simple Markdown editor that can be included in your Vue.js project.

fo-markdown-note is a thin Vue.js wrapper around the **SimpleMDE** Markdown editor JavaScript control.  SimpleMDE can be found at:
- https://simplemde.com/
- https://github.com/sparksuite/simplemde-markdown-editor

## What's New in Version 1.1

fo-markdown-note is now entirely built with [**Vue CLI3**](https://cli.vuejs.org/) and its [GUI project manager](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui). This greatly simplifies the build process and yields a distributable that is backwards-compatible with older ECMAScript versions through the CLI's use of [**Babel**](https://babeljs.io/).

The previous version 1.0 of fo-markown-note was laboriously hand-rolled using [**rollup.js**](https://rollupjs.org/guide/en). Vue CLI3 fully automates the build process and uses [**webpack**](https://webpack.js.org/) to bundle the distributable. This bundling comes for free: we needn't have any knowledge of webpack and don't have to work with it directly. This saves us a *tremendous amount of work*.

## Getting fo-markdown-note

fo-markdown-note is distributed using [Node Package Manager (NPM)](https://www.npmjs.com/package/fo-markdown-note). If you are using NPM directly (i.e. without Vue CLI3), you can install it into your project using the following command:

```bash
npm install fo-markdown-note
```

The preferred way to include fo-markdown-note (or any NPM package) in your Vue project is to use the [Vue CLI3 GUI project manager](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui), which you can access using the command

```bash
vue ui
```

After creating your project in the GUI project manager, open it in the GUI and click the *Dependencies* tab at the left side of the project page. Then click the *Install dependency* button in the upper-right corner of the page. In the *Install new dependency* dialog box that appears, select either *Main dependency* or *Development dependency*, then search for "fo-markdown-note" and install it.

## Using fo-markdown-note

To include fo-markdown-note in your project, include the following *import* statement at the top of your JavaScript:

```JavaScript
import FoMarkdownNote from 'fo-markdown-note'
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

If you are creating a single-file Vue component using a *.vue* file, your JavaScript will look like this:

```JavaScript
<script>
    import FoMarkdownNote from './components/FoMarkdownNote.vue'

    export default {
        name: 'app',
        components: {
            FoMarkdownNote
        },
    ...
```

When fo-markdown-note first appears in your application's UI, it is in Preview Mode.  This shows the formatted output rendered from the Markdown source.  When a user clicks in the body of the note, fo-markdown-note switches into Edit Mode, showing the editable Markdown source. To return to Preview Mode, the user can either press the Escape key or click anywhere outside the note.

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

## Building fo-markdown-note and running the test application

If you want to build fo-markdown-note yourself and run its test application, clone this repository and then open its direcory in the Vue CLI3 GUI project manager.  With the project open in the GUI, click the *Tasks* tab at the left side of the page and then click *Serve* on the sub-menu that appears.

## Dependencies

To see fo-markdown-note's dependencies, open the project in the Vue CLI3 project manager and click the *Dependencies* tab at the left side of the page.

The distributable bundle contains two dependencies, **simplemde** and **vue** itself.

The test application uses **interactjs** for resizing, but this dependency is not required by fo-markdown-note and isn't bundled in the distributable.

## Acknowledgements

Like most open source projects, fo-markdown-note is based on the work of others. The small value fo-markdown-note adds is to wrap and bundle these components into a single-file Vue.js component.  The greater value is provided by these amazing projects:

- [Vue.js](https://vuejs.org/) by [Evan You](https://github.com/yyx990803) and a host of [other contributors](https://vuejs.org/v2/guide/team.html)
- [SimpleMDE](https://simplemde.com/) by [Sparksuite](https://www.sparksuite.com/)
- [CodeMirror](https://codemirror.net/), the text editor on which SimpleMDE is based, by [Marijn Haverbeke](https://github.com/marijnh) and many [other contributors](https://github.com/codemirror/CodeMirror/)
- [webpack](https://webpack.js.org/), the module bundler that Vue CLI3 uses to package its distributables, by [Tobias Koppers](https://github.com/sokra) and over four hundred [other contributors](https://github.com/webpack/webpack/graphs/contributors)
- [interact.js](http://interactjs.io/), the resizing library used in our test application, authored by  [Taye Adeyemi](http://taye.me/blog/)