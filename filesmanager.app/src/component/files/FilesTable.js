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
import { getFiles, downloadFile } from '../../api/files/filesClient';
import IconButton from '@mui/material/IconButton';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import { DateTime } from "luxon";
import { downloadFileWithName } from "../../utils/filesHelper";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

    setTimeout(() => {
      fetchFiles();
    }, 800);
  }, []);

  const download = async ({ id, originalName }) => {
    const file = await downloadFile(id);
    downloadFileWithName(file, originalName);
  }

  const goToAdd = () => {
    history.push("/files/add");
  }

  if (files.length === 0) {
    return (<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
      <CircularProgress />
    </Box>)
  }

  return (
    <Container maxWidth="lg" component="main" style={{ marginTop: 20, minHeight: 400 }}>
      <Typography variant="h6" gutterBottom>
          File List
        </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Creation Date</StyledTableCell>
              <StyledTableCell>Download</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <StyledTableRow key={file.id}>
                <StyledTableCell component="th" scope="row">
                  {file.originalName}
                </StyledTableCell>
                <StyledTableCell>{file.description}</StyledTableCell>
                <StyledTableCell>{DateTime.fromISO(file.createdAt).toFormat('dd/MM/yyyy hh:mm a')}</StyledTableCell>
                <StyledTableCell>
                  <IconButton color="success" aria-label="Download file" component="label" onClick={() => download(file)}>
                    <CloudDownloadOutlinedIcon />
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