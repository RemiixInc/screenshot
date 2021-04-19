import { NowRequest, NowResponse } from '@vercel/node'

module.exports = (req: NowRequest, res: NowResponse) => {
  res.status(200).send("hey")
}
