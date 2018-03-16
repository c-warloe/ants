//This file contains initial scripts to setup the ants environment

//IDE Setup
// if(document.cookie)
//     document.getElementById("ide").innerHTML = document.cookie.substring(5);
// else
document.getElementById("ide").innerHTML = placeHolderText;

var editor = ace.edit("ide");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/bug");
editor.getSession().setUseWrapMode(true);
editor.setShowPrintMargin(false);

var greenProgram = compile(placeHolderText);
var redProgram = compile(dumbAntProg);
var blueProgram = compile(dumbAntProg);
var yellowProgram = compile(dumbAntProg);

// Terminal Setup
document.getElementById("terminal").innerHTML = terminalInstructions;
var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/vibrant_ink");
terminal.setShowPrintMargin(false);
terminal.setOptions({readOnly: true, highlightActiveLine: false, highlightGutterLine: false});
//terminal.renderer.setShowGutter(false);
terminal.renderer.$cursorLayer.element.style.display = "none"
document.getElementById("terminal").removeAttribute("tabIndex");

// Simulation Setup
// graphics.js
var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width;
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;

var offset = canvas.width/64;

var sw = new StudentWorld();
var tickInterval;

// Create a capturer that exports a WebM video
var capturer = new CCapture( { format: 'webm' } );
var recordFlag = false;

//resize handler for canvas
function onResize( element, callback ){
  var elementHeight = element.clientHeight,
      elementWidth = element.clientWidth;
  setInterval(function(){
      if( element.clientHeight !== elementHeight || element.clientWidth !== elementWidth ){
        elementHeight = element.clientHeight;
        elementWidth = element.clientWidth;
        callback(elementHeight, elementWidth);
      }
  }, 50);
}

onResize( document.getElementById("sim"), function(h, w){ canvas.width = w; canvas.height = h; offset = canvas.width/64; sw.draw(); } );


//cookies for refresh

setInterval(function(){
    document.cookie = "code=" + editor.getValue();
}, 300);


//Fields setup
var fields = [];
var field_index = 0;
fields.push(
"****************************************************************" +
"**             *   f                        f   *             **" +
"*                                                              *" +
"*                            *    *                            *" +
"*    f *  f  *    **                        **    *  f  * f    *" +
"*    *                                                    *    *" +
"*                    f                    f                    *" +
"*                                                              *" +
"*  f                *    *            *    *                f  *" +
"*    *            f           *  *           f            *    *" +
"*    f             *           ff           *             f    *" +
"*      *                                                *      *" +
"*                         0          1                         *" +
"*                          *        *                          *" +
"**                                                            **" +
"*   *                                                      *   *" +
"*                    *   **          **   *                    *" +
"*             *                                  *             *" +
"*     f  f                                            f  f     *" +
"*f     *          *                          *          *     f*" +
"*   f  f                   *        *                   f  f   *" +
"*        *            *                  *            *        *" +
"* f                  *                    *                  f *" +
"* *         f                 *  *                 f         * *" +
"**                      f              f                      **" +
"*                 *         *      *         *                 *" +
"*             *   *                          *   *             *" +
"*              *        *              *        *              *" +
"*     *     *    ff      f            f      ff    *     *     *" +
"*    f                                                    f    *" +
"*    *              *   *              *   *              *    *" +
"*                                                              *" +
"*                                                              *" +
"*    *              *   *              *   *              *    *" +
"*    f                                                    f    *" +
"*     *     *    ff      f            f      ff    *     *     *" +
"*              *        *              *        *              *" +
"*             *   *                          *   *             *" +
"*                 *         *      *         *                 *" +
"**                      f              f                      **" +
"* *         f                 *  *                 f         * *" +
"* f                  *                    *                  f *" +
"*        *            *                  *            *        *" +
"*   f  f                   *        *                   f  f   *" +
"*f     *          *                          *          *     f*" +
"*     f  f                                            f  f     *" +
"*             *                                  *             *" +
"*                    *   **          **   *                    *" +
"*   *                                                      *   *" +
"**                                                            **" +
"*                          *        *                          *" +
"*                         3          2                         *" +
"*      *                                                *      *" +
"*    f             *           ff           *             f    *" +
"*    *            f           *  *           f            *    *" +
"*  f                *    *            *    *                f  *" +
"*                                                              *" +
"*                    f                    f                    *" +
"*    *                                                    *    *" +
"*    f *  f  *    **                        **    *  f  * f    *" +
"*                            *    *                            *" +
"*                                                              *" +
"*              *   f                        f   *              *" +
"****************************************************************" );
fields.push(
"****************************************************************" +
"* f      fff     f                            f     fff      f *" +
"*f f                   f   f        f   f                   f f*" +
"*                   f  f      f  f      f  f                   *" +
"*  f                   f                f                   f  *" +
"*                        f   f    f   f                        *" +
"*            f                                    f            *" +
"*f f             f                            f             f f*" +
"*     f  ff     f       f f    ff    f f       f     ff  f     *" +
"*  f              f    f                f    f              f  *" +
"*      f f                     ff                     f f      *" +
"*f          ff         f                f         ff          f*" +
"*    f   f         f                        f         f   f    *" +
"*        f   f   f       f            f       f   f   f        *" +
"*       f     f  ff       f          f       ff  f     f       *" +
"*        f  f                                      f  f        *" +
"*  f                ff                    ff                f  *" +
"*            f        f        ff        f        f            *" +
"*    f                        f  f                        f    *" +
"*        f       ff    f f            f f    ff       f        *" +
"*                    f   f ff      ff f   f                    *" +
"*             f         f              f         f             *" +
"*      fff  f   f      f                f      f   f  fff      *" +
"*        f             f                f             f        *" +
"*   f           ff fff f                f fff ff           f   *" +
"****************************************************************" +
"*f     f f  f        f   *f          f*   f        f  f f     f*" +
"*          f             * f        f *             f          *" +
"*        f         f f f *  0f    f2  * f f f         f        *" +
"* f     f               f*     ff     *f               f     f *" +
"*      f      f          *            *          f      f      *" +
"* ff              f      *   f    f   *      f              ff *" +
"* ff              f      *   f    f   *      f              ff *" +
"*      f      f          *            *          f      f      *" +
"* f     f               f*     ff     *f               f     f *" +
"*        f         f f f *  1f    f3  * f f f         f        *" +
"*          f             * f        f *             f          *" +
"*f     f f  f        f   *f          f*   f        f  f f     f*" +
"****************************************************************" +
"*   f           ff fff f                f fff ff           f   *" +
"*        f             f                f             f        *" +
"*      fff  f   f      f                f      f   f  fff      *" +
"*             f         f              f         f             *" +
"*                    f   f ff      ff f   f                    *" +
"*        f       ff    f f            f f    ff       f        *" +
"*    f                        f  f                        f    *" +
"*            f        f        ff        f        f            *" +
"*  f                ff                    ff                f  *" +
"*        f  f                                      f  f        *" +
"*       f     f  ff       f          f       ff  f     f       *" +
"*        f   f   f       f            f       f   f   f        *" +
"*    f   f         f                        f         f   f    *" +
"*f          ff         f                f         ff          f*" +
"*      f f                     ff                     f f      *" +
"*  f              f    f                f    f              f  *" +
"*     f  ff     f       f f    ff    f f       f     ff  f     *" +
"*f f             f                            f             f f*" +
"*            f                                    f            *" +
"*                        f   f    f   f                        *" +
"*  f                   f                f                   f  *" +
"*                   f  f      f  f      f  f                   *" +
"*f f                   f   f        f   f                   f f*" +
"* f      fff     f                            f     fff      f *" +
"****************************************************************" );
fields.push(
"****************************************************************" +
"*0                                                            1*" +
"*                                                              *" +
"*                                                              *" +
"*   fff                                                 fff    *" +
"*   fff                                                 fff    *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                             fffff                            *" +
"*                            fffffff                           *" +
"*                           fffffffff                          *" +
"*                            fffffff                           *" +
"*                             fffff                            *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*                                                              *" +
"*    fff                                                fff    *" +
"*    fff                                                fff    *" +
"*                                                              *" +
"*                                                              *" +
"*2                                                            3*" +
"****************************************************************" );
fields.push(
"****************************************************************" +
"*         f*     f       * *        * *       f     *f         *" +
"*       f  *       f  f  **  f    f  **  f  f       *  f       *" +
"*                *       *    f  f    *       *                *" +
"*              *    f  f                f  f    *              *" +
"*         *        * * f                f * *        *         *" +
"*   f     f         *                      *         f     f   *" +
"* f        *                                        *        f *" +
"**f      f     *        *  *        *  *        *     f      f**" +
"*   fff  f             f *     **     * f             f  fff   *" +
"*      *     *       f                    f       *     *      *" +
"* *            f      f        ff        f      f            * *" +
"*    ff   *   *  *                            *  *   *   ff    *" +
"*  * f           f        f          f        f           f *  *" +
"*       *   f             *          *             f   *       *" +
"**      f  f      *     * *          * *     *      f  f      **" +
"*    *          0                              2          *    *" +
"*    *  f *   f     f       *      *       f     f   * f  *    *" +
"*   *       f    *   *                    *   *    f       *   *" +
"**                 *                        *                 **" +
"*f        f*               *f      f*               *f        f*" +
"*    f f      f           f          f           f      f f    *" +
"*   *            *     f     *    *     f     *            *   *" +
"* *   *    *   *       *                *       *   *    *   * *" +
"*   f        f   *  * f                  f *  *   f        f   *" +
"*        f  f   *         **        **         *   f  f        *" +
"*ff           *     * *                  * *     *           ff*" +
"*   f            f             ff             f            f   *" +
"*    f  *          **f f   f *    * f   f f**          *  f    *" +
"* f*  *                     *      *                     *  *f *" +
"*   *          f*         f f      f f         *f          *   *" +
"*   f        **      f                    f      **        f   *" +
"*   f        **      f                    f      **        f   *" +
"*   *          f*         f f      f f         *f          *   *" +
"* f*  *                     *      *                     *  *f *" +
"*    f  *          **f f   f *    * f   f f**          *  f    *" +
"*   f            f             ff             f            f   *" +
"*ff           *     * *                  * *     *           ff*" +
"*        f  f   *         **        **         *   f  f        *" +
"*   f        f   *  * f                  f *  *   f        f   *" +
"* *   *    *   *       *                *       *   *    *   * *" +
"*   *            *     f     *    *     f     *            *   *" +
"*    f f      f           f          f           f      f f    *" +
"*f        f*               *f      f*               *f        f*" +
"**                 *                        *                 **" +
"*   *       f    *   *                    *   *    f       *   *" +
"*    *  f *   f     f       *      *       f     f   * f  *    *" +
"*    *          1                              3          *    *" +
"**      f  f      *     * *          * *     *      f  f      **" +
"*       *   f             *          *             f   *       *" +
"*  * f           f        f          f        f           f *  *" +
"*    ff   *   *  *                            *  *   *   ff    *" +
"* *            f      f        ff        f      f            * *" +
"*      *     *       f                    f       *     *      *" +
"*   fff  f             f *     **     * f             f  fff   *" +
"**f      f     *        *  *        *  *        *     f      f**" +
"* f        *                                        *        f *" +
"*   f     f         *                      *         f     f   *" +
"*         *        * * f                f * *        *         *" +
"*              *    f  f                f  f    *              *" +
"*                *       *    f  f    *       *                *" +
"*       f  *       f  f  **  f    f  **  f  f       *  f       *" +
"*         f*     f       * *        * *       f     *f         *" +
"****************************************************************" );
fields.push(
"****************************************************************" +
"*    fff       f    f    f  f      f  f    f    f       fff    *" +
"* f f    f     f    f f     f      f     f f    f     f    f f *" +
"*f f   f   f f                 ff                 f f   f   f f*" +
"*         fff     f            ff            f     fff         *" +
"*     f               f    f        f    f               f     *" +
"*f      f                    f ff f                    f      f*" +
"* f                 ff                    ff                 f *" +
"*  ff  ff        fff ff   f f f  f f f   ff fff        ff  ff  *" +
"*                           f      f                           *" +
"*  f   f       f   f      f          f      f   f       f   f  *" +
"* f   f     f  f  f   f                  f   f  f  f     f   f *" +
"*f f  f        fff           f    f           fff        f  f f*" +
"*       f  f   f     f      f      f      f     f   f  f       *" +
"*        ff f       f f f   ff    ff   f f f       f ff        *" +
"*    f              f        ffffff        f              f    *" +
"*  f                        f      f                        f  *" +
"*  f     f                    f  f                    f     f  *" +
"*  ff    f f                                        f f    ff  *" +
"* f     f  f      f    f f     ff     f f    f      f  f     f *" +
"*    f     f     f f0 f       f  f       f 2f f     f     f    *" +
"*    ff    f           f                f           f    ff    *" +
"*     f  fff   f  f      f    ffff    f      f  f   fff  f     *" +
"*    f         f     f   f    f  f    f   f     f         f    *" +
"*f                    f  ff  ff  ff  ff  f                    f*" +
"*f                ff  ff      f  f      ff  ff                f*" +
"*        f        f    f  f          f  f    f        f        *" +
"* f   ff       f              ffff              f       ff   f *" +
"*ff     f f        f                        f        f f     ff*" +
"*     f     f       ff  f              f  ff       f     f     *" +
"*      f f    f f                              f f    f f      *" +
"*ff      f     f f      f f  ff  ff  f f      f f     f      ff*" +
"*ff      f     f f      f f  ff  ff  f f      f f     f      ff*" +
"*      f f    f f                              f f    f f      *" +
"*     f     f       ff  f              f  ff       f     f     *" +
"*ff     f f        f                        f        f f     ff*" +
"* f   ff       f              ffff              f       ff   f *" +
"*        f        f    f  f          f  f    f        f        *" +
"*f                ff  ff      f  f      ff  ff                f*" +
"*f                    f  ff  ff  ff  ff  f                    f*" +
"*    f         f     f   f    f  f    f   f     f         f    *" +
"*     f  fff   f  f      f    ffff    f      f  f   fff  f     *" +
"*    ff    f           f                f           f    ff    *" +
"*    f     f     f f1 f       f  f       f 3f f     f     f    *" +
"* f     f  f      f    f f     ff     f f    f      f  f     f *" +
"*  ff    f f                                        f f    ff  *" +
"*  f     f                    f  f                    f     f  *" +
"*  f                        f      f                        f  *" +
"*    f              f        ffffff        f              f    *" +
"*        ff f       f f f   ff    ff   f f f       f ff        *" +
"*       f  f   f     f      f      f      f     f   f  f       *" +
"*f f  f        fff           f    f           fff        f  f f*" +
"* f   f     f  f  f   f                  f   f  f  f     f   f *" +
"*  f   f       f   f      f          f      f   f       f   f  *" +
"*                           f      f                           *" +
"*  ff  ff        fff ff   f f f  f f f   ff fff        ff  ff  *" +
"* f                 ff                    ff                 f *" +
"*f      f                    f ff f                    f      f*" +
"*     f               f    f        f    f               f     *" +
"*         fff     f            ff            f     fff         *" +
"*f f   f   f f                 ff                 f f   f   f f*" +
"* f f    f     f    f f     f      f     f f    f     f    f f *" +
"*    fff       f    f    f  f      f  f    f    f       fff    *" +
"****************************************************************" );
/*
fields.push(
"****************************************************************" +
"**        g  w *  pf w                    w fp  * w  g        **" +
"*                      w                w                      *" +
"*              p         w   *    *   w         p              *" +
"*    f *  f w*    **                        **    *w f  * f    *" +
"*    *                         ww                         *    *" +
"*                 w  f       p    p       f  w                 *" +
"*                                                              *" +
"*  f                *    *  p      p  *    *                f  *" +
"*    *            f w         *  *         w f            *    *" +
"*    f             *           ff           *             f    *" +
"*      *                                                *      *" +
"*                         0          1                         *" +
"*                          * w ww w *                          *" +
"**            p                                  p            **" +
"*   *                                                      *   *" +
"*                    *   **          **   *                    *" +
"*             *                                  *             *" +
"*     f  f   w                                    w   f  f     *" +
"*f     *          *       w          w       *          *     f*" +
"*   fw f                   *        *                   f wf   *" +
"*        *   w        *                  *        w   *        *" +
"*gf               w  *                    *  w               fg*" +
"* *         f  w          g   *  *   g          w  f         * *" +
"**                      f              f                      **" +
"*                 * w  g    *      *    g  w *                 *" +
"*             *   *                          *   *             *" +
"*              *        *              *        *              *" +
"*     *     *    ff      f     ww     f      ff    *     *     *" +
"*    f                     w        w                     f    *" +
"*    *            g *   *              *   * g            *    *" +
"*                     w                  w                     *" +
"*                     w                  w                     *" +
"*    *            g *   *              *   * g            *    *" +
"*    f                     w        w                     f    *" +
"*     *     *    ff      f     ww     f      ff    *     *     *" +
"*              *        *              *        *              *" +
"*             *   *                          *   *             *" +
"*                 * w  g    *      *    g  w *                 *" +
"**                      f              f                      **" +
"* *         f  w          g   *  *   g          w  f         * *" +
"*gf               w  *                    *  w               fg*" +
"*        *   w        *                  *        w   *        *" +
"*   fw f                   *        *                   f wf   *" +
"*f     *          *       w          w       *          *     f*" +
"*     f  f   w                                    w   f  f     *" +
"*             *                                  *             *" +
"*                    *   **          **   *                    *" +
"*   *                                                      *   *" +
"**            p                                  p            **" +
"*                          * w ww w *                          *" +
"*                         3          2                         *" +
"*      *                                                *      *" +
"*    f             *           ff           *             f    *" +
"*    *            f w         *  *         w f            *    *" +
"*  f                *    *  p      p  *    *                f  *" +
"*                                                              *" +
"*                 w  f       p    p       f  w                 *" +
"*    *                         ww                         *    *" +
"*    f *  f w*    **                        **    *w f  * f    *" +
"*              p         w   *    *   w         p              *" +
"*                      w                w                      *" +
"*         g  w *  pf w                    w fp  * w  g         *" +
"****************************************************************");*/
