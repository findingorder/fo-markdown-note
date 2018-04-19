// console.info('index.es6.js: Start')

// Uses a symlink to the ../dist directory.
import FoMarkdownNote from './dist/fo-markdown-note-bundle.js'

var vueModel = new Vue({
    el: '#app',
    components: {
        FoMarkdownNote
    },
    methods: {
        noteOnChange(newNote) {
            console.info('index.es6.js: noteOnChange(): Fired! newNote = ')
            console.info(newNote)
        },
        noteOnClick(eventTarget) {
            console.info('inbox.es6.js: noteOnClick(): Heard a click from eventTarget:')
            console.info(eventTarget)
        }
    }
})

var gridstackOptions = {
    verticalMargin: 10
}

$('.grid-stack').gridstack(gridstackOptions)

// console.info('index.es6.js: End')