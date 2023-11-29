import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class GrupoController {
  // GET - Listar Grupos com paginação
  static listarGrupos = async (req, res) => {
    try {
      const grupos = await prisma.grupo.findMany();
      return res.status(200).json(grupos);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // GET por ID - Listar Grupo por ID
  static listarGrupoPorId = async (req, res) => {
    try {
      const grupoId = req.params.id;

      const grupo = await prisma.grupo.findUnique({
        where: {
          id: grupoId,
        },
      });

      if (grupo) {
        return res.status(200).json(grupo);
      } else {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo não encontrado" }]);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // POST - Cadastrar Grupo
  static cadastrarGrupo = async (req, res) => {
    try {
      const { nome, descricao, ativo, unidade } = req.body;

      if (!nome || !unidade) {
        return res.status(400).json([{ error: true, code: 400, message: "Nome e Unidade são obrigatórios" }]);
      }

      const grupoExists = await prisma.grupo.findFirst({
        where: {
          nome,
          unidade,
        },
      });

      if (grupoExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Grupo já cadastrado" }]);
      }

      const grupoCreated = await prisma.grupo.create({
        data: {
          nome,
          descricao,
          ativo: ativo || true,
          unidade,
        },
      });

      return res.status(201).json(grupoCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // PUT - Atualizar Grupo por ID
  static atualizarGrupo = async (req, res) => {
    try {
      const grupoId = req.params.id;
      const { nome, descricao, ativo, unidade } = req.body;

      if (!nome || !unidade) {
        return res.status(400).json([{ error: true, code: 400, message: "Nome e Unidade são obrigatórios" }]);
      }

      const grupoExists = await prisma.grupo.findUnique({
        where: {
          id: grupoId,
        },
      });

      if (!grupoExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo não encontrado" }]);
      }

      const grupoUpdated = await prisma.grupo.update({
        where: {
          id: grupoId,
        },
        data: {
          nome,
          descricao,
          ativo: ativo || true,
          unidade,
        },
      });

      return res.status(200).json(grupoUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // DELETE - Excluir Grupo por ID
  static excluirGrupo = async (req, res) => {
    try {
      const grupoId = req.params.id;

      const grupoExists = await prisma.grupo.findUnique({
        where: {
          id: grupoId,
        },
      });

      if (!grupoExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo não encontrado" }]);
      }

      await prisma.grupo.delete({
        where: {
          id: grupoId,
        },
      });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }
}

export default GrupoController;
