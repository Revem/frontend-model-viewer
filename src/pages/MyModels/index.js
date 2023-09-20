import { Button, Card, Grid, Sheet, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function MyModels() {
  const [models, setModels] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const Navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Navigate("/login");
    } else {
      api.get('/model/mymodels', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
        .then((response) => {
          setModels(response.data.models)
        })
    }
  }, [token])

  async function removeModel(id) {
    const data = api.delete(`/model/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      const updatedModels = models.filter((model) => model.id != id)
      setModels(updatedModels)
      console.log(response.data)
    }).catch((err) => console.log(err))

  }

  return (
    <Sheet>
      <Typography level="h1">Meus Modelos</Typography>
      <Card sx={{ marginTop: '5rem', padding: '0rem', alignContent: 'center', marginLeft: { xs: '15vw', s: '10vw', md: '0' } }}>
        <Grid
          container
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'start', md: "center" }}
          justify="center"
        >

          {models.length > 0 && models.map((model) => (
            <Grid item xs={2} key={model.id}>
              <Card sx={{ width: { xs: '20vh', md: '40vh' }, height: '50vh' }}>
                <Typography level="h4">{model.name}</Typography>
                <model-viewer
                  style={{ width: '100%', height: '100%' }}
                  alt={model.name}
                  src={`http://localhost:5000/models/${model.glb}`}
                  ar
                  shadow-intensity="1"
                  camera-controls
                  touch-action="pan-y"
                ></model-viewer>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button color="warning">Editar</Button>
                  <Button color="danger" onClick={() => removeModel(model.id)}>Excluir</Button>
                </div>
              </Card>
            </Grid>
          ))}
          {models.length === 0 && <Typography level="h1"> Você não possui nenhum modelo</Typography>}


        </Grid>
      </Card>
    </Sheet >
  )
}