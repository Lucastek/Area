import { Request, Response, Router } from "express";
import IServices from "../../interfaces/services.interface";
import authMiddleware, { assertIRequest } from "../../middlewares/auth.middleware";
import axios from 'axios';

class osuService implements IServices {
    readonly router = Router();
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes (): void {
        this.router.post('/user', this.postReturnUser); // think to add call middleware
    }
  
    private postReturnUser = async (request: Request, response: Response) : Promise<void> => {
        assertIRequest(request);

        const userName = request.body.u
        const opts = { headers: { accept: 'application/json' } }

        axios.get("https://osu.ppy.sh/api/get_user?k=9ca29e1368b314f5289acd5c30de934b54807e87&u=" + userName, opts)
            .then(res => {
                response.status(200).json(res.data);
            })
            .catch(error => {
                response.status(500).json({ error })
            });
    }
}

export default osuService