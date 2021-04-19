import { NowRequest, NowResponse } from '@vercel/node'

module.exports = async (req: NowRequest, res: NowResponse) => {
  try {
    const file = await getScreenshot(req.query.url, req.query.width, req.query.height);
    res.header('Content-Type', `image/png`);
    res.header('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.status(200).end(file);
  } catch (error) {
    res.header('Content-Type', 'application/json');
    res.json({
      "success": false,
      "error": "No url query",
      "usage": "https://screenshot.totallyusefulapi.ml/api?url=https://totallyusefulapi.ml&width=1920&height=180"
    });
  }
}
