import React from 'react';
export type DebugAction = {
    label: string;
    onPress: () => void | Promise<void>;
    style?: 'default' | 'cancel' | 'destructive';
};
export interface DebugMenuProps {
    actions: DebugAction[];
    children: React.ReactNode;
    enabled?: boolean;
    showFloatingButton?: boolean;
    defaultVisible?: boolean;
    floatingButtonPosition?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
}
export declare const DebugMenuProvider: React.FC<DebugMenuProps>;
//# sourceMappingURL=index.d.ts.map