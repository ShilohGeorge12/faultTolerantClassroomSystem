import { config } from 'dotenv';
config();
import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
	DATABASE_URL: str(),
	SECRET: str(),
	BASE_URL: str(),
	// PORT: port(),
});
