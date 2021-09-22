import React, { useMemo, useEffect, useState } from 'react';
import { getList } from '../../src/services/List';
import Table from "./Table"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function LiveTable() {
    const columns = useMemo(() => [
        {
            Headers: 'SpatialDim',
            accessor: 'value.SpatialDim'
        },
        {
            Headers: 'TimeDim',
            accessor: 'value.TimeDim'
        },
        {
            Headers: 'Dim1',
            accessor: 'value.Dim1'
        },
        {
            Headers: 'Dim2',
            accessor: 'value.Dim2'
        },
        {
            Headers: 'NumericValue',
            accessor: 'value.NumericValue'
        },
    ]
    );
    const [list, setList] = useState({ value: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        setHasError(false);
        getList()
            .then(items => {
                if (mounted) {
                    setList(items)
                }
            })
        setIsLoading(false);
        return () => mounted = false;
    }, [])
    console.log(list.value);

    return (
        <div className="wrapper">
            {hasError && <p>Something went wrong.</p>}
            {isLoading ? (<p style="text-align:center">Loading ...</p>) : (
                list.value.map(item => (/*<Table columns={columns} data={item} />*/<ul><h3>{item.SpatialDim}</h3></ul>))
            )}
        </div >
    );
}
