import { Stack } from "expo-router";
import { DebugMenuProvider } from "../src";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <DebugMenuProvider actions={debugActions} defaultVisible debugMode>
      <Stack />
    </DebugMenuProvider>
  )
}
