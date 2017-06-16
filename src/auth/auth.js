'use strict';

const debug = require('debug')('app:auth');
const jwt = require('jsonwebtoken');
// const rp = require('request-promise-native');

module.exports = Auth;

/**
 * Constrói o objeto de autenticação, com as opções passadas.
 */
function Auth(options) {
    this.options = options;
}

/**
 * Verifica se o JWT enviado pelo cliente é válido.
 */
Auth.prototype.validateToken = function (ctx) {
    try {
        const authorization = ctx.request.get('Authorization');
        const token = authorization.slice(7); // Removo o Bearer do início.
        return jwt.verify(token, this.options.jwtPublicKey, { ignoreNotBefore: true });
    } catch (err) {
        debug('validateToken Error: ' + err.message);
        ctx.throw(401, 'Token Inválido');
    }
};

/**
 * Verifica se o usuário possui os scores necessários para acessar a rota.
 */
Auth.prototype.checkUserScopes = function (decodedToken, allowedScopes) {
    if (!allowedScopes)
        return true;
    
    // Se os scopes da rota e do token não forem array,
    // transforma em array para facilitar a comparação.
    if (!Array.isArray(allowedScopes))
        allowedScopes = Array.of(allowedScopes);
    
    var tokenScopes = decodedToken.scope;
    if (!Array.isArray(tokenScopes))
        tokenScopes = Array.of(tokenScopes);

    // Verifica se o usuário tem pelo menos um dos scopes necessários
    // para acessar a rota.
    for (let userScope of tokenScopes) {
        for (let routeScope of allowedScopes) {
            if (userScope == routeScope) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Middleware para autorização de acesso do cliente.
 */
Auth.prototype.middleware = function (authParams) {
    var self = this; // Usando lambda não é necessário.
    return async (ctx, next) => {
        debug('Auth: ' + JSON.stringify(authParams));
        
        var decodedToken = self.validateToken(ctx);
        debug('Token: ' + JSON.stringify(decodedToken));

        // Verifica se o usuário tem o scope necessário para acessar a rota.
        if (!self.checkUserScopes(decodedToken, authParams.scope)) {
            throw ctx.throw(401, 'Acesso não permitido.');
        } else {
            // Guarda o token no contexto.
            ctx.token = decodedToken;
            await next();
        }
    };
};
