#!/bin/bash

# スクリプトが失敗した場合に停止
set -e

echo "🚀 開発環境のセットアップを開始します..."

# プロジェクトディレクトリに移動
cd /workspaces/docker-outside-of-docker-compose

# pnpmの設定
echo "📦 pnpmの設定..."
pnpm config set store-dir .pnpm-store

# 依存関係のインストール
echo "📚 依存関係のインストール..."
pnpm install

# sharpパッケージのビルドスクリプトを許可
echo "🔧 sharpパッケージのビルドスクリプトを許可..."
pnpm approve-builds sharp
pnpm rebuild sharp

# 開発サーバーの起動方法を表示
echo "✅ セットアップが完了しました！"
echo "🌐 開発サーバーを起動するには:"
echo "  pnpm dev"
echo "🏗️ ビルドするには:"
echo "  pnpm build"
echo "🔍 ビルド結果を確認するには:"
echo "  npx serve out"
