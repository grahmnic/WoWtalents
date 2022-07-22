import React from 'react';
import { useTable } from 'react-table';

interface IPostTable {
    data: IPost[];
}

interface IPost {
    title: string;
    slug: string;
    primaryTopic: string;
    publishedAt: Date;
    createdAt: Date;
}

const PostsTable = (props: IPostTable) => {
    const { data } = props;

    const tableData = React.useMemo(
        () => data, []
    );

    const columns = React.useMemo(
        () => [
            {
            Header: 'Title',
            accessor: 'title',
            },
            {
            Header: 'Slug',
            accessor: 'slug',
            },
            {
            Header: 'Primary Topic',
            accessor: 'primaryTopic',
            },
            {
            Header: 'Date Published',
            accessor: 'publishedAt',
            },
            {
            Header: 'Date Created',
            accessor: 'createdAt',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData })

    return (
<table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
    )
}

export default PostsTable;