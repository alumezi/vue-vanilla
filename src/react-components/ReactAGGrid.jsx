import React, { useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { useReactPerformanceMeasure } from '../utils/performanceUtils';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function ReactAGGrid() {
  const [renderTime, setRenderTime] = useState(null);
  const { startMeasure } = useReactPerformanceMeasure('react');

  // Generate 100,000 rows of data
  const rowData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 100000; i++) {
      data.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        age: Math.floor(Math.random() * 50) + 18,
        department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
        salary: Math.floor(Math.random() * 100000) + 30000,
        status: Math.random() > 0.5 ? 'Active' : 'Inactive',
        joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0]
      });
    }
    return data;
  }, []);

  // Column definitions
  const columnDefs = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 80, sortable: true, filter: true },
    { field: 'name', headerName: 'Name', width: 150, sortable: true, filter: true },
    { field: 'email', headerName: 'Email', width: 200, sortable: true, filter: true },
    { field: 'age', headerName: 'Age', width: 100, sortable: true, filter: true },
    { field: 'department', headerName: 'Department', width: 150, sortable: true, filter: true },
    { field: 'salary', headerName: 'Salary', width: 120, sortable: true, filter: true, valueFormatter: (params) => `$${params.value.toLocaleString()}` },
    { field: 'status', headerName: 'Status', width: 100, sortable: true, filter: true },
    { field: 'joinDate', headerName: 'Join Date', width: 120, sortable: true, filter: true }
  ], []);

  // Default column definition
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true
  }), []);

  useEffect(() => {
    const endMeasure = startMeasure();
    // Use setTimeout to measure after DOM is fully rendered
    setTimeout(() => {
      setRenderTime(endMeasure());
    }, 0);
  }, []);

  return (
    <div style={{
      margin: '20px 0',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      backgroundColor: '#fafafa'
    }}>
      <h4 style={{
        color: '#42b883',
        margin: '0 0 10px 0',
        fontSize: '1.1em'
      }}>
        React AG Grid Component (100,000 Rows)
      </h4>
      <p>This component renders 100,000 rows using AG Grid for performance testing</p>
      {renderTime && (
        <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '10px' }}>
          Last render time: {renderTime.toFixed(2)}ms
        </p>
      )}
      
      <div 
        className="ag-theme-alpine"
        style={{
          height: '400px',
          width: '100%',
          border: '1px solid #eee',
          borderRadius: '4px'
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={50}
          rowSelection="single"
          animateRows={true}
          suppressRowClickSelection={true}
          domLayout="normal"
        />
      </div>
    </div>
  );
}

export default ReactAGGrid; 