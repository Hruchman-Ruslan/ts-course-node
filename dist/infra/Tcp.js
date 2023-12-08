"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tcp = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const index_1 = require("../app/domain/index");
const index_2 = require("../app/middlewares/index");
// Declare the Tcp class that implements the IService interface
class Tcp {
    // Constructor that implements the Singleton pattern for the Tcp class
    constructor() {
        this.server = (0, express_1.default)(); // Express.js instance
        // If the instance has not yet been created, we save a reference to the current instance
        if (!Tcp.instance) {
            Tcp.instance = this;
        }
        // Return a reference to a single instance of the class
        return Tcp.instance;
    }
    // Method to initialize the service
    async init() {
        const { server, routePrefix } = this;
        // Parse the request body, needed for middlewares
        server.use(express_1.default.json());
        // We use the routing-controllers library to configure routes
        (0, routing_controllers_1.useExpressServer)(server, {
            routePrefix,
            controllers: index_1.controllers,
            middlewares: index_2.middlewares,
            cors: true,
            defaultErrorHandler: true,
            validation: false, // Disable inline validation so we can validate the DTOs ourselves inside the controller
        });
        // Return a Promise that executes successfully when the server starts listening on the port
        return new Promise((resolve) => {
            server.listen(4000, () => {
                console.log("Tcp service started on port 4000");
                return resolve(true);
            });
        });
    }
}
exports.Tcp = Tcp;
//# sourceMappingURL=Tcp.js.map