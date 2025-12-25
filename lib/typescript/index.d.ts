import React from 'react';
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
export declare const DebugMenuProvider: React.FC<DebugMenuProps>;
export {};
//# sourceMappingURL=index.d.ts.map