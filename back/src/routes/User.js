const { Router } = require('express');
const { Users, Teams } = require('../models/index')

const router = Router();

router.get('/:id?', async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        return await Users.findOne({ where: { id: id } })
            .then((Contenido) => res.status(200).send(Contenido))
    }
    await Users.findAll()
        .then((Contenido) => res.status(200).send(Contenido))
})

router.post('/', async (req, res, next) => {
    await Users.create(req.body)
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})

router.post('/addTeam', async (req, res, next) => {
    const { TeamId, users } = req.body
    const team = await Teams.findByPk(TeamId)
    const searchUsers = await Promise.all(users.map((user) => {
        return Users.findByPk(user.id)
    }))
    await Promise.all(searchUsers.map((us) => team.addUser(us)))
        .then((r) => res.status(200).send(r))
        .catch((error) => next(error))
})

router.put('/', async (req, res, next) => {
    const { id } = req.body
    const task = await Users.findOne({ where: { id } })

    if (!task) return res.status(404).send('no se encuentra Usuario')

    return Users.update(req.body, { where: { id } }).then(() => res.status(200).send('Usuario actualizado'))

})

router.delete('/', async (req, res, next) => {
    const { id } = req.body
    const response = await Users.destroy({
        where: {
            id
        }
    })
    if (response > 0) return res.status(200).send('Usuario eliminado')

    return res.status(404).send('no se encuentra Usuario')
})


module.exports = router;