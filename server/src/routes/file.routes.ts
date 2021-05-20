import { Router, Request, Response } from 'express';
import { downloadFile } from '../_helpers/s3';
import passport from '../_middleware/passport';

const router = Router();

router.get(
  '/:fileKey',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const key = req.params.fileKey;
      const readStream = downloadFile(key);
      readStream.pipe(res);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

export default router;
