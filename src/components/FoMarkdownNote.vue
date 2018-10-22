<template>
    <div :id='id' class='outer-div' ref='vueOuterDiv'
        v-on:mousedown='markdownNoteOnMouseDown'
        v-on:mouseup='markdownNoteOnMouseUp'
        v-on:keydown='markdownNoteOnKeyDown'
        style='visibility: hidden;'>
            <!-- <textarea :id='textareaId' ref='simpleMdeElement'>{{note}}</textarea> -->
            <textarea :id='textareaId' ref='simpleMdeElement' v-model='note'></textarea>
    </div>
</template>

<script>
import SimpleMDE from 'simplemde'

export default {
    name: 'FoMarkdownNote',
    props: {
        id: String,
        backgroundColor: {
            type: String,
            default: '#fff'
        },
        color: {
            type: String,
            default: '#000'
        },
        fontFamily: {
            // Corresponding attribute: font-family
            type: String,
            default: 'Arial, Helvetica, "DejaVu Sans", sans-serif'
        },
        fontSize: {
            // Corresponding attribute: font-size
            type: String,
            default: '16px'
        },
        lineHeight: {
            type: String,
            default: '1.2'
        },
        note: String,
        previewModeTrigger: {
            type: String,
            default: 'default'
        }
    },

    data() { return {
        blurHandlerEnabled:     true,
        cursorPosition:         null,
        editModeIsInitialized:  false,
        mode:                   null,
        simplemde:              null,
        textareaId:             this.id + '-textarea'
    }},

    mounted() {
        // console.info('fo-markdown-note.es6.js: mounted(): Fired!')

        // Initialize convenience references.

        // this.vueOuterDiv = document.getElementById(this.id)

        // Instantiate the SimpleMDE.

        // this.simpleMdeElement = document.getElementById(this.textareaId)

        this.simplemde = new SimpleMDE({
            element: this.$refs.simpleMdeElement,
            status: false,
            toolbar: false,
            autofocus: true
        })

        this.initializeVueOuterDivStyles()

        this.initializeCodeMirrorDivIfNecessary()

        // Must be done before $nextTick to make this.$refs.previewElement available downstream.
        this.enterPreviewMode('mounted')

        // this.$nextTick(function () {
        //     // console.info('index.es6.js: mounted(): $nextTick: Fired!')

        // })
        // console.info('fo-markdown-note.es6.js: mounted(): End')
    },

    watch: {
        backgroundColor: function(newValue, oldValue) {
            // console.info('fo-markdown-note.js: watch: backgroundColor: Fired! newValue = ' + newValue)
            let cmds = this.$refs.codeMirrorDiv.style
                cmds.backgroundColor = this.backgroundColor

            let pes = this.$refs.previewElement.style
                pes.backgroundColor = this.backgroundColor

        },
        color: function(newValue, oldValue) {
            // console.info('fo-markdown-note.js: watch: color: Fired! newValue = ' + newValue)
            let cmds = this.$refs.codeMirrorDiv.style
                cmds.color = this.color

            let pes = this.$refs.previewElement.style
                pes.color = this.color

            this.setCursorColor()
        },
        fontFamily: function(newValue, oldValue) {
            let cmds = this.$refs.codeMirrorDiv.style
                cmds.fontFamily = this.fontFamily
        },
        fontSize: function(newValue, oldValue) {
            let cmds = this.$refs.codeMirrorDiv.style
                cmds.fontSize = this.fontSize
            let ods = this.$refs.vueOuterDiv.style
                ods.fontSize = this.fontSize
        },
        lineHeight: function(newValue, oldValue) {
            let cmls = this.$refs.codeMirrorLines.style
                cmls.lineHeight = this.lineHeight
            let pes = this.$refs.previewElement.style
                pes.lineHeight = this.lineHeight
        },
        previewModeTrigger: function(newValue, oldValue) {
            this.enterPreviewMode('previewModeTrigger')
        }
    },

    methods: {
        changeHyperlinkTargets() {
            // Check to see if there are any hyperlinks on the preview div or its descendents.
            // If any are found, change their target to '_blank'.

            let hyperlinksToChange = this.$refs.previewElement.querySelectorAll('a')
            for (var eachHyperlink of hyperlinksToChange) {
                eachHyperlink.setAttribute('target', '_blank')
            }
        },

        enterEditMode(caller) {
            // console.info('fo-markdown-note: enterEditMode(): Start; caller = ' + caller + '; this.mode = ' + this.mode)
            if ((!this.mode) || (this.mode == 'preview')) {

                // console.info("fo-markdown-note: enterEditMode(): Currently in preview mode, switching to edit mode")

                this.simplemde.togglePreview()
                this.mode = 'edit'

                this.simplemde.codemirror.focus()
                this.simplemde.codemirror.execCommand('goDocEnd')

                // Set cursor color.

                this.setCursorColor()

                if (!this.editModeIsInitialized) {
                    // Hook the cursor activity event so the cursor color will stay set.

                    this.simplemde.codemirror.on('cursorActivity', (e) => {

                        // Remember the cursor position so we can re-position it whenever the markdown note is resized

                        // this.getCursorPosition()

                        // This requires a teeny tiny delay in order to work.
                        setTimeout(() => {
                            // console.info('FoMarkdownNote.vue: enterEditMode(): About to set cursor color')
                            this.setCursorColor()
                        }, 10)
                    })

                    this.simplemde.codemirror.on('change', (e) => {
                        // console.info('fo-markdown-note: on change: Fired!')
                        this.$emit('note-change', this.simplemde.value())
                    })

                    this.editModeIsInitialized = true
                }

                // console.trace()


                // this.getCursorPosition()

            } else {
                // console.info("fo-markdown-note: enterEditMode(): Not in preview mode, nothing to do")
            }
            // console.info("fo-markdown-note: enterEditMode(): End")
        },

        enterPreviewMode(caller) {
            // console.info('fo-markdown-note: enterPreviewMode(): Start; caller = ' + caller + '; this.mode = ' + this.mode)

            // Go into preview mode if not already in preview mode.

            if ((!this.mode) || (this.mode == 'edit')) {
                // console.info("fo-markdown-note: enterPreviewMode(): Currently in edit mode, switching to preview mode")
                this.simplemde.togglePreview()
                this.mode = 'preview'

                this.initializePreviewElementIfNecessary()

                this.changeHyperlinkTargets()

            } else {
                // console.info("fo-markdown-note: enterPreviewMode(): Currently in preview mode, nothing to do")
            }

            // console.info("fo-markdown-note: enterPreviewMode(): End")
        },

        initializeCodeMirrorDivIfNecessary() {
            if (!this.$refs.codeMirrorDiv) {
                this.$refs.codeMirrorDiv = this.$refs.vueOuterDiv.getElementsByClassName('CodeMirror')[0]
                this.$refs.codeMirrorLines = this.$refs.codeMirrorDiv.getElementsByClassName('CodeMirror-lines')[0]

                // After toggling into preview mode the first time, we have on hand all of the elements whose
                // styles and vertical scrollbars we want to control.

                this.initializeCodeMirrorStyles()

                this.simplemde.codemirror.on('blur', this.markdownNoteOnBlur)
            }
        },

        initializeCodeMirrorStyles() {
            let cmds = this.$refs.codeMirrorDiv.style
                cmds.backgroundColor = this.backgroundColor
                cmds.color = this.color
                cmds.border = 0
                cmds.paddingTop = 0
                cmds.paddingBottom = 0
                cmds.overflowy = 'hidden'
                cmds.fontFamily = this.fontFamily
                cmds.fontSize = this.fontSize
                cmds.borderRadius = '0'
                cmds.height = '100%'

            let cmls = this.$refs.codeMirrorLines.style
                cmls.paddingTop = '10px'
                cmls.paddingBottom = '10px'
                cmls.paddingLeft = '0'
                cmls.paddingRight = '0'
                cmls.lineHeight = this.lineHeight
            },

        initializePreviewElementIfNecessary() {
            if (!this.$refs.previewElement) {
                this.$refs.previewElement = this.$refs.codeMirrorDiv.getElementsByClassName('editor-preview')[0]
                let pes = this.$refs.previewElement.style
                    pes.cursor = 'default'
                    pes.backgroundColor = this.backgroundColor
                    pes.lineHeight = this.lineHeight
            }
        },

        initializeVueOuterDivStyles() {
            let ods = this.$refs.vueOuterDiv.style
                ods.fontSize = this.fontSize
                ods.height = '100%'

            // Wait a short time until the browser is able to remove the scrollbars.

            setTimeout(function() {
                ods.visibility = 'visible'

                // TODO: Raise a 'componentReady' event to signal to the parent that the markdown note is now visible.
            }, 500)

            // })
        },

        markdownNoteOnBlur(e) {
            if (this.blurHandlerEnabled) {
                // console.info('fo-markdown-note: markdownNoteOnBlur(): Start; e = ')
                // console.info(e)

                this.enterPreviewMode('markdownNoteOnBlur')
            } else {
                // console.info('fo-markdown-note: markdownNoteOnBlur(): Blur handler is not enabled; nothing to to')

                // Re-enable blur handling. If it needs to be disabled again, onMouseDown will take care of that.

                this.blurHandlerEnabled = true
            }
        },

        markdownNoteOnKeyDown(e) {
            // console.info('fo-markdown-note: markdownNoteOnKeyDown: e.keyCode =')
            // console.info(e.keyCode)
            if (e.keyCode === 27) {
                this.enterPreviewMode('markdownNoteOnKeyDown(Esc)')
            }
        },

        markdownNoteOnMouseDown(e) {
            // console.info('fo-markdown-note: markdownNoteOnMouseDown(): Fired!')
            this.blurHandlerEnabled = false
        },

        markdownNoteOnMouseUp(e) {
            // console.info('fo-markdown-note: markdownNoteOnMouseUp(): Fired!')
            this.markdownNoteOnClick(e)

            // Keep focus on the editor.

            var codeMirror = this.$refs.codeMirror

            // console.info('fo-markdown-note: markdownNoteOnMouseUp(): codeMirror = ')
            // console.info(codeMirror)

            // console.info('fo-markdown-note: markdownNoteOnMouseUp(): End')
        },

        markdownNoteOnClick(e) {
            // console.info('fo-markdown-note: markdownNoteOnClick(): Start; e =')
            // console.info(e)

            // console.info('fo-markdown-note: About to emit a click event')
            // this.$emit('click', this)
            // console.info('fo-markdown-note: Finished emitting a click event')


            if (this.mode == 'edit') {
                // console.info('fo-markdown-note: markdownNoteOnClick(): Currently in edit mode; nothing to do')
            } else {
                // If e.target is a hyperlink, do nothing. Allow the hyerlink navigation.

                // console.info('fo-markdown-note: markdownNoteOnClick(): Not currently in edit mode; toggle into edit mode')
                // console.info('fo-markdown-note: markdownNoteOnClick(): e.target.tagName = <' + e.target.tagName + '>')
                if (e.target.tagName.toUpperCase() == 'A') {
                    // console.info('fo-markdown-note: markdownNoteOnClick(): e.target is a hyperlink; nothing to do')
                    return
                } else {
                    // console.info('FoMarkdownNote.vue: Before calling this.enterEditMode, stack trace is:')
                    // console.trace()
                    this.enterEditMode('markdownNoteOnClick')
                }
            }

            this.blurHandlerEnabled = true

            // console.info("fo-markdown-note: markdownNoteOnClick(): End")
        },

        setCursorColor() {
            // console.info("fo-markdown-note: setCursorColor(): Start")

            // Set cursor color.

            let allCursors = this.$refs.codeMirrorDiv.getElementsByClassName('CodeMirror-cursor');
            for (var i = 0; i < allCursors.length; i++) {
                allCursors[i].style.borderLeftColor = this.color
            }
            // console.info("fo-markdown-note: setCursorColor(): End")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import './lib/simplemde-modified.css';

    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
