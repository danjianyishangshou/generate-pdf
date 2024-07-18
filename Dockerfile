# 基于现有的 puppeteer 镜像
FROM machines/puppeteer:latest

# 安装 sudo 工具
USER root
# 更新配置项
RUN apt-get update && apt-get install -y sudo
# 移除原有的node link
RUN rm -rf /usr/local/bin/node
RUN rm -rf /usr/local/bin/nodejs

# 添加源仓库，更新并安装必要工具
RUN sudo apt-get update && sudo apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
    sudo apt-get install -y nodejs
# 绑定最新的node link
RUN export PATH=$PATH:/usr/local/bin

# 确保 Node.js 版本是最新的
RUN node -v

# 复制你的应用
WORKDIR /usr/src/app
# 安装依赖
COPY package*.json ./
RUN npm install
COPY . .
# 启动项目
CMD ["node", "main.js"]

