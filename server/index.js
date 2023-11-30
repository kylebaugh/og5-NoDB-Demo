// Import all packages
import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'

// Setup Express instance
const app = express()

// Setup Middleware
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))


// ROUTES GO HERE

import handlerFunctions from './controller.js'
const {getInvoices, addInvoice, deleteInvoice} = handlerFunctions

app.get('/invoices', getInvoices)
app.post('/invoice', addInvoice)
app.delete('/invoice/:id', deleteInvoice)

// Open door to server
ViteExpress.listen(app, 2319, () => console.log(`We've got a 2319! Report to http://localhost:2319`))
