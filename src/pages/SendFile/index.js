import { Button, FormControl, Sheet, Typography } from "@mui/joy";
import { Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function SendFile() {

  const [token] = useState(localStorage.getItem('token') || '');
  const [model, setModel] = useState({ file: null });
  const [preview, setPreview] = useState();
  const Navigate = useNavigate()


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Navigate("/login");
    }
  }, []);

  function onFileChange(e) {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setModel({ ...model, file: e.target.files[0] });
  }

  function handleChange(e) {
    setModel({ ...model, [e.target.id]: e.target.value });
  }

  async function createModel(model) {
    try {
      const modelFormData = new FormData();

      modelFormData.append('file', model.file)
      modelFormData.append('name', model.name)

      const response = await api.post(`model/create`, modelFormData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    createModel(model);
  }

  return (
    <Sheet sx={{ display: 'flex', alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '25vh' }}>
      <Card variant="elevation" sx={{ display: 'flex-col', width: '50vh', padding: '1.2rem', justifyContent: 'center', alignContent: 'center' }}>
        <Typography level="h1">Enviar Modelo</Typography>
        <Typography level="h4" color="warning">Só serão aceitos modelos .glb</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <TextField onChange={handleChange} label="Nome" id="name" variant="standard" type="text" required sx={{ width: '8.5rem', marginLeft: '8vh' }} />
            <TextField onChange={onFileChange} id="file" type="file" variant="standard" inputProps={{ accept: ".glb" }} required sx={{ marginLeft: '8vh', width: '8.5rem' }} />
            <Button type="submit" sx={{ marginTop: '2rem', width: '8.5rem', marginLeft: '8vh' }}>Enviar Modelo</Button>
          </FormControl>
        </form>
      </Card>
    </Sheet>
  );
}
