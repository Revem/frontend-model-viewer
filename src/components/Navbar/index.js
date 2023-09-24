
import { AppBar, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";

import { Context } from "../../context/UserContext";

export default function Navbar() {

  const { authenticated, logout } = useContext(Context)

  return (

    <AppBar position="static" sx={{ background: 'white', borderBottom: '1.5px solid #e83c76' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'gray',
              textDecoration: 'none',
            }}
          >
            <span className="p-2">Model</span> <span className="border-2 rounded-xl border-violet-400 p-2"> Viewer</span>
          </Typography>
          <Typography textAlign='center'>
            <div className="flex ">
              <a href=".." className='text-pink-600 hover:text-blue-500'> <MenuItem >Inicio</MenuItem></a>
              {authenticated ? (<>
                <a href="../mymodels" variant="solid" className='text-zinc-400 hover:text-blue-500'><MenuItem >Meus modelos</MenuItem></a>
                <a href="/sendmodel" variant="solid" className='text-zinc-400 hover:text-blue-500'><MenuItem  >Enviar Arquivo GLB</MenuItem></a>
                <a onClick={logout} variant="solid" className='text-zinc-400 hover:text-pink-600'><MenuItem >Sair</MenuItem></a>
              </>) : (<><a href="/login" variant="solid" className='text-zinc-400 hover:text-blue-500'><MenuItem>Login</MenuItem></a> <a href="/register" variant="solid" className='text-zinc-400 hover:text-blue-500'><MenuItem>Criar Conta</MenuItem></a></>)
              }
            </div>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}