<template>
    <div id="app">
        <section class="title-block">
            <h2 id="page-title">fo-markdown-note Vue.js Component Test Page</h2>
        </section>

        <section class="fo-markdown-note-demo"><div class="flex">

            <div><div id="note-1-container" class="outer-container" style="width: 300px;">
                <div class="inner-container" style="background-color:LemonChiffon;">
                    <fo-markdown-note
                        id="note1"
                        note="### Typewriter drill

*Now is the time for all good men to come to the aid of their country.*

It exactly fills out a 70-space line if you put a period at the end."

                        background-color="LemonChiffon"
                        v-on:click="noteOnClick($event)"
                        v-on:note-change="noteOnChange($event)">
                    </fo-markdown-note>
                </div>
            </div></div>

            <div><div id="note-2-container" class="outer-container" style="width: 400px;">
                <div class="inner-container" style="background-color:#fea3aa;">
                    <fo-markdown-note
                        id="note2"
                        background-color="#fea3aa"
                        note="**Juliet**

O Romeo, Romeo, wherefore art thou Romeo?
Deny thy father and refuse thy name.
Or if thou wilt not, be but sworn my love
And I’ll no longer be a Capulet.
‘Tis but thy name that is my enemy:
Thou art thyself, though not a Montague.
What’s Montague? It is nor hand nor foot
Nor arm nor face nor any other part
Belonging to a man. O be some other name.
What’s in a name? That which we call a rose
By any other name would smell as sweet;
So Romeo would, were he not Romeo call’d,
Retain that dear perfection which he owes
Without that title. Romeo, doff thy name,
And for that name, which is no part of thee,
Take all myself."
                        v-on:note-change="noteOnChange($event)">
                    </fo-markdown-note>
                </div>
            </div></div>

            </div>
            <div class="flex">

            <div><div id="note-3-container" class="outer-container">
                <div class="inner-container" style="background-color:PaleGreen;">
                    <fo-markdown-note
                        id="note3"
                        note="Now in these dread latter days of the old violent beloved U.S.A. and of the Christ-forgetting Christ-haunted death-dealing Western world I came to myself in a grove of young pines and the question came to me: has it happened at last?

Walker Percy
*Love in the Ruins*"
                        background-color="PaleGreen"
                        font-family="'Palatino Linotype', 'Liberation Serif'"
                        font-size="16px"
                        v-on:click="noteOnClick($event)"
                        v-on:note-change="noteOnChange($event)">
                    </fo-markdown-note>
                </div>
            </div></div>

            <div><div id="note-4-container" class="outer-container">
                <div class="inner-container" style="background-color:RebeccaPurple;">
                    <fo-markdown-note
                        id="note4"
                        note="There was a wisteria vine blooming for the second time that summer on a wooden trellis before one window, into which sparrows came now and then in random gusts, making a dry vivid dusty sound before going away: and opposite Quentin, Miss Coldfield in the eternal black which she had worn for forty-three years now, whether for sister, father, or nothusband none knew, sitting so bolt upright in the straight hard chair that was so tall for her that her legs hung straight and rigid as if she had iron shinbones and ankles, clear of the floor with that air of impotent and static rage like children’s feet, and talking in that grim haggard amazed voice until at last listening would renege and hearing-sense self-confound and the long-dead object of her impotent yet indomitable frustration would appear, as though by outraged recapitulation evoked, quiet inattentive and harmless, out of the biding and dreamy and victorious dust.

William Faulkner
*Absalom, Absalom\!*"
                        background-color="RebeccaPurple"
                        line-height="1.9"
                        color="#fff"
                        v-on:click="noteOnClick($event)"
                        v-on:note-change="noteOnChange($event)">
                    </fo-markdown-note>
                </div>
            </div></div>

        </div></section>

    </div>

</template>

<script>
    'use strict'
    import interact from 'interactjs'  // http://interactjs.io/
    import FoMarkdownNote from './components/FoMarkdownNote.vue'

    export default {
        name: 'app',
        components: {
            FoMarkdownNote
        },
        mounted() {
            // console.info('App.vue: mounted(): Start')

            var element1 = document.getElementById('note-1-container')
            var element2 = document.getElementById('note-2-container')
            var element3 = document.getElementById('note-3-container')
            var element4 = document.getElementById('note-4-container')

            this.initializeInteract(element1)
            this.initializeInteract(element2)
            this.initializeInteract(element3)
            this.initializeInteract(element4)

            // console.info('App.vue: mounted(): End')

        },
        methods: {
            initializeInteract(element) {
                // When initializing, make the note-n-container element slightly taller to avoid any unwanted initial vertical scrollbar.

                var currentHeight = element.offsetHeight;
                // console.info('App.vue: initializeInteract(): currentHeight = ' + currentHeight)
                element.style.height = (currentHeight + 5).toString() + 'px'

                interact(element)
                .resizable({
                    // Copied from Snapping
                    snap: {
                        targets: [
                            interact.createSnapGrid({ x: 10, y: 10 })
                        ],
                        range: Infinity,
                        relativePoints: [ { x: 0, y: 0 } ]
                    },
                    // End copied from Snapping

                    // resize from all edges and corners
                    edges: { left: false, right: true, bottom: true, top: false },

                })
                .on('resizemove', function (event) {
                    // console.info('App.vue: on(resizemove): Fired @ ' + Date.now())
                    var target = event.target

                    // update the element's style
                    target.style.width  = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                });
                // End From Resizings
            },
            noteOnChange(newNote) {
                // console.info('App.vue: noteOnChange(): Fired! newNote = ')
                // console.info(newNote)
            },
            noteOnClick(eventTarget) {
                // console.info('App.vue: noteOnClick(): Heard a click from eventTarget:')
                // console.info(eventTarget)
            }
        }
    }

    // console.info('App.vue: End')

</script>

<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-top: 30px;
        margin-left: 30px;
    }

    body {
        background-color: gray;
    }

    .flex {
        display: flex;
    }

    fo-markdown-note {
        width: 100%;
    }

    .editor-preview {
        overflow-y: auto;
    }

    h1, h2, h3, h4, h5 {
        margin-top: 0;
    }

    /* interact.js styles */

    .outer-container {
        display: grid;

        background-color: #29e;
        color: #fff;
        border-radius: 8px;
        padding: 0;
        margin: 10px;

        overflow-y: hidden;
        min-height: 100px;
        min-width: 100px;
    }

    .inner-container {
        color: white;
        background-color: slateblue;
        /* font-size: 20px; */
        /* font-family: sans-serif; */
        /* border-radius: 8px; */
        padding: 5px;
        margin: 0;
        touch-action: none;
        width: 100%;

        overflow-y: hidden;

        /* This makes things *much* easier */
        box-sizing: border-box;
    }

    #page-title {
        padding-left: 10px;
    }

    #title-block {
        padding: 0;
        margin: 0;
    }

</style>
