import { Box, Typography, Pagination } from '@mui/material'
import React from 'react'
import { MetaData } from '../../models/pagination/Pagination';

interface props{
    metaData:MetaData,
    onPageChange:(page:number)=>void;

}
const AppPagination = ({metaData,onPageChange}:props) => {
    const {currentPage,totalCount,totalPages,pageSize}=metaData;
  return (
    <Box
    display={"flex"}
    justifyContent={"space-between"}
    alignItems={"center"}
  >
    <Typography>Displaying {(currentPage-1)*pageSize+1}
    -
    {currentPage*pageSize>totalCount?totalCount:currentPage*pageSize} of {totalCount} items</Typography>
    <Pagination size="large" count={totalPages} page={currentPage} onChange={(e,page)=>onPageChange(page)} color="primary" />
  </Box>
  )
}

export default AppPagination