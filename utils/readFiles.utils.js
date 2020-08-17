const fs = require('fs')


module.exports = async path => {
    try {
        const data = await fs.readFileSync(path, 'utf-8')
        return Array.from(new Set(data.split('\r\n')))
    } catch (err) {
        fs.writeFile(path, '', err => {
            if (err) throw err
        })
        return []
    }

}

