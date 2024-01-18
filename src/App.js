import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useRowSelect } from 'react-table';
import Plot from 'react-plotly.js';
import TableComponent from './components/TableComponent';
import { EmployeeProvider, useEmployeeContext } from './context/EmployeeContext';

const App = () => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setFlag(true)
    }, 2000)
  })
  const { selectedItems, setSelectedItems, handleSelectionChange } = useEmployeeContext();


  const data = useMemo(
    () => [
      { id: 1, name: 'John', age: 25, salary: 500, bouns: 21, },
      { id: 2, name: 'Jane', age: 30, salary: 602, bouns: 22 },
      { id: 3, name: 'Doe', age: 22, salary: 451, bouns: 12 },
      { id: 4, name: 'Henna', age: 22, salary: 453, bouns: 12 },
      { id: 5, name: 'Isha', age: 22, salary: 451, bouns: 11 },
      { id: 6, name: 'Ronak', age: 22, salary: 454, bouns: 222 },
    ],
    []
  );

  useEffect(() => {
    handleSelectionChange(data?.slice(0, 5))
  }, [])

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Salary', accessor: 'salary' },
      { Header: 'bouns', accessor: 'bouns' },
    ],
    []
  );

  const chartData = [
    {
      x: selectedItems.map((row) => row.name),
      y: selectedItems.map((row) => row.age),
      type: 'bar',
      name: 'Age',
    },
    {
      x: selectedItems.map((row) => row.name),
      y: selectedItems.map((row) => row.salary),
      type: 'bar',
      name: 'salary',
    },
    {
      x: selectedItems.map((row) => row.name),
      y: selectedItems.map((row) => row.bouns),
      type: 'bar',
      name: 'bouns',
    },
  ];
  const layout = { barmode: 'group', title: 'Bar Chart' };

  return (
    <>
      <div>
        <Plot data={chartData} layout={layout} />
      </div>
      {
        flag && <TableComponent
          columns={columns}
          data={data}
        />
      }

    </>
  );
};

export default App;
