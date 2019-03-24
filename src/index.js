
let app = require('./server').default;

if (module.hot) {
    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');
        try {
            app = require('./server').default;
        }
        catch (err) {
            console.error(err);
        }
    });
    console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`> Started on port ${port}`);
});
