# 五目並べ (Gomoku)

Next.js、TypeScript、Tailwind CSSで作成した五目並べ（Gomoku）です。

## 機能

- 15x15のゲームボード
- プレイヤー交代（黒石「●」と白石「○」）
- 勝敗判定（5つ並べると勝利）
- 引き分け判定
- ゲームリセット
- ダークモード対応
- SVGを使用したリッチな石と盤面表現

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク

## 開発方法

まず、開発サーバーを起動します：

```bash
# パッケージのインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、ゲームが表示されます。

## VSCode Dev Containers での開発

このプロジェクトは VSCode の [Dev Containers](https://code.visualstudio.com/docs/remote/containers) 機能を使用して、コンテナ化された開発環境で開発することができます。これにより、すべての開発者が同じ環境で開発できます。

### 前提条件

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [VSCode Remote - Containers 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Dev Containers での開発手順

1. VSCode でプロジェクトを開きます。
2. コマンドパレット（`F1`キー）を開き、`Remote-Containers: Reopen in Container`を選択します。
3. VSCode が Dev Container を構築し、コンテナ内でプロジェクトを開きます。
4. 自動的に依存関係がインストールされます。
5. 開発サーバーを起動するには、ターミナルで以下のコマンドを実行します：

```bash
pnpm dev
```

6. ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、ゲームが表示されます。

### Dev Container の特徴

- Node.js 20 環境
- pnpm パッケージマネージャー
- ESLint、Prettier などの開発ツール
- Tailwind CSS のサポート
- TypeScript のサポート
- Cloudflare Pages デプロイツール（wrangler）

## ビルド方法

本番用にビルドするには：

```bash
pnpm build
```

ビルドされたファイルは `out` ディレクトリに生成されます。

## Cloudflare Pagesへのデプロイ

このプロジェクトはCloudflare Pagesにデプロイできるように設定されています。

### デプロイ手順

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログインします。
2. 「Pages」セクションに移動します。
3. 「Create a project」をクリックします。
4. 「Connect to Git」を選択し、GitHubまたはGitLabのリポジトリを接続します。
5. リポジトリを選択し、以下のビルド設定を入力します：
   - **Framework preset**: Next.js
   - **Build command**: pnpm build
   - **Build output directory**: out
   - **Root directory**: /
   - **Node.js version**: 20.x (または最新バージョン)
6. 「Save and Deploy」をクリックします。

デプロイが完了すると、Cloudflare Pagesによって生成されたURLでゲームにアクセスできます。

## ローカルでの静的ファイルの確認

ビルド後に生成された静的ファイルをローカルで確認するには：

```bash
# 静的ファイルのサーブ
npx serve out
```

## ライセンス

MITライセンス
