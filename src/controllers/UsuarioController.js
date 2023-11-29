import bcrypt from "bcryptjs";
import { prisma } from "../configs/prismaClient.js";

// import PermissaoMiddleware from '../middlewares/PermissaoMiddleware.js';
// import ValidadorMiddleware from '../middlewares/ValidadorMiddleware.js';



class UsuarioController {
  // GET - listar Usuarios por nome com paginação 
  static listarUsuarios = async (req, res) => {
    try {
      let userExists = null;

      // fazer uma busca no banco de dados por todos os registros de usuarios sem filtro
      if (!req.query.nome && !req.query.email) {
        userExists = await prisma.usuarios.findMany({});
      }

      // fazer uma busca no banco de dados com filtro por nome
      if (!req.query.email && req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      // fazer uma busca no banco de dados com filtro por email e nome
      if (req.query.email && req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      return res.status(200).json(userExists);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // GET por ID - listar Usuario por ID 
  static listarUsuarioPorId = async (req, res) => {
    try {
      const userExists = await prisma.usuarios.findFirst({       where: {
          id: {
            equals: req.params.id,
          }
        },
      });
      if (userExists) {
        return res.status(200).json(userExists);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }


  // POST - cadastrar Usuario
  static cadastrarUsuario = async (req, res) => {
    try {
      const { nome, email, senha, ativo } = req.body;
      const hashedPassword = await bcrypt.hash(senha, 10);

      const novoUsuario = await prisma.usuarios.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          ativo,
        },
      });


      return res.status(201).json(novoUsuario);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // PUT - atualizar Usuario
  static PUTAtualizarUsuario = async (req, res) => {
    try {


    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }


  // PATCH - atualizar Usuario
  static PATCHAtualizarUsuario = async (req, res) => {
    try {


    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  // PATCH - atualizar Usuario
  static excluirUsuario = async (req, res) => {
    try {


    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }
}

export default UsuarioController;