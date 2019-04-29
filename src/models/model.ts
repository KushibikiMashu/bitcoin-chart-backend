import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
const adapter = new FileSync('src/database/database.json')
const db = low(adapter)

const test = () => {
    db.defaults({posts: [], user: {}, count: 0})
        .write()
}

export default test