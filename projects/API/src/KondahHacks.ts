import { ExpressHttpAdapter } from "@kondah/express-adapter"

/**
 * Kondah is a framework that im working on just for learning purposes,
 * but I'm also using it here which means I will have to hack my way through it
 * sometimes until I fix it in @kondah
 */

ExpressHttpAdapter.prototype.addErrorHandler = function () {
  // @ts-ignore this will be available soon in Kondah
  this._app.use((err, req, res, next) => {
    console.error(err)
    return res.status(400).json({ error: true, message: err.message })
  })
}
