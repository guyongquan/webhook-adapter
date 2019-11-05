exports.template = function(body) {
    return {
        msgtype: "text",
        text: {
            content: `APE alert:${body.alerts[0].annotations.summary}`
        }
    }
}