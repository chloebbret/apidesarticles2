const NotFoundError = require("../../errors/not-found");
const articleService = require("./articles.service");

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
            const articleModified = await articleService.update(id, data);
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await articleService.delete(id);
            req.io.emit("article:delete", { id });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ArticleController();