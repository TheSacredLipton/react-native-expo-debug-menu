"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugMenuProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DebugMenuProvider = ({
  actions,
  children,
  enabled = __DEV__,
  debugMode = false,
  defaultVisible = false
}) => {
  const [visible, setVisible] = (0, _react.useState)(defaultVisible);
  const {
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const containerMaxHeight = Math.round(windowHeight * 0.85);
  const actionRowHeight = 56;
  const cancelRowHeight = 56;
  const titleBlockHeight = 44;
  const containerVerticalPadding = 40;
  const cancelMarginTop = 12;
  const separatorHeight = 1;
  const separatorsCount = Math.max(0, actions.length - 1);
  const desiredContentHeight = containerVerticalPadding + titleBlockHeight + actions.length * actionRowHeight + separatorsCount * separatorHeight + cancelMarginTop + cancelRowHeight;
  const containerHeight = Math.min(desiredContentHeight, containerMaxHeight);
  const scrollEnabled = desiredContentHeight > containerHeight;
  const showActionSheet = () => {
    const options = [...actions.map(a => a.label), 'キャンセル'];
    const destructiveButtonIndex = actions.findIndex(a => a.style === 'destructive');
    const cancelButtonIndex = options.length - 1;
    _reactNative.ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex: destructiveButtonIndex !== -1 ? destructiveButtonIndex : undefined,
      title: 'デバッグメニュー',
      message: '実行したいアクションを選択してください'
    }, buttonIndex => {
      if (buttonIndex < actions.length) {
        handleAction(actions[buttonIndex]);
      }
    });
  };
  const handleAction = async action => {
    try {
      await action.onPress();
    } catch (e) {
      console.error('Debug menu action failed:', e);
    } finally {
      setVisible(false);
    }
  };
  if (!enabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [children, enabled && debugMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: styles.debugButton,
      onPress: () => _reactNative.Platform.OS === 'ios' && !defaultVisible ? showActionSheet() : setVisible(true),
      activeOpacity: 0.7,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.debugButtonText,
        children: "\uD83D\uDC1E"
      })
    }), (_reactNative.Platform.OS !== 'ios' || defaultVisible) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
      visible: visible,
      transparent: true,
      animationType: "fade",
      onRequestClose: () => setVisible(false),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: styles.overlay,
        activeOpacity: 1,
        onPress: () => setVisible(false),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
          style: styles.safeArea,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: [styles.container, {
              height: containerHeight
            }],
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.title,
              children: "Debug Menu"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
              style: styles.scrollView,
              bounces: false,
              scrollEnabled: scrollEnabled,
              showsVerticalScrollIndicator: false,
              children: actions.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.actionItemContainer,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.button,
                  onPress: () => handleAction(item),
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: [styles.buttonText, item.style === 'destructive' && styles.destructiveText],
                    children: item.label
                  })
                }), index < actions.length - 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.separator
                })]
              }, index))
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: [styles.button, styles.cancelButton],
              onPress: () => setVisible(false),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.buttonText, styles.cancelButtonText],
                children: "\u9589\u3058\u308B"
              })
            })]
          })
        })
      })
    })]
  });
};
exports.DebugMenuProvider = DebugMenuProvider;
const styles = _reactNative.StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  safeArea: {
    width: '100%',
    alignItems: 'center'
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
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  scrollView: {
    width: '100%',
    flex: 1
  },
  actionItemContainer: {
    width: '100%'
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500'
  },
  destructiveText: {
    color: '#FF3B30'
  },
  separator: {
    height: _reactNative.StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    width: '100%'
  },
  cancelButton: {
    marginTop: 12,
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingVertical: 16
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 18
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
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 9999
  },
  debugButtonText: {
    fontSize: 24
  }
});
//# sourceMappingURL=index.js.map