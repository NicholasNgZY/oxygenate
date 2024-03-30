import expressJwt from 'express-jwt';

const authJwt = () => {
    const api = process.env.API_URL;
    return expressJwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'PUT', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/posts(.*)/ },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'POST', 'OPTIONS'] },
            `${api}/login`,
            `${api}/register`,
            `${api}/cart`,
        ],
    });
};

const isRevoked = async (req, payload, done) => {
    if (!payload.isAdmin) {
        done(null, true);
    }
    done();
};

export default authJwt;
