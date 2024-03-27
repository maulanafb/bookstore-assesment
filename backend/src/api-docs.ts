import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Bookstore Documentation",
      version: "1.0.0",
      description: "Bookstore Documentation",
      openapi: "3.0.0",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  apis: [path.resolve(__dirname, "../../korea/src/controllers/*.ts")],
};

const specs = swaggerJsdoc(options);

export default specs;
