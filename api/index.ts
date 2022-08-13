import { getScreenshot } from './_lib/puppeteer';

module.exports = async (req, res) => {
  if (!req.query.url) return res.status(400).send("No url query specified.");
  try {
    const file = await getScreenshot(req.query.url, req.query.width, req.query.height);
    res.setHeader('Content-Type', `image/png`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.status(200).end(file);
  } catch (error) {
    console.error(error)
    res.status(500).send("The server encountered an error. You may have inputted an invalid query.");
  }
}
