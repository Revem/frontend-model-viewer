import { Button, Card, Modal, Sheet, Typography } from "@mui/joy";
import { Box, TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyModels() {
  const [models, setModels] = useState([])
  const [open, setOpen] = useState(false)
  const [openVisual, setOpenVisual] = useState(false)
  const [modelToVisualize, setModelToVisualize] = useState({});
  const [model, setModel] = useState({ file: null });
  const [token] = useState(localStorage.getItem('token') || '')
  const Navigate = useNavigate()

  const handleClose = () => setOpen(false);
  const handleCloseVisual = () => setOpenVisual(false);

  function onFileChange(e) {
    setModel({ ...model, file: e.target.files[0] });
  }

  function handleChange(e) {
    setModel({ ...model, [e.target.id]: e.target.value });
  }

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

  function onVisual(model) {
    setModelToVisualize(model)
    setOpenVisual(true)
  }

  function onEdit(id) {
    const data = api.get(`/model/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setOpen(true)
      setModel({ id: id })
    })
  }

  async function editModel(model) {
    try {
      const modelFormData = new FormData();

      modelFormData.append('file', model.file)
      modelFormData.append('name', model.name)

      const response = await api.patch(`model/${model.id} `, modelFormData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      console.log(model)
      console.error(error);
    }
  }

  function handleSubmit(e) {
    handleClose()
    console.log(model)
    editModel(model);
    window.location.reload(false);
  }

  return (
    <Sheet sx={{ backgroundColor: 'white', paddingLeft: '10rem', paddingRight: '10rem', paddingTop: '3rem' }}>
      <Card sx={{ padding: '5rem', alignContent: 'center', marginLeft: { xs: '15vw', s: '10vw', md: '0' } }}>
        <Typography level="h1">Meus Modelos</Typography>
        <div className="grid grid-cols-4">
          {models.length > 0 && models.map((model) => (
            <div className="p-5" key={model.id}>
              <Card sx={{ width: '15rem', textAlign: 'center' }}>
                <Typography level="h4">{model.name}</Typography>
                <Button color="primary" onClick={() => onVisual(model)} >Visualizar</Button>
                <Modal
                  open={openVisual}
                  onClose={handleCloseVisual}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Visualizando {modelToVisualize.name}
                    </Typography>
                    <div className="w-96 h-96">
                      <model-viewer
                        style={{ width: '100%', height: '100%' }}
                        src={`http://localhost:5000/models/${modelToVisualize.glb}`}
                        ar
                        shadow-intensity="1"
                        camera-controls
                        touch-action="pan-y"
                      ></model-viewer>
                      <Button color="danger" onClick={() => handleCloseVisual()}>Fechar</Button>
                    </div>
                  </Box>
                </Modal>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button color="warning" onClick={() => onEdit(model.id)}>Editar</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar Modelo
                      </Typography>
                      <div>
                        <TextField onChange={handleChange} label="Nome" id="name" variant="standard" type="text" required sx={{ width: '8.5rem' }} />
                      </div>
                      <div>
                        <TextField onChange={onFileChange} id="file" type="file" variant="standard" inputProps={{ accept: ".glb" }} required sx={{ width: '8.5rem' }} />
                      </div>
                      <div style={{ marginTop: '2rem', justifyContent: 'space-around', display: 'flex' }}>
                        <Button color="warning" onClick={() => handleSubmit()} >Salvar</Button>
                        <Button color="danger" onClick={() => handleClose()}>Cancelar</Button>
                      </div>
                    </Box>
                  </Modal>
                  <Button color="danger" onClick={() => removeModel(model.id)}>Excluir</Button>
                </div>
              </Card>
            </div>
          ))}
          {models.length === 0 && <Typography level="h1"> Você não possui nenhum modelo</Typography>}


        </div>
      </Card>
    </Sheet >
  )
}