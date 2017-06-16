// APP
exports.NODE_ENV     = process.env.NODE_ENV || 'development';
exports.PORT         = process.env.PORT || 3000;
exports.REQUEST_PATH = process.env.REQUEST_PATH; // Deixado em branco para não precisar alterar os testes agora.

// DB
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.DB_URL  = process.env.DB_URL;

// Pools de Conexão
exports.DB_POOL_V1 = 'v1';
exports.DB_POOL_AC = 'ac';

// AUTH
exports.AUTH_ENDPOINT   = process.env.API_AUTH_ENDPOINT;
if (exports.NODE_ENV === 'development') {
    exports.AUTH_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4SWqHFN+0dYSy0h+WbjS
5PQ1XpijJe6RpK1C55knFYtoTE86UeTOpqpy1Oy3ZXPWJHstgbBIn3HZ4AJiPE5E
Sb+umDgyDD1NU5EL5UjEnhkYQ/951DUWlU7uTrlDrTtLU+SIHS0edYP3DHgXY5g3
zKXldYWkeaNkDzTO1Og78vdQIogqVHbLhK5veIA7B+1sTelCYy8dIcsI7mreF8/s
9MmEzUUQHelmC4u3o/e8WEDg3a0EgQn2xzm1wavSDC94GKogYUZBOWkRYRZfCnqd
ozj0u8Uy2ouUeEjW44bvvgeA9/r1vKeiismzYGP80l35VaatdZxn0zWvfCsn40Ng
RwIDAQAB
-----END PUBLIC KEY-----`;
} else {
    exports.AUTH_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArYaYlPnnrxBVwC4o0ykG
Vg8gjH/TerrrXS3GmsZeON6SCNuOBzUj+7RiEF64lE//gLY01nTJZtnUIPvmKJW/
1+eWxGNW1Mh1JpT/f3A6Q5rp2WNKSBwvEFPE58lkD63Tewsn3+0dw+aFKaSW+l3A
Z7WS4AxXxBLIRr2zpTL3DOCbeT/m2yEQ8Do662/d+ty7F08FJVaaz2PxmnLEeSQX
6RTRPeFRPlGVj91H4h85Ln+0Oc0U/oiqa+AKwobWXLOqDKhn8HYZuoya368TqZ9X
26QEp1g7psaT8kiNRFAt0Yb4WbgFSWf2r92HDS8dj25TNTeeLkvZ48KylTKU23DT
qQIDAQAB\n-----END PUBLIC KEY-----`;
}

// NewRelic
exports.NEWRELIC_APP_NAME = process.env.NEWRELIC_APPNAME || 'API SIARHES';
exports.NEWRELIC_NEWRELIC_KEY = process.env.NEWRELIC_KEY;
exports.NEWRELIC_LEVEL = process.env.NEWRELIC_LEVEL || 'info';
