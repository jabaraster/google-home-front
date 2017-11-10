module.exports = function(startFunction, conversationFunction, endFunction, bodyHandler) {
    console.log('create front.')
    return function(event, context, callback) {
        const body = JSON.parse(event.body)
        if (typeof bodyHandler === 'function') {
            bodyHandler(body)
        }
        switch (body.result.action) {
            case 'input.welcome':
                startFunction(event, context, callback)
                break
            case 'conversation':
                conversationFunction(event, context, callback)
                break
            case 'end':
                endFunction(event, context, callback)
            default:
                conversationFunction(event, context, callback)
                break
        }
    }
}
