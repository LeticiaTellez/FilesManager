import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { getFiles } from '../../api/files/filesClient';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#f8f9fb",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [files, setFiles] = useState([]);
  const history = useHistory();

  const buttonPosition = {
    position: 'absolute',
    bottom: 100,
    right: 50,
  }

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles();
      setFiles(files);
    }

    fetchFiles();
  }, []);

  const onClickDownload = fileId => {
    console.log(fileId);
  }

  const goToAdd = () => {
    history.push("/files/add");
  }

  return (
    <Container maxWidth="lg" component="main" style={{ marginTop: 20, minHeight: 600 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell>File Type</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Creation Date</StyledTableCell>
              <StyledTableCell>Download</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <StyledTableRow key={file.id}>
                <StyledTableCell component="th" scope="row">
                  {file.fileName}
                </StyledTableCell>
                <StyledTableCell>{file.fileType}</StyledTableCell>
                <StyledTableCell>{file.description}</StyledTableCell>
                <StyledTableCell>{file.createdAt}</StyledTableCell>
                <StyledTableCell>
                  <IconButton color="success" aria-label="Download file" component="label" onClick={() => onClickDownload(file.id)}>
                    <CloudDownloadIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab sx={buttonPosition} color="primary" aria-label="add" onClick={goToAdd}>
        <AddIcon />
      </Fab>
    </Container>
  );
}