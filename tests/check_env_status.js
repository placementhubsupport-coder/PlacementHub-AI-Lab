import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const envPath = path.resolve('.env');
const envExists = fs.existsSync(envPath);
const key = process.env.NVIDIA_API_KEY;

console.log('ENV_FILE_EXISTS:', envExists);
console.log('KEY_STATUS:', !key ? 'MISSING' : (key === 'nvapi-YOUR_NVIDIA_API_KEY_HERE' ? 'PLACEHOLDER' : 'CONFIGURED_VALID_FORMAT'));
