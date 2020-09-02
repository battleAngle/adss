import React, { useState } from 'react';
import { createModel } from 'hox';

function useWarnRecords() {
    const [records, setRecords] = useState<Record[]>([]);

    return {
        records,
        setRecords
    };
}

interface Record {
    status: string;
    time: string;
    equipment: string
}

export default createModel(useWarnRecords);