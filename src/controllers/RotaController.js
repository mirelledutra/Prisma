import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class RotaController {
  // GET - Listar Rotas com paginação
  static listarRotas = async (req, res) => {
    try {
      let rotas = null;

      if (!req.query.rota && !req.query.dominio) {
        rotas = await prisma.rota.findMany();
      }

      if (!req.query.dominio && req.query.rota) {
        rotas = await prisma.rota.findMany({
          where: {
            rota: {
              contains: req.query.rota,
            },
          },
        });
      }

      if (req.query.dominio && !req.query.rota) {
        rotas = await prisma.rota.findMany({
          where: {
            dominio: {
              contains: req.query.dominio,
            },
          },
        });
      }

      if (req.query.dominio && req.query.rota) {
        rotas = await prisma.rota.findMany({
          where: {
            rota: {
              contains: req.query.rota,
            },
            dominio: {
              contains: req.query.dominio,
            },
          },
        });
      }

      return res.status(200).json(rotas);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // GET por ID - Listar Rota por ID
  static listarRotaPorId = async (req, res) => {
    try {
      const rotaId = req.params.id;

      const rota = await prisma.rota.findUnique({
        where: {
          id: rotaId,
        },
      });

      if (rota) {
        return res.status(200).json(rota);
      } else {
        return res.status(404).json([{ error: true, code: 404, message: "Rota não encontrada" }]);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // POST - Cadastrar Rota
  static cadastrarRota = async (req, res) => {
    try {
      const { rota, dominio, ativo } = req.body;

      const erros = [];

      if (!rota) {
        erros.push({ error: true, code: 400, message: "Rota é obrigatória" });
      }
      if (!dominio) {
        erros.push({ error: true, code: 400, message: "Domínio é obrigatório" });
      }
      if (!ativo) {
        erros.push({ error: true, code: 400, message: "Ativo é obrigatório" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      const rotaExists = await prisma.rota.findFirst({
        where: {
          rota: rota,
          dominio: dominio,
        },
      });

      if (rotaExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Rota já cadastrada" }]);
      }

      const rotaCreated = await prisma.rota.create({
        data: {
          rota,
          dominio,
          ativo,
        },
      });

      return res.status(201).json(rotaCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // PUT - Atualizar Rota por ID
  static atualizarRota = async (req, res) => {
    try {
      const rotaId = req.params.id;
      const { rota, dominio, ativo } = req.body;

      const erros = [];

      if (!rota && !dominio) {
        erros.push({ error: true, code: 400, message: "Pelo menos uma das informações deve ser fornecida para atualizar a rota" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      const rotaExists = await prisma.rota.findUnique({
        where: {
          id: rotaId,
        },
      });

      if (!rotaExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Rota não encontrada" }]);
      }

      const updatedRota = await prisma.rota.update({
        where: {
          id: rotaId,
        },
        data: {
          rota: rota || rotaExists.rota,
          dominio: dominio || rotaExists.dominio,
          ativo: ativo !== undefined ? ativo : rotaExists.ativo,
        },
      });

      return res.status(200).json(updatedRota);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  // DELETE - Excluir Rota por ID
  static excluirRota = async (req, res) => {
    try {
      const rotaId = req.params.id;

      const rotaExists = await prisma.rota.findUnique({
        where: {
          id: rotaId,
        },
      });

      if (!rotaExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Rota não encontrada" }]);
      }

      const relacionamentoExists = await prisma.rotasGrupos.findFirst({
        where: {
          rotaId: rotaId,
        },
      });

      if (relacionamentoExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Rota possui relacionamentos com grupos, não pode ser excluída" }]);
      }

      await prisma.rota.delete({
        where: {
          id: rotaId,
        },
      });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }
}

export default RotaController;
