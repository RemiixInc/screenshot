import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
let _page: Page | null;

async function getPage() {
    if (_page) {
        return _page;
    }
    const options = await getOptions(false);
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(url, width, height) {
    const page = await getPage();
    await page.goto(url);
    await page.setViewport({ width: width || 1920, height: height || 1080 });
    const file = await page.screenshot();
    return file;
}
