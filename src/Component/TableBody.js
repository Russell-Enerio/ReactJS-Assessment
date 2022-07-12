import React from 'react'
import {Link} from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material'
import '../assets/css/TableBody.css'


function TableBodyComponent({tableData, handleDelete, handleUpdate}) {
  console.log(tableData)
  return (
    <div className="table__container">
        <TableContainer component={Paper} sx={{maxHeight : '300px'}}>
          <Table aria-label='customized-table' stickyHeader>
              <TableHead style={{ backgroundColor: 'blue' }}>
                  <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell align='center'>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align='center'>Email</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell></TableCell>

                  </TableRow>
              </TableHead>
              <TableBody>
                    {tableData.length === 0 ? (
                        <>
                            <h2 className="no__data">No Data Found</h2>
                        </>

                    ) : (

                        <>
                            {tableData.map((listdata, idx) => (
                    
                                    <TableRow key={listdata.key} sx={{'&:last-child td, &:last-child th': { border: 0 } }}>
                                    
                                    {/* <TableRow key={listdata.id}> */}
                                        <TableCell>{idx+1}</TableCell>
                                        <TableCell align='center'>{listdata.key}</TableCell>
                                        <TableCell>{listdata.name}</TableCell>
                                        <TableCell align='center'>{listdata.email}</TableCell>
                                        <TableCell>{listdata.number}</TableCell>
                                        
                                        <TableCell>
                                            <button className="table-buttons view" >
                                                <Link to={`/contact-list/${listdata.key}`} >
                                                    <VisibilityIcon/>
                                                </Link>
                                            </button>
                                            <button className="table-buttons update" onClick={()=> handleUpdate(listdata)}>
                                                    <EditIcon/>
                                            </button>
                                            <button className="table-buttons delete" onClick={()=> handleDelete(listdata)}>
                                                    <DeleteIcon/>
                                            </button>
                                        </TableCell>
                                                            
                                    </TableRow>
                            ))}
                        </>

                    ) }


                  
              </TableBody>
          </Table>
        </TableContainer>
    </div>  
  )
}

export default TableBodyComponent
