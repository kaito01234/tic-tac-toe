FROM node:20-bullseye

# 必要なパッケージのインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# pnpmのインストール
RUN npm install -g pnpm@10

# 作業ディレクトリの設定
WORKDIR /workspaces

# Node.jsのグローバル設定
ENV NODE_ENV=development
ENV PATH /node_modules/.bin:$PATH

# Cloudflare Pagesのデプロイに必要なツールのインストール（オプション）
RUN npm install -g wrangler

# シェルの設定
SHELL ["/bin/bash", "-c"]
