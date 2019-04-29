import * as express from 'express'

const router = express.Router()

import test from '../models/model'

router.get('/list', (req: express.Request, res: express.Response) => {
  // dbから値を取り出す
  // jsonにして返却する
  test()
  res.send('/api/list')
})

export default router
