import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const AddFiles = () => {
  

  return (
    <Container maxWidth="lg" component="main" style={{ marginTop: 20, minHeight: 600 }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 1, mt: 1, width: '100ch' },

        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" gutterBottom>
          Updaload a New File
        </Typography>
        <div>
          <Button variant="outlined" component="label" style={{ width: 890 }}>
            <AttachFileIcon />
            Attach File...
            <input accept="*" multiple type="file" />
          </Button>
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
          />
        </div>
        <div>
          <Button variant="contained" endIcon={<SendIcon />} >
            Send
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default AddFiles;