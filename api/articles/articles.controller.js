const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const articleService = require("./articles.service");
const userService = require("../users/users.service"); // Importez le service des utilisateurs

class ArticleController {
    async getAll(req, res, next) {
        try {
            const articles = await articleService.getAll();
            res.json(articles);
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const article = await articleService.get(id);
            if (!article) {
                throw new NotFoundError();
            }
            res.json(article);
        } catch (err) {
            next(err);
        }
    }

    async getByUserId(req, res, next) {
        try {
            const userId = req.params.userId;
            const articles = await articleService.getByUserId(userId);
            res.json(articles);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            let article = await articleService.create(req.body);
            article.user = req.user; // 5.7 enregistrer l'utilisateur qui crée l'article
            req.io.emit("article:create", article);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const user = await userService.getById(req.user.id); // Récupérer les informations de l'utilisateur connecté

            // Vérifier si l'utilisateur est un admin
            if (user.role !== "admin") {
                throw new UnauthorizedError("You are not authorized to perform this action");
            }

            const articleModified = await articleService.update(id, data);
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;

            // Vérifier le rôle de l'utilisateur connecté
            if (req.user.role !== 'admin') {
                throw new UnauthorizedError('You are not authorized to perform this action');
            }

            const article = await articleService.get(id);
            if (!article) {
                throw new NotFoundError('Article not found');
            }

            await articleService.delete(id);
            req.io.emit('article:delete', { id });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ArticleController();