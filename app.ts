import express from 'express'
import swaggerDocs from './utils/swagger'
import './utils/db'

const port = Number(process.env.PORT || 3000)

const app = express()
app.use(express.json())

app.listen(port, async () => {
    console.log(`Server started on port ${port}`)

    swaggerDocs(app, port)
})
