import Reaction from '../../models/aboutJson/reactionModel'
import { Response, Request } from 'express'
import { IActionReaction } from '../../types/actionReaction'
import { Service } from '../../models/aboutJson/serviceModel'

const createReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId: string = req.params.id
    const body = req.body as Pick<IActionReaction, 'name' | 'description'>
    const reaction: IActionReaction = new Reaction({
      name: body.name,
      description: body.description,
      serviceId: serviceId
    })
    await reaction.save()
    const service = await Service.findById(serviceId)
    service?.reactions.push(reaction)
    await service?.save()
    res.status(201).send(service?.populate('reactions'))
  } catch (error) {
    console.log(error)
  }
}

export { createReaction }
