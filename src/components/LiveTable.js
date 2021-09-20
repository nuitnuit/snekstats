import React, { useMemo } from 'react';
import { useTable } from 'react-table'

const COLUMNS = [
    {
        Headers: 'SpatialDim',
        accessor: 'SpatialDim'
    },
    {
        Headers: 'TimeDim',
        accessor: 'TimeDim'
    },
    {
        Headers: 'Dim1',
        accessor: 'Dim1'
    },
    {
        Headers: 'Dim2',
        accessor: 'Dim2'
    },
    {
        Headers: 'NumericValue',
        accessor: 'NumericValue'
    },
]

export const LiveTable = () => {
    const columns = useMemo(() => COLUMNS, [])

}