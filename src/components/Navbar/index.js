
import { Link } from "@mui/joy";
import { AppBar, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";

import { Context } from "../../context/UserContext";

export default function Navbar() {

  const { authenticated, logout } = useContext(Context)

  return (

    <AppBar position="static">
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Model Viewer
          </Typography>
          <Typography textAlign='center'>
            <div>
              <Link href=".." variant="solid"> <MenuItem >Inicio</MenuItem></Link>
              {authenticated ? (<>
                <Link href="../mymodels" variant="solid"><MenuItem >Meus modelos</MenuItem></Link>
                <Link href="/sendmodel" variant="solid" ><MenuItem  >Enviar Arquivo GLB</MenuItem></Link>
                <Link onClick={logout} variant="solid" color="danger"><MenuItem >Sair</MenuItem></Link>
              </>) : (<><Link href="/login" variant="solid"><MenuItem>Login</MenuItem></Link> <Link href="/register" variant="solid" color="danger"><MenuItem>Criar Conta</MenuItem></Link></>)
              }
            </div>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}