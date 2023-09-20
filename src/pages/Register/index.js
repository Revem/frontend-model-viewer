import { Button, FormControl, Link, Sheet, Typography } from "@mui/joy";
import { Card } from "@mui/material";
import { useContext, useState } from "react";
import Input from "../../components/Input";
import { Context } from "../../context/UserContext";

export default function Register() {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    //enviar usuário para o banco
    register(user)
  }

  return (
    <Sheet sx={{ display: 'flex', alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '25vh' }}>
      <Card variant="elevation" sx={{ display: 'flex-col', width: '20rem', padding: '1.2rem', justifyContent: 'center', alignContent: 'center' }}>
        <Typography level="h1">Criar Conta</Typography>
        <Typography level="h2" color="danger"></Typography>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Input label="Nome" id="name" variant="standard" type="text" onChange={handleChange} required />
            <Input label="E-mail" id="email" variant="standard" type="email" onChange={handleChange} required />
            <Input label="Senha" id="password" variant="standard" type="password" onChange={handleChange} required />
            <Input label="Confirmar Senha" id="confirmPassword" variant="standard" type="password" onChange={handleChange} required />
            <Button type="submit" sx={{ marginTop: '2rem' }}>Criar conta</Button>
          </FormControl>
        </form>
        <Typography sx={{ textAlign: 'center' }}><Link href="../login">Entrar em uma conta existente</Link></Typography>
      </Card>
    </Sheet >
  )
}