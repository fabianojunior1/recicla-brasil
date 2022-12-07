import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import AuthController from "../controllers/AuthController";

const produtoRouter = Router();

produtoRouter.get('/:idEmpresa', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.idEmpresa);
    const produtos = await ProdutoController.listarProdutos(id);
    return res.status(200).json(produtos)
});

produtoRouter.post('/', AuthController.verifyJWT, async (req, res) => {
    const { nome, valor, id_empresa, id_categoria } = req.body;
    await ProdutoController.cadastrarProduto({ nome, valor, id_empresa, id_categoria })
    return res.status(201).json({ message: "Produto cadastrado com sucesso!" })
})

export default produtoRouter;