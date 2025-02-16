import { readFileSync } from 'fs';
import { resolve } from 'path';
// import type { PageServerLoad } from "./$types";


export function load() {
    const packageJsonPath = resolve('package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    return { 
        version: packageJson.version, 
        data: { message: "Hello from the server!", count: 42 } 
    };
}

// export function load() {
//   const packageJsonPath = resolve('package.json');
//   const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
//   console.log(packageJson.version);
//   return { version: packageJson.version };
// }

// export const load: PageServerLoad = async ({  }) => {
//     // Simulating fetching data
//     return {
//       message: "Hello from the server!",
//       count: 42
//     };
//   };