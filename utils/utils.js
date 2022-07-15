
module.exports = {
    log: (msg=null) => {
        if(Array.isArray(msg)){
            msg.forEach(e => {
                console.log('log: %s', e, new Date().toLocaleDateString())
            });
        } else {
            console.log('log: %s', msg, new Date().toLocaleDateString())
        }
    },
    error: (msg=null, stack=null) => {
        if(typeof(stack) == 'object') stack = JSON.stringify(stack)
        console.log('err: %s ,stack: %s', msg, stack, new Date().toLocaleDateString())
    },
    success: (msg, data) => {
        return {
            success: true,
            color: 'green',
            msg: msg,
            data: data
        }
    },
    failed: (msg, data) => {
        return {
            success: false,
            color: 'red',
            msg: msg,
            data: data
        }
    },
    parsing_to_view: (msg=[]) => {
        let o = `<ul>`
        msg.forEach(e => { o += `<li>${e}</li>` })
        o += `</ul>`

        return o
    }
}