require('babel-core/register')({
    ignore: [/(node_modules)/],
    presets: [
        'stage-1',
        'react',
        [
            "latest-node",
            { "target": "current" }
        ],
    ]
});

require('babel-polyfill');
require('colors');
require('../');
