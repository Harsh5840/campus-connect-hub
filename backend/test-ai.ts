import * as dotenv from 'dotenv';
dotenv.config();

import { generateDescription } from "./src/services/aiService";

async function main() {
  try {
    const desc = await generateDescription("Used iPhone 13 Pro Max");
    console.log("SUCCESS:");
    console.log(desc);
  } catch (error) {
    console.error("FAILED:");
    console.error(error);
  }
}

main();
