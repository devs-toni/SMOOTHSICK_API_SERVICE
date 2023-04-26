import { Request, Response, NextFunction } from "express"


export const headers_middleware = {
    config_headers(req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
        );
        next()
    }
}


