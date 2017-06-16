const app = require('./app');
const cfg = require('./config');

// Cria o serviço.
app.listen(cfg.PORT, () => {
    console.log('Listening on port %s. ENV: %s', cfg.PORT, cfg.NODE_ENV);
});
