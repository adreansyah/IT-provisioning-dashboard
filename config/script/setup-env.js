const fs = require('fs');

const validEnv = [ 'staging'];
const targetFile = ['.env.staging'];
const environment = process.argv.slice(2)[0];

if (!validEnv.includes(environment)) {
  throw Error(`Invalid environment name ${environment}. Choose only ${validEnv.join(' | ')}`);
}

targetFile.forEach((envFile) => {
  fs.copyFileSync(`config/env/.env.${environment}`, envFile);
});

console.log(`Environment ${environment} successfully created!`);
