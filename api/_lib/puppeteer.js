import { launch, Page } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
let page: Page || null;

async function getPage() {
    if (page) return page;
    const options = { 
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    };
    const browser = await launch(options);
    page = await browser.newPage();
    return page;
}

export async function getScreenshot(url, width, height) {
    const page = await getPage();
    await page.goto(url);
    await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720 });
    const file = await page.screenshot();
    return file;
}
