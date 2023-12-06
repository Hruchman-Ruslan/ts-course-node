import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";

// Import our service interface and controllers
import { IServices } from "../types/services";
import { controllers } from "../app/domain/index";
import { middlewares } from "../app/middlewares/index";

// Declare the Tcp class that implements the IService interface
export class Tcp implements IServices {
  private static instance: Tcp; // A reference to a single instance of the class

  private routePrefix: "/api"; // Prefix for API routes
  public server = express(); // Express.js instance

  // Constructor that implements the Singleton pattern for the Tcp class
  constructor() {
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
    server.use(express.json());

    // We use the routing-controllers library to configure routes
    useExpressServer(server, {
      routePrefix,
      controllers,
      middlewares,
      cors: true,
      defaultErrorHandler: true,
      validation: false, // Disable inline validation so we can validate the DTOs ourselves inside the controller
    });

    // Return a Promise that executes successfully when the server starts listening on the port
    return new Promise<boolean>((resolve) => {
      server.listen(4000, () => {
        console.log("Tcp service started on port 4000");

        return resolve(true);
      });
    });
  }
}
