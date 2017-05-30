
// TODO: Kickoff the app here...

import { Thing } from './common';

console.log(`This is a test!`);

const t = new Thing({ name: 'Jim' });

$('body').prepend('<span class="glyphicon glyphicon-search" aria-hidden="true"></span>');

$('<p />').appendTo('#content').text(t.act());