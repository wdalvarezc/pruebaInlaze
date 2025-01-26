const { Router } = require('express');
const { Tasks } = require('../models/index')

const router = Router();

router.get('/:id?', async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        return await Tasks.findOne({ where: { id: id } })
            .then((Contenido) => res.status(200).send(Contenido))
    }
    await Tasks.findAll({ include: { all: true } })
        .then((Contenido) => res.status(200).send(Contenido))
})

router.post('/', async (req, res, next) => {
    await Tasks.create(req.body)
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})

router.put('/', async (req, res, next) => {
    const { id } = req.body
    const task = await Tasks.findOne({ where: { id } })

    if (!task) return res.status(404).send('no se encuentra tarea')

    return Tasks.update(req.body, { where: { id } }).then(() => res.status(200).send('tarea actualizada'))

})

router.delete('/', async (req, res, next) => {
    const { id } = req.body
    const response = await Tasks.destroy({
        where: {
            id
        }
    })
    if (response > 0) return res.status(200).send('tarea eliminada')

    return res.status(404).send('no se encuentra tarea')
})


module.exports = router;