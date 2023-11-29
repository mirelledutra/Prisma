import express from "express";
import RotaController from "../controllers/RotaController.js";

const router = express.Router();

router
  .get("/rotas", RotaController.listarRotas)
  .get("/rotas/:id", RotaController.listarRotaPorId)
  .post("/rotas", RotaController.cadastrarRota)
  .patch("/rotas/:id", RotaController.PATCHAtualizarRota)
  .delete("/rotas/:id", RotaController.excluirRota);

/**
 * @swagger
 * paths:
 *  /rotas:
 *    get:
 *      tags:
 *        - Rotas
 *      summary: Lista todas as rotas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Nome da rota para filtrar
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Número da página para retornar
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *          description: Quantidade de registros por página
 *      responses:
 *        200:
 *          description: Retorna a lista de rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Rota'
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
 *          description: ID inválido ou não encontrado
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
 *          description: Rota não encontrada
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
 *        - Rotas
 *      summary: Cadastra uma nova rota
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                rota:
 *                  type: string
 *                dominio:
 *                  type: string
 *              required:
 *                - rota
 *                - dominio
 *      responses:
 *        201:
 *          description: Rota cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rota'
 *        400:
 *          description: Erro ao cadastrar a rota
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
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *  /rotas/{id}:
 *    get:
 *      summary: Rota encontrada por ID
 *      operationId: getRotaPorId
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna a lista de rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Rota'
 *        400: 
 *          description: ID inválido ou não encontrado
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
 *          description: Rota não encontrada
 *          content:
 *            application.json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *    patch:
 *      summary: Atualiza apenas os atributos passados no corpo de uma rota existente no banco de dados.
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar uma rota existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                rota:
 *                  type: string
 *                dominio:
 *                  type: string
 *              required:
 *                - id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota a ser atualizada.
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Rota atualizada com sucesso. 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Rota'
 *        '401':
 *          description: O usuário não tem permissão para atualizar a rota.
 *        '500':
 *          description: Erro interno do servidor.
 *    delete:
 *      summary: Exclui uma rota existente no banco de dados.
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por eliminar uma rota existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota a ser eliminada.
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: Rota excluída com sucesso. 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Rota'
 *        '401':
 *          description: O usuário não tem permissão para excluir a rota.
 *        '500':
 *          description: Erro interno do servidor.
 */

export default router;
