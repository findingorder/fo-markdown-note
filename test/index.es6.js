// console.info('index.es6.js: Start')

// Uses a symlink to the ../dist directory.
import FoMarkdownNote from './dist/fo-markdown-note-bundle.js'

var vueModel = new Vue({
    el: '#app',
    components: {
        FoMarkdownNote
    }
})

var gridstackOptions = {
    verticalMargin: 10
}

$('.grid-stack').gridstack(gridstackOptions)

// console.info('index.es6.js: End')