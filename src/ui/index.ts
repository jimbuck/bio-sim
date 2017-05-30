
import * as $ from 'jquery';

import { Thing } from '../lib/index';

console.log(`This is a test!`);

const t = new Thing({ name: 'Jim' });

t.act();

$('<p />').appendTo('body').text('JQUERY IS LOADED!');
