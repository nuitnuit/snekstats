import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: "Id",
        headerName: 'ID',
        width: 100
    },
    {
        headerName: 'SpatialDim',
        field: 'SpatialDim',
        width: 200
    },
    {
        headerName: 'TimeDim',
        field: 'TimeDim',
        width: 200
    },
    {
        headerName: 'Dim1',
        field: 'Dim1',
        width: 200
    },
    {
        headerName: 'Dim2',
        field: 'Dim2',
        width: 200
    },
    {
        headerName: 'NumericValue',
        field: 'NumericValue',
        width: 200
    },
]

class LiveTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            fetchAddr: this.props.fetchAddr,
        };
    }

    componentDidMount() {
        if (this.state.fetchAddr !== null) {
            console.log(this.state.fetchAddr);
            fetch(this.state.fetchAddr)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result.value,
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
        else {
            this.setState({
                isLoaded: true,
                renderItem: <p>No datasets selected</p>
            })
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Spinner animation="border" role="status"></Spinner>Loading...</div>;
        } else {
            return (
                <div style={{ height: '100%', width: '100%' }}>

                    <DataGrid autoHeight getRowId={(r) => r.Id} columns={columns} rows={items} pageSize={20} id="Id" rowsPerPageOptions={[500]} checkboxSelection />

                </div >
            );
        }
    }
}
export { LiveTable }