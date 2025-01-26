const { Router } = require('express');
const { Teams } = require('../models/index')

const router = Router();

router.get('/:id?', async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        return await Teams.findOne({ where: { id: id } })
            .then((Contenido) => res.status(200).send(Contenido))
    }
    await Teams.findAll()
        .then((Contenido) => res.status(200).send(Contenido))
})

router.post('/', async (req, res, next) => {
    await Teams.create(req.body)
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})

router.put('/', async (req, res, next) => {
    const { id } = req.body
    const task = await Teams.findOne({ where: { id } })

    if (!task) return res.status(404).send('no se encuentra Equipo')

    return Teams.update(req.body, { where: { id } }).then(() => res.status(200).send('Equipo actualizada'))

})

router.delete('/', async (req, res, next) => {
    const { id } = req.body
    const response = await Teams.destroy({
        where: {
            id
        }
    })
    if (response > 0) return res.status(200).send('Equipo eliminada')

    return res.status(404).send('no se encuentra Equipo')
})


module.exports = router;