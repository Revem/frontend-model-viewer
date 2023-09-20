import { Sheet, Typography } from '@mui/joy';
import { Card } from '@mui/material';
import Atenas from '../../assets/ae86.glb';


export default function Home() {

  return (
    <>
      <Sheet sx={{
        display: 'flex', alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '20vh'
      }}>

        <Card sx={{ width: '50%', }}>
          <Typography level='h1'>Página Inicial</Typography >
          <model-viewer
            style={{ width: '100%', height: '60vh' }}
            alt=""
            src={Atenas}
            ar
            shadow-intensity="1"
            camera-controls
            touch-action="pan-y"
          ></model-viewer>
        </Card>
      </Sheet >
    </>
  );
}

export const getServerSideProps = undefined;
