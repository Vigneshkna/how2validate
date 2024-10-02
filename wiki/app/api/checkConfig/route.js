import fs from 'fs';
import path from 'path';

export async function GET() {
    const configFilePath = path.join(process.cwd(), 'node_modules/@how2validate/how2validate/config.ini');

    try {
        // Check if the config.ini file exists
        await fs.promises.access(configFilePath);
        return new Response(JSON.stringify({ exists: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ exists: false, message: 'Configuration file not found.' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
