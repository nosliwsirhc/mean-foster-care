import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import passport from 'passport'
import path from 'path'
import fs from 'fs'

const PUB_ACCESS_KEY = fs.readFileSync(path.join(__dirname, '..', '..', '/ec_access_public.pem'), 'utf-8')

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_ACCESS_KEY,
    issuer: 'http://localhost:3000/',
    audience: 'http://localhost:4200/'
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    if(jwt_payload.sub) {
        done(null, jwt_payload.sub)
    } else {
        done(null, false)
    }
}))

export default passport