const { Router } = require('express');
const { Comments } = require('../models/index')

const router = Router();

router.get('/:id?', async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        return await Comments.findOne({ where: { id: id } })
            .then((Contenido) => res.status(200).send(Contenido))
    }
    await Comments.findAll()
        .then((Contenido) => res.status(200).send(Contenido))
})

router.post('/', async (req, res, next) => {
    await Comments.create(req.body)
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})

router.put('/', async (req, res, next) => {
    const { id } = req.body
    const task = await Comments.findOne({ where: { id } })

    if (!task) return res.status(404).send('no se encuentra Comentario')

    return Comments.update(req.body, { where: { id } }).then(() => res.status(200).send('Comentario actualizada'))

})

router.delete('/', async (req, res, next) => {
    const { id } = req.body
    const response = await Comments.destroy({
        where: {
            id
        }
    })
    if (response > 0) return res.status(200).send('Comentario eliminada')

    return res.status(404).send('no se encuentra Comentario')
})


module.exports = router;