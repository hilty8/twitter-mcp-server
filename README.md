# Twitter MCP Server

AIエージェント向けの強力なTwitter統合機能で、Model Context Protocol (MCP) 標準を活用し、洗練された一貫性のあるインターフェースを通じて包括的なTwitter機能を提供します。

## 概要

このサーバーは、MCPツールを通じてTwitterの機能にアクセスできるようにし、AIアシスタントやその他のMCP互換クライアントとのシームレスな統合を実現します。`agent-twitter-client`ライブラリの上に構築されており、堅牢なエラー処理、レート制限、一貫したレスポンスフォーマットを備えています。

## 機能

### 基本的な読み取り
- メディア対応でユーザーのツイート取得
- 詳細情報付きのユーザープロフィール取得
- ハッシュタグまたはキーワードによるツイート検索
- 検索結果の最新／トップ順フィルター
- レート制限（1回のリクエストで最大50ツイート）

### ユーザーとのやり取り
- ツイートの「いいね」／「いいね解除」
- リツイート／リツイート取消
- ツイート投稿（以下を含む）:
  - テキストコンテンツ
  - メディア添付（画像、動画）
  - リプライ機能
  - 引用ツイート機能

### 高度な機能
- ユーザー関係（フォロワー／フォロー中）取得
- トレンドトピック取得
- 各種タイムラインの取得:
  - ホームタイムライン
  - フォロー中のタイムライン
  - ユーザータイムライン
- リスト管理（リスト内ツイート取得）

### メディアと高度な操作
- メディア処理:
  - 画像アップロード（JPEG, PNG, GIF）
  - 動画アップロード（MP4）
  - 代替テキスト対応
- スレッド作成
- ユーザーのフォロー／フォロー解除

## ツール一覧

### 読み取りツール
- `get_tweets` - 特定ユーザーの最近のツイートを取得
- `get_profile` - ユーザープロフィール情報の取得
- `search_tweets` - ハッシュタグまたはキーワードでツイート検索

### インタラクションツール
- `like_tweet` - ツイートに「いいね」または「いいね解除」
- `retweet` - リツイートまたはリツイート取消
- `post_tweet` - メディアオプション付きで新しいツイート投稿
- `create_thread` - スレッド作成

### タイムラインツール
- `get_timeline` - 各種タイムラインからツイート取得
- `get_list_tweets` - Twitterリストからのツイート取得
- `get_trends` - 現在のトレンドトピック取得

### ユーザー管理ツール
- `get_user_relationships` - フォロワーまたはフォロー中リスト取得
- `follow_user` - ユーザーのフォロー／フォロー解除

## インストール

1. 依存関係のインストール:
```bash
npm install
```

2. サーバーのビルド:
```bash
npm run build
```

3. 環境変数の設定:
```bash
# Required: Twitter Account Credentials (for user authentication)
TWITTER_USERNAME=your_username
TWITTER_PASSWORD=your_password
TWITTER_EMAIL=your_email

# Twitter API Authentication (Optional)
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET_KEY=your_api_secret_key
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

4. MCPクライアントにサーバー設定を追加:

MacOSの場合:
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

Windowsの場合:
```bash
%APPDATA%/Claude/claude_desktop_config.json
```

設定内容:
```json
{
  "mcpServers": {
    "twitter-mcp-server": {
      "command": "/path/to/twitter-mcp-server/build/index.js"
    }
  }
}
```

## GeminiCLIの設定

GeminiCLIを使用する場合は、`.gemini/settings.json`に以下の設定を追加してください：

```json
{
  "mcpServers": {
    "twitter-mcp-server": {
      "command": "node C:\\path\\to\\twitter-mcp-server\\build\\index.js",
      "env": {
        "TWITTER_USERNAME": "ユーザ名",
        "TWITTER_PASSWORD": "パスワード",
        "TWITTER_EMAIL": "メールアドレス"
      }
    }
  }
}
```

`command`のパスは、実際のTwitter MCP Serverのインストール場所に合わせて変更してください。
また、`env`セクションには実際のTwitterアカウントの認証情報を設定してください。

## Development

開発用：自動リビルド付き
```bash
npm run watch
```

### デバッグ

MCPサーバーはstdioで通信するため、MCP Inspectorを使ってデバッグ可能です:
```bash
npm run inspector
```

Inspectorはブラウザでアクセス可能なURLを提供します。

## エラー処理

サーバーは包括的なエラー処理を実装しています:
- すべてのパラメータに対する入力検証
- レート制限保護
- 詳細なエラーメッセージ
- 適切なエラー伝播
- デバッグ用のログ出力

## レスポンス形式

すべてのツールは一貫した形式でレスポンスを返します:
```typescript
{
  content: [{
    type: "text",
    text: string // JSON形式で文字列化されたレスポンスまたはエラーメッセージ
  }]
}
```

## コントリビューション

貢献は大歓迎です！Pull Requestの提出をお待ちしています。

## ライセンス

MITライセンス - 詳細は LICENSE ファイルを参照してください
