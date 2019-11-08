FROM registry.cn-hangzhou.aliyuncs.com/guyongquan/webhook-adapter-base
ADD index.js /app/
ADD prometheusalert /app/prometheusalert
EXPOSE 80
ENTRYPOINT ["node", "/app/index.js", "--port=80"]
