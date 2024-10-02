// File: /app/api/listFiles/route.js

import { promises as fs } from 'fs';
import path from 'path';

// Named export for the GET method
export async function GET() {
  try {
    // Get the path to the how2validate package
    const how2validatePath = path.resolve(process.cwd(), 'node_modules', '@how2validate', 'how2validate');

    // Read the directory
    const files = await fs.readdir(how2validatePath);
    
    // Log the files to the console
    console.log('Files in @how2validate/how2validate:', files);

    // Return the file names in the response
    return new Response(JSON.stringify({ files }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error reading @how2validate/how2validate directory:', error);
    return new Response(JSON.stringify({ error: 'Unable to read the directory' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
