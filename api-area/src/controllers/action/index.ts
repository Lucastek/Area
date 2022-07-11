import Action from '../../models/aboutJson/actionModel'
import { Response, Request } from 'express'
import { IActionReaction } from '../../types/actionReaction'
import { Service } from '../../models/aboutJson/serviceModel'

const createAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId: string = req.params.id
    const body = req.body as Pick<IActionReaction, 'name' | 'description'>
    const action: IActionReaction = new Action({
      name: body.name,
      description: body.description,
      serviceId: serviceId
    })
    await action.save()
    const service = await Service.findById(serviceId)
    service?.actions.push(action)
    await service?.save()
    res.status(201).send(service?.populate('actions'))
  } catch (error) {
    console.log(error)
  }
}

export { createAction }
