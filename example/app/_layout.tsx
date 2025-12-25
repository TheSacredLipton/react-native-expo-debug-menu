import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from "expo-router";
import { DebugMenuProvider } from "react-native-expo-debug-menu";

export default function RootLayout() {
  const debugActions = [
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
    {
      label: 'ログ出力テスト',
      onPress: () => console.log('Debug action triggered')
    }
  ];

  return (
    <DebugMenuProvider
      actions={debugActions}
      showFloatingButton
      floatingButtonPosition={{ bottom: 20, right: 20 }}
    >
      <Stack />
    </DebugMenuProvider>
  )
}
