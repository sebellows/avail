import * as fs from 'fs';
import { AvailBuilder } from './avail';

function start() {
    const fit = new AvailBuilder();

    try {
        fs.writeFileSync('public/avail.css', fit.buildCSS());
    } catch (err) {
        console.error('Avail Error:', err);
    }
}

start();
