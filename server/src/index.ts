import express from 'express'
import helmet from 'helmet'
import routes from './routes'
import cors from 'cors'
import passport from './_middleware/passport'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3000

require('./config/db')

app.use(helmet())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(routes)

app.listen(PORT, () => console.info(`Server started on PORT ${PORT}`))
