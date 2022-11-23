import { Express } from "express";

export interface IRoute {
    setup: (app: Express) => void
}

export class Router {
    constructor(private app: Express, private routes: IRoute[]) {}

    public setup() {
        this.routes.forEach((route) => route.setup(this.app));
    }
}
