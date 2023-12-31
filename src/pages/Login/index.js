import { FormControl, Sheet, Typography } from "@mui/joy";
import { Card } from "@mui/material";
import { useContext, useState } from "react";
import Input from "../../components/Input";
import { Context } from "../../context/UserContext";

export default function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    //Realizar login
    login(user)
  }

  return (
    <Sheet sx={{ display: 'flex', alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '25vh', backgroundColor: 'white' }}>
      <Card variant="elevation" sx={{ display: 'flex-col', width: '20rem', padding: '1.2rem', justifyContent: 'center', alignContent: 'center' }}>
        <Typography level="h1">Fazer Login</Typography>
        <form onSubmit={handleSubmit} >
          <FormControl sx={{ padding: '5rem', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Input label="E-mail" id="email" variant="standard" type="email" onChange={handleChange} required />
            <Input label="Senha" id="password" variant="standard" type="password" onChange={handleChange} required />
            <button type="submit" className="text-xl mt-10 border-2 p-2 rounded-xl border-pink-600 text-pink-600 hover:text-white hover:bg-pink-600 transition-all duration-300">Entrar</button>
          </FormControl>
        </form>
        <Typography sx={{ textAlign: 'center' }}><a className="text-pink-600" href="../register">Criar conta</a></Typography>
      </Card>
    </Sheet >
  )
}