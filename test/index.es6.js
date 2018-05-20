// console.info('index.es6.js: Start')

// Uses a symlink to the ../dist directory.
import FoMarkdownNote from './dist/fo-markdown-note-bundle.js'

var vueModel = new Vue({
    el: '#app',
    components: {
        FoMarkdownNote
    },
    data: {
        // TODO: Remove test data from index.html.
        // TODO: Generate test data randomly as I did in fo-sticky-note.
        // TODO: In index.html, bind fo-markdown-note to randomly-generated data using v-for.
    },
    mounted() {
        // this.$nextTick(function () {            
        // })
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