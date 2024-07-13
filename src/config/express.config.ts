import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
const router = express.Router();

export default express;
export { app, router, Express, Request, Response, NextFunction };
