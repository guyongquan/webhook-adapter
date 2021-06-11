FROM registry.cn-hangzhou.aliyuncs.com/lizexin/webhook-adapter-base:1.1
ADD index.js /app/
ADD prometheusalert /app/prometheusalert
EXPOSE 80
ENTRYPOINT ["node", "/app/index.js", "--port=80"]
