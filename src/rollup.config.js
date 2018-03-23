// rollup.config.js
import resolve  from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss  from 'rollup-plugin-postcss'

export default {
    input: 'fo-markdown-note.js',
    output: {
        file: '../dist/fo-markdown-note-bundle.js',
        format: 'es'
    },
    plugins: [ 
        commonjs(),
        resolve({
            browser: true
        }),
        postcss({
            plugins: []
        })
    ]
}

