
import * as $ from 'jquery';

import { Thing } from './lib/index';

console.log(`This is a test!`);

const t = new Thing({ name: 'Jim' });

$('body').append('<span class="glyphicon glyphicon-search" aria-hidden="true"></span>');

$('<p />').appendTo('#content').text(t.act());
