import * as functions from "firebase-functions"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors({ origin: true }))

app.get("/route1", (request, response) => {
  const resp = {message: "Teste get:"+request.url}
  response.send(resp)
})

app.post("/postRoute", (request, response) => {
  response.send(request.body)
})

app.listen({port:3000})

export let api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' no final da url para manter os query params
  }
  return app(request, response)
})