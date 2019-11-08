exports.template = function(body) {
    //钉钉群机器人 webhook api 文档 https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq
    var alerts = body.alerts;
    var content = alerts.map(
        alert => {
            return [`# Name:${alert.labels.alertname}`, "## Labels:"]
            .concat(Object.entries(alert.labels).map(label => `- ${label[0]}:${label[1]}`))
            .concat("## Annotations:")
            .concat(Object.entries(alert.annotations).map(annotation => `- ${annotation[0]}:${annotation[1]}`))
            .join("\n")
        }
    ).concat(`**Status:${body.status}**`).join("\n\n");
    return {
        msgtype: "markdown",
        markdown: {
            title: "ALERT",
            text: content
        }
    }
}