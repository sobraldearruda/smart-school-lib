import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'smart-school-lib API',
      version: '1.0.0',
      description: 'Documentation for an API of a school library management platform.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api-docs',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
