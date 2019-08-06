const $ = require('jquery');
const ClipboardJS = require('clipboard');
const gsap = require('gsap');

new ClipboardJS('.copy');


var shell = require('electron').shell;
//open links externally by default
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});
