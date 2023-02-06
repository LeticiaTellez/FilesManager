import React, { useState } from 'react';
import { saveFile } from '../../api/files/filesClient';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useHistory, Link } from "react-router-dom";
import { getUserId } from "../../authRedirect";

const AddFiles = () => {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');

  const handleUpload = async () => {
    setUploading(true);
    const formData = getDataToSend();
    console.log(formData);

    try {
      const result = await saveFile(formData);
      if (result.status === "error") {
        //errorNotif(result.message);
        setUploading(false);
        return;
      }

      //successNotif("Archivo guardado", "El archivo ha sido guardado exitosamente");
      history.push("/files");
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const getDataToSend = () => {
    const formData = new FormData();
    const selectedFile = file[0];

    formData.append('file', selectedFile);
    formData.append('name', selectedFile.name);
    formData.append('userId', getUserId());
    formData.append('description', description);

    return formData;
  }

  const onChangeFile = (event) => {
    setFile(event.target.files);
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  }

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
        <Link to={'/files'} style={{
          textDecoration: 'none',
          color: '#1976d2',
          fontSize: 12
        }}>{'<< Back'}</Link>
        <Typography variant="h6" gutterBottom>
          Updaload a New File
        </Typography>
        <div>
          <Button variant="outlined" component="label" style={{ width: 890 }}>
            <AttachFileIcon />
            {file ? file[0].name : 'Attach File...'}
            <input hidden accept="*" type="file" onChange={onChangeFile} />
          </Button>
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            value={description}
            onChange={onChangeDescription}
            rows={4}
          />
        </div>
        <div>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpload}>
            {uploading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default AddFiles;