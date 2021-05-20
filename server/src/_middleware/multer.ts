import multer from 'multer';
import path from 'path';

const UPLOAD_PATH = path.join(__dirname, '..', 'uploads');

export const upload = multer({ dest: UPLOAD_PATH });
