import dotenv from 'dotenv';
import app from './app';
import log from './logging/log';
import { start } from 'node:repl';

const PORT = process.env.PORT

const startApp = async () => {
    dotenv.config()
    
    
    app.listen(PORT, () => {
        log(`Application is ready on port ${PORT}`, 'info')
    })
};

export default startApp()