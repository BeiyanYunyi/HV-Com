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
                      username: { type: 'string', nullable: false, minLength: 1, maxLength: 64 },
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
    '/api/generateAvatar/{username}': {
      parameters: [{ $ref: '#/components/parameters/username' }],
      get: {
        summary: 'Get a genereted avatar.',
        responses: {
          '200': {
            description: 'OK',
            content: { 'image/svg+xml': { schema: { type: 'string' } } },
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
      username: {
        description: 'username',
        name: 'username',
        in: 'path',
        required: true,
        schema: { type: 'string', description: 'username' },
      },
    },
    schemas: {
      uuid: {
        type: 'string',
        description: 'A UUID.',
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$',
      },
      comment: { type: 'object' },
      comments: { type: 'array', items: { $ref: '#/components/schemas/comment' } },
    },
  },
};

export default apiSpec;
