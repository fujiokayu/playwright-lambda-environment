
import { Handler } from 'aws-lambda';
import { chromium } from 'playwright-core';

const sparticuzChromium = require( '@sparticuz/chromium' );

sparticuzChromium.setHeadlessMode = true;
sparticuzChromium.setGraphicsMode = false;

export const handler: Handler = async ( event, context ) => {
  const executablePath = await sparticuzChromium.executablePath();
  const browser = await chromium.launch( {
    args: sparticuzChromium.args,
    executablePath,
    headless: sparticuzChromium.headless,
  } );

  const page = await browser.newPage();
  await page.goto('https://example.com');

  const title = await page.title();
  console.log(`Page Title: ${title}`);

  await browser.close();
}