exports.template = function(body) {
    return {
        
        msgtype: "text",
        text: {
            content: body.alerts[0].annotations.summary
        }
    }
}