import { NowRequest, NowResponse } from '@vercel/node'
import { getScreenshot } from './_lib/chromium';

module.exports = async (req: NowRequest, res: NowResponse) => {
  const usage = "https://screenshot.totallyusefulapi.ml/api?url=https://google.com&width=1366&height=625"
  if (!req.query.url) return res.json({
    "success": false,
    "error": "No url query specified!",
    "usage": usage
  });
  try {
    const file = await getScreenshot(req.query.url, Number(req.query.width), Number(req.query.height));
    res.setHeader('Content-Type', `image/png`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.status(200).end(file);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      "success": false,
      "error": "Invalid queries!",
      //"dev": error,
      "usage": usage
    });
  }
}
