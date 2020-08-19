import React, { useState } from 'react';
import { createModel } from 'hox';

function useTabbar() {
    const [activeBar, setActiveBar] = useState<ActiveBar>('system-setting');

    return {
        activeBar,
        setActiveBar
    };
}

export default createModel(useTabbar);

type ActiveBar = 'system-setting' | 'realtime-monitor' | 'history-data';
