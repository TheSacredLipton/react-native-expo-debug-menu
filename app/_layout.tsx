import { Stack } from "expo-router";
import { DebugMenuProvider } from "../DebugMenu";
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
    { label: "test", onPress: () => console.log("test") }
    , { label: "test", onPress: () => console.log("test") }
    , { label: "test", onPress: () => console.log("test") }
    , { label: "test", onPress: () => console.log("test") }
  ];

  return (
    <DebugMenuProvider actions={debugActions} defaultVisible debugMode>
      <Stack />
    </DebugMenuProvider>
  )
}
