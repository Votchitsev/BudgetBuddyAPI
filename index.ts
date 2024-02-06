import express from 'express'
import swaggerDocs from './utils/swagger'

const port = Number(process.env.PORT || 3000)

const app = express()
app.use(express.json())

app.listen(port, () => {
    console.log(`Server started on port ${port}`)

    swaggerDocs(app, port)
})
