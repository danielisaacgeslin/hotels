/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './../src/ioc';
import { CurrencyController } from './../src/controllers/HotelController';
import { PingController } from './../src/controllers/PingController';
import { expressAuthentication } from './../src/auth';

const models: TsoaRoute.Models = {
    "HotelModel": {
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string" },
            "stars": { "dataType": "double" },
            "price": { "dataType": "double" },
            "image": { "dataType": "string" },
            "amenities": { "dataType": "array", "array": { "dataType": "string" } },
            "args": { "dataType": "object", "required": true },
        },
    },
    "PaginationModel": {
        "properties": {
            "count": { "dataType": "double", "required": true },
            "pageNumber": { "dataType": "double", "required": true },
            "perPage": { "dataType": "double", "required": true },
            "list": { "dataType": "array", "array": { "dataType": "any" }, "required": true },
            "args": { "ref": "PaginationModel", "required": true },
        },
    },
    "IHotelModel": {
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string", "required": true },
            "stars": { "dataType": "double", "required": true },
            "price": { "dataType": "double", "required": true },
            "image": { "dataType": "string", "required": true },
            "amenities": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/hotel/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CurrencyController>(CurrencyController);


            const promise = controller.getById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/hotel',
        function(request: any, response: any, next: any) {
            const args = {
                hotelStringified: { "in": "query", "name": "hotel", "required": true, "dataType": "string" },
                pageNumber: { "in": "query", "name": "pageNumber", "required": true, "dataType": "double" },
                perPage: { "in": "query", "name": "perPage", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CurrencyController>(CurrencyController);


            const promise = controller.getPaginated.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/hotel',
        authenticateMiddleware([{ "name": "adminUser" }]),
        function(request: any, response: any, next: any) {
            const args = {
                hotelParams: { "in": "body", "name": "hotelParams", "required": true, "ref": "IHotelModel" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CurrencyController>(CurrencyController);


            const promise = controller.create.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/hotel/batch',
        authenticateMiddleware([{ "name": "adminUser" }]),
        function(request: any, response: any, next: any) {
            const args = {
                hotelParams: { "in": "body", "name": "hotelParams", "required": true, "dataType": "array", "array": { "ref": "IHotelModel" } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CurrencyController>(CurrencyController);


            const promise = controller.createBatch.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.put('/hotel',
        authenticateMiddleware([{ "name": "adminUser" }]),
        function(request: any, response: any, next: any) {
            const args = {
                hotelParams: { "in": "body", "name": "hotelParams", "required": true, "ref": "IHotelModel" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CurrencyController>(CurrencyController);


            const promise = controller.update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/hotel/:id',
        authenticateMiddleware([{ "name": "adminUser" }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CurrencyController>(CurrencyController);


            const promise = controller.delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/ping',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PingController>(PingController);


            const promise = controller.ping.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, response: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                expressAuthentication(request, secMethod.name, secMethod.scopes).then((user: any) => {
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        request['user'] = user;
                        next();
                    }
                })
                    .catch((error: any) => {
                        responded++;
                        if (responded == security.length && !success) {
                            response.status(401);
                            next(error)
                        }
                    })
            }
        }
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
