const { Router } = require('express');
const { Proyects, Tasks, Teams } = require('../models/index')

const router = Router();

router.get('/:id?', async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        return await Proyects.findOne({ where: { id: id }, include: { all: true } })
            .then((Contenido) => res.status(200).send(Contenido))
    }
    await Proyects.findAll()
        .then((Contenido) => res.status(200).send(Contenido))
})

router.post('/', async (req, res, next) => {
    await Proyects.create(req.body)
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})
router.post('/addTeam', async (req, res, next) => {

    const { ProyectId, TeamId } = req.body
    const team = await Teams.findByPk(TeamId)
    const proyect = await Proyects.findByPk(ProyectId);
    await proyect.addTeam(team)
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})

router.put('/', async (req, res, next) => {
    const { id } = req.body
    const task = await Proyects.findOne({ where: { id } })

    if (!task) return res.status(404).send('no se encuentra Proyecto')

    return Proyects.update(req.body, { where: { id } }).then(() => res.status(200).send('Proyecto actualizada'))

})

router.delete('/', async (req, res, next) => {
    const { id } = req.body
    const response = await Proyects.destroy({
        where: {
            id
        }
    })
    if (response > 0) return res.status(200).send('Proyecto eliminada')

    return res.status(404).send('no se encuentra Proyecto')
})


module.exports = router;