const fnNextId = (() => {
  let id = 0
  return () => {
    id += 1
    return id
  }
})

const nextId = fnNextId()

var animals = [
  { id: nextId(), name: 'panda'},
  { id: nextId(), name: 'racoon' },
  { id: nextId(), name: 'python' },
]

module.exports = app => {

  /**
   * @swagger
   * /animals:
   *   get:
   *     summary: Listagem de Animais
   *     description: Retorna uma lista de todos animais, com opção de ordenação
   *     tags:
   *       - animals
   *     parameters:
   *     responses:
   *       200:
   *         description: Lista de animais
   *         content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: object
   *                properties:
   *                  id:
   *                    type: integer
   *                    format: int32
   *                  name:
   *                    type: string
   */
  app.get('/animals', (req, res) => {
    return res.json(animals)
  })

  /**
   * @swagger
   * /animals:
   *  post:
   *    summary: Adiciona um animal
   *    description: Adiciona um animal na lista
   *    tags:
   *      - animals
   *    parameters:
   *      - in: body
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *    responses:
   *      201:
   *        description: Animal adicionado
   *        content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *                 format: int32
   *               name:
   *                 type: string
   *      400:
   *        description: Animal já existe
   *        content:
   *         application/json:
   *           schema:
   *             properties:
   *               message:
   *                 type: string
   *                 default: 'Animal já existe'
   */
  app.post('/animals', (req, res) => {
    const id = nextId()
    const { name } = req.body
    const already = animals.some(i => i.name === name)
    if (already) {
      return res.status(400).json({ message: 'Animal já existe' })
    }
    const animal = { id, name }
    animals.push(animal)
    return res.status(201).json(animal)
  })

   /**
   * @swagger
   * /animals/{id}:
   *   get:
   *     summary: Um Animal
   *     description: Retorna um animal pelo id
   *     tags:
   *       - animals
   *     parameters:
   *      - in: path
   *        name: id
   *        description: Id de um animal
   *        required: true
   *        type: integer
   *     responses:
   *       200:
   *         description: Um animal
   *         content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: object
   *                properties:
   *                  id:
   *                    type: integer
   *                    format: int32
   *                  name:
   *                    type: string
   *       404:
   *         description: Animal não encontrado
   *         content:
   *          application/json:
   *            schema:
   *              properties:
   *                message:
   *                  type: string
   *                  default: 'Animal não encontrado'
   */
  app.get('/animals/:id', (req, res) => {
    const { id } = req.params
    const animal = animals.filter(i => +i.id === +id)
    if (animal.length === 0) {
      return res.status(404).json({ message: 'Animal não existe' })
    }
    return res.json(animals.slice(0, 1))
  })

  /**
   * @swagger
   * /animals/{id}:
   *  put:
   *    summary: Altera um animal
   *    description: Altera um animal na lista
   *    tags:
   *      - animals
   *    parameters:
   *      - in: path
   *        name: id
   *        description: Id de um animal
   *        required: true
   *        type: integer
   *      - in: body
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *    responses:
   *      200:
   *        description: Animal alterado
   *        content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   *                 default: Alterado
   *      404:
   *        description: Animal não encontrado
   *        content:
   *         application/json:
   *           schema:
   *             properties:
   *               message:
   *                 type: string
   *                 default: 'Animal não encontrado'
   *      400:
   *        description: Animal já existe, esta colocando o mesmo nome de um animal que já existe
   *        content:
   *         application/json:
   *           schema:
   *             properties:
   *               message:
   *                 type: string
   *                 default: 'Animal já existe'
   */
  app.put('/animals/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const exists = animals.some(i => +i.id === +id)
    if (!exists) {
      return res.status(404).json({ message: 'Animal não existe' })
    }
    const already = animals
      .filter(i => +i.id !== +id)
      .some(i => i.name === name)
    if (already) {
      return res.status(400).json({ message: 'Animal já existe' })
    }

    animals = animals.map(i => {
      if (+i.id === +id) {
        return { ...i, name }
      }
      return i
    })

    return res.json({ message: 'Alterado' })
  })


   /**
   * @swagger
   * /animals/{id}:
   *  delete:
   *    summary: Remove um animal
   *    description: Remove um animal na lista
   *    tags:
   *      - animals
   *    parameters:
   *      - in: path
   *        name: id
   *        description: Id de um animal
   *        required: true
   *        type: integer
   *    responses:
   *      200:
   *        description: Animal removido
   *        content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   *                 default: Removido
   *      404:
   *        description: Animal não encontrado
   *        content:
   *         application/json:
   *           schema:
   *             properties:
   *               message:
   *                 type: string
   *                 default: 'Animal não encontrado'
   */
  app.delete('/animals/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const exists = animals.some(i => +i.id === +id)
    if (!exists) {
      return res.status(404).json({ message: 'Animal não existe' })
    }

    animals = animals.filter(i => +i.id !== +id)

    return res.json({ message: 'Removido' })
  })

}
