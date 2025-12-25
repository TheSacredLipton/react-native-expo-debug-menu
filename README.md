# react-native-expo-debug-menu

React Native (Expo) アプリ向けのデバッグメニューコンポーネント。
開発ビルド (`__DEV__`) 時のみ表示されるデバッグボタンを提供し、任意のアクションを実行できます。

iOSではActionSheet、Android/Webではモーダルを使用します。

## 特徴

- フローティングボタンでデバッグメニューにアクセス
- iOS / Android / Web 対応
- iOSではネイティブUI (ActionSheet) を使用
- 開発モード (`__DEV__`) の自動検知
- 非同期アクション対応

## インストール

```bash
npm install react-native-expo-debug-menu
# または
yarn add react-native-expo-debug-menu
```

## 使い方

ルートコンポーネントを `DebugMenuProvider` でラップし、`actions` に実行したいアクションのリストを渡します。
`showFloatingButton` を `true` にすると、画面にデバッグボタンが表示されます。

```tsx
import { DebugMenuProvider, DebugAction } from 'react-native-expo-debug-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const actions: DebugAction[] = [
    {
      label: 'リロード',
      onPress: () => {
        if (typeof location !== 'undefined' && location.reload) {
          location.reload();
        }
      }
    },
    {
      label: 'AsyncStorageをクリア',
      onPress: async () => {
        await AsyncStorage.clear();
        if (typeof location !== 'undefined' && location.reload) {
          location.reload();
        }
      }
    },
  ];

  return (
    <DebugMenuProvider
      actions={actions}
      showFloatingButton
      floatingButtonPosition={{ bottom: 20, right: 20 }}
    >
      <Stack />
    </DebugMenuProvider>
  );
}
```

## Props

### DebugMenuProvider

| Prop                     | Type                                                                | Default                     | Description                                                                                 |
| ------------------------ | ------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| `actions`                | `DebugAction[]`                                                     | **Required**                | デバッグメニューに表示するアクションのリスト                                                |
| `children`               | `React.ReactNode`                                                   | **Required**                | ラップする子コンポーネント                                                                  |
| `enabled`                | `boolean`                                                           | `__DEV__`                   | デバッグメニュー機能を有効にするかどうか。`false`の場合、ボタンもメニューも表示されません。 |
| `showFloatingButton`     | `boolean`                                                           | `false`                     | `true` の場合、画面右下にフローティングボタンを表示します。                                 |
| `defaultVisible`         | `boolean`                                                           | `false`                     | 初期状態でメニューを表示するかどうか。                                                      |
| `floatingButtonPosition` | `{ top?: number; bottom?: number; left?: number; right?: number; }` | `{ bottom: 50, right: 20 }` | フローティングボタンの位置を指定します。                                                    |

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
