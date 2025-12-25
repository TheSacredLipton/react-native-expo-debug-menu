import React, { useState, useEffect, useRef } from 'react';
import { ActionSheetIOS, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type DebugAction = {
  label: string;
  onPress: () => void | Promise<void>;
  style?: 'default' | 'cancel' | 'destructive';
};

interface DebugMenuProps {
  actions: DebugAction[];
  children: React.ReactNode;
  enabled?: boolean;
  debugMode?: boolean;
  defaultVisible?: boolean;
}

export const DebugMenuProvider: React.FC<DebugMenuProps> = ({
  actions,
  children,
  enabled = __DEV__,
  debugMode = false,
  defaultVisible = false
}) => {
  const [visible, setVisible] = useState(defaultVisible);
  const { height: windowHeight } = useWindowDimensions();
  const containerMaxHeight = Math.round(windowHeight * 0.85);
  const actionRowHeight = 56;
  const cancelRowHeight = 56;
  const titleBlockHeight = 44;
  const containerVerticalPadding = 40;
  const cancelMarginTop = 12;
  const separatorHeight = 1;

  const separatorsCount = Math.max(0, actions.length - 1);
  const desiredContentHeight =
    containerVerticalPadding +
    titleBlockHeight +
    actions.length * actionRowHeight +
    separatorsCount * separatorHeight +
    cancelMarginTop +
    cancelRowHeight;

  const containerHeight = Math.min(desiredContentHeight, containerMaxHeight);
  const scrollEnabled = desiredContentHeight > containerHeight;

  const showActionSheet = () => {
    const options = [...actions.map(a => a.label), 'キャンセル'];
    const destructiveButtonIndex = actions.findIndex(a => a.style === 'destructive');
    const cancelButtonIndex = options.length - 1;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: destructiveButtonIndex !== -1 ? destructiveButtonIndex : undefined,
        title: 'デバッグメニュー',
        message: '実行したいアクションを選択してください',
      },
      (buttonIndex) => {
        if (buttonIndex < actions.length) {
          handleAction(actions[buttonIndex]);
        }
      }
    );
  };

  const handleAction = async (action: DebugAction) => {
    try {
      await action.onPress();
    } catch (e) {
      console.error('Debug menu action failed:', e);
    } finally {
      setVisible(false);
    }
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {enabled && debugMode && (
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => Platform.OS === 'ios' && !defaultVisible ? showActionSheet() : setVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.debugButtonText}>🐞</Text>
        </TouchableOpacity>
      )}
      {(Platform.OS !== 'ios' || defaultVisible) && (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <SafeAreaView style={styles.safeArea}>
              <View style={[styles.container, { height: containerHeight }]}>
                <Text style={styles.title}>Debug Menu</Text>
                <ScrollView
                  style={styles.scrollView}
                  bounces={false}
                  scrollEnabled={scrollEnabled}
                  showsVerticalScrollIndicator={false}
                >
                  {actions.map((item, index) => (
                    <View key={index} style={styles.actionItemContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleAction(item)}
                      >
                        <Text style={[
                          styles.buttonText,
                          item.style === 'destructive' && styles.destructiveText
                        ]}>{item.label}</Text>
                      </TouchableOpacity>
                      {index < actions.length - 1 && <View style={styles.separator} />}
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setVisible(false)}
                >
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>閉じる</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  safeArea: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  actionItemContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    width: '100%',
  },
  cancelButton: {
    marginTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingVertical: 16,
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 18,
  },
  debugButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 9999,
  },
  debugButtonText: {
    fontSize: 24,
  },
});
