import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

const apiSpec: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: { title: 'commentRouter', version: '0.0.1' },
  paths: {
    '/api/comment': {
      get: {
        parameters: [{ $ref: '#components/parameters/route' }],
        summary: 'Get all comments of a route.',
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/comments' } } },
          },
        },
      },
      post: {
        summary: 'Post a comment to a route.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                additionalProperties: false,
                required: ['author', 'quotingID', 'content', 'route'],
                properties: {
                  author: {
                    type: 'object',
                    required: ['username', 'mail', 'website'],
                    properties: {
                      username: { type: 'string', nullable: false },
                      mail: { type: 'string', nullable: true },
                      website: { type: 'string', nullable: true },
                    },
                  },
                  quotingID: { type: 'string', nullable: true },
                  content: { type: 'string', nullable: false },
                  route: { type: 'string', nullable: false },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/comment' } } },
          },
        },
      },
    },
    '/api/comment/{commentID}': {
      parameters: [{ $ref: '#/components/parameters/commentID' }],
      get: {
        summary: 'Get a comment.',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/comment' } },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      commentID: {
        description: 'The id of a comment',
        name: 'commentID',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/uuid' },
      },
      route: {
        description: 'The route',
        name: 'route',
        in: 'query',
        required: true,
        schema: { type: 'string', description: 'route' },
      },
    },
    schemas: {
      uuid: { type: 'string', maxLength: 36, minLength: 36, description: 'A UUID.' },
      comment: { type: 'object' },
      comments: { type: 'array', items: { $ref: '#/components/schemas/comment' } },
    },
  },
};

export default apiSpec;
