import { Router } from "express";

interface IController {
  readonly path: String
  router: Router
}

export default IController
