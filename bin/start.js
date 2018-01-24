require('babel-core/register')({
    ignore: [/(node_modules)/],
    presets: [
        'stage-2',
        'react',
        [
            "latest-node",
            { "target": "current" }
        ],
    ]
});

require('babel-polyfill');
require('../');
