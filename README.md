# react-native-expo-debug-menu

React Native (Expo) アプリ向けのデバッグメニューコンポーネントです。
開発版ビルド (`__DEV__`) や特定の条件下でのみ表示されるデバッグボタンを提供し、カスタムアクションを実行するためのメニューを表示します。

iOSではネイティブのActionSheetを使用し、AndroidやWebではカスタマイズされたモーダルを表示します。

## 特徴

- 🐞 フローティングボタンでデバッグメニューに簡単にアクセス
- 📱 iOS / Android / Web 対応
- 🎨 iOSではネイティブUI (ActionSheet) を使用
- 🛠 開発モード (`__DEV__`) の自動検知
- ⚡️ 非同期アクションのサポート

## インストール

```bash
npm install react-native-expo-debug-menu
# または
yarn add react-native-expo-debug-menu
```

## 使い方

アプリのルートコンポーネント（または任意のコンテナ）を `DebugMenuProvider` でラップし、実行したいアクションのリストを `actions` プロパティに渡します。

`showFloatingButton` プロパティを `true` に設定すると、画面右下にデバッグボタン（🐞）が表示されます。

```tsx
import { DebugMenuProvider, DebugAction } from 'react-native-expo-debug-menu';
import { Stack } from 'expo-router';
import { Alert } from 'react-native';

export default function RootLayout() {
  const debugActions: DebugAction[] = [
    {
      label: 'APIログを表示',
      onPress: () => console.log('API Logs...'),
    },
    {
      label: 'キャッシュをクリア',
      onPress: async () => {
        // 非同期処理もサポートされています
        await clearCache();
        Alert.alert('完了', 'キャッシュをクリアしました');
      },
      style: 'destructive', // 赤字で表示されます（iOS/Android共通）
    },
  ];

  return (
    // showFloatingButton={true} でフローティングボタンを表示
    <DebugMenuProvider actions={debugActions} showFloatingButton>
      <Stack />
    </DebugMenuProvider>
  );
}
```

## Props

### DebugMenuProvider

| Prop             | Type              | Default      | Description                                                                                 |
| ---------------- | ----------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `actions`        | `DebugAction[]`   | **Required** | デバッグメニューに表示するアクションのリスト                                                |
| `children`       | `React.ReactNode` | **Required** | ラップする子コンポーネント                                                                  |
| `enabled`        | `boolean`         | `__DEV__`    | デバッグメニュー機能を有効にするかどうか。`false`の場合、ボタンもメニューも表示されません。 |
| `showFloatingButton` | `boolean`         | `false`      | `true` の場合、画面右下にフローティングボタン（🐞）を表示します。                            |
| `defaultVisible` | `boolean`         | `false`      | 初期状態でメニューを表示するかどうか。                                                      |

### DebugAction

| Property  | Type                                     | Description                                                                    |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `label`   | `string`                                 | メニューに表示されるアクション名                                               |
| `onPress` | `() => void \| Promise<void>`            | アクションが選択されたときに実行される関数                                     |
| `style`   | `'default' \| 'cancel' \| 'destructive'` | (Optional) アクションのスタイル。`destructive`を指定すると赤字で表示されます。 |

## 開発・公開手順

### ビルド

```bash
npm run build
```

### npmへの公開

1. バージョンを更新します。

```bash
npm version patch # または minor, major
```

2. npmに公開します（ビルドは自動的に実行されます）。

```bash
npm publish
```

## License

MIT
