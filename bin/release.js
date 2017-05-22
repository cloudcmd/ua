#!/usr/bin/env node

'use strict';

const docs = require('../release/docs');

docs((e, msg) => {
    error(e) || console.log(msg);
});

function error(e) {
    e && console.error(e.message);
    return e;
}

