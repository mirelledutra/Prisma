import express from "express";
import GrupoRoutesController from "../controllers/GrupoRoutesController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();

router
  .get("/grupoRoutes", GrupoRoutesController.listarGrupoRoutes)
  .get("/grupoRoutes/:id", GrupoRoutesController.listarGrupoRoutesPorId)
  .post("/grupoRoutes", GrupoRoutesController.cadastrarGrupoRoutes)
  .patch("/grupoRoutes/:id", GrupoRoutesController.PATCHAtualizarGrupoRoutes)
  .delete("/grupoRoutes/:id", GrupoRoutesController.excluirGrupoRoutes);

/**
 * @swagger
 * paths:
 *  /grupoRoutes:
 *    get:
 *      tags:
 *        - GrupoRoutes
 *      summary: List all group routes with optional filtering
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Filter by route name
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Page number for pagination
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *          description: Number of records per page
 *      responses:
 *        200:
 *          description: Returns the list of group routes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRoutes'
 *                  totalDocs:
 *                    type: integer
 *                  limit:
 *                    type: integer
 *                  totalPages:
 *                    type: integer
 *                  page:
 *                    type: integer
 *                  pagingCounter:
 *                    type: integer
 *                  hasPrevPage:
 *                    type: boolean
 *                  hasNextPage:
 *                    type: boolean
 *                  prevPage:
 *                    type: integer
 *                  nextPage:
 *                    type: integer
 *        400:
 *          description: Invalid or not found ID
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: Group route not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *    post:
 *      tags:
 *        - GrupoRoutes
 *      summary: Create a new group route
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoRoutes'
 *      responses:
 *        201:
 *          description: Group route created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoRoutes'
 *        400:
 *          description: Error creating the group route
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *  /grupoRoutes/{id}:
 *    get:
 *      summary: Get a group route by ID
 *      operationId: getGrupoRoutesPorId
 *      tags:
 *        - GrupoRoutes
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the group route to retrieve
 *          required: true
 *          schema:
 *            type: string
 * 
 * 
 *      responses:
 *        200:
 *          description: Returns the group route
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRoutes'
 *        400:
 *          description: Invalid or not found ID
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: Group route not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *
 *    patch:
 *      summary: Update a group route by ID
 *      tags:
 *        - GrupoRoutes
 *      security:
 *        - bearerAuth: []
 *      description: Update an existing group route in the database
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoRoutes'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the group route to update
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Group route updated successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRoutes'
 *        401:
 *          description: User does not have permission to update the group route.
 *        500:
 *          description: Internal server error.
 *
 *    delete:
 *      summary: Delete a group route by ID
 *      tags:
 *        - GrupoRoutes
 *      security:
 *        - bearerAuth: []
 *      description: Delete an existing group route in the database
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the group route to delete
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: Group route deleted successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRoutes'
 *        401:
 *          description: User does not have permission to delete the group route.
 *        500:
 *          description: Internal server error.
 */

export default router;
