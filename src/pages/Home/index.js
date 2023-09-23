import { Button, Typography } from "@mui/joy";
import { Card } from "@mui/material";


export default function Home() {

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <section>
          <div className="offset-fix hero">
          </div>
          <div className="container">
            <div className="grid md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-1">
              <div id="w-node-ed84f8ac-e9da-208f-8d83-24b64ab6223c-50f4fa82" className="image-wrapper">
                <img src="https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero.png" loading="lazy" width="500" sizes="(max-width: 479px) 100vw, (max-width: 767px) 200px, (max-width: 991px) 249.99998474121094px, 499.9999694824219px" srcset="https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero-p-500.png 500w, https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero-p-800.png 800w, https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero-p-1080.png 1080w, https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero-p-1600.png 1600w, https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero-p-2000.png 2000w, https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/636bcc8f528dc702f24a7271_hero.png 2196w" alt="" className="image-9" />
              </div>
              <Card sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', flexDirection: 'column', padding: '5rem' }}>
                <div>
                  <Typography level='h1'>Visualize seus produtos e modelos em 3D e em Realidade Aumentada</Typography>
                </div>

                <div className="flex justify-between p-5 text-center">
                  <Button sx={{ width: '10rem' }}><a href="/register" className="button w-button">Criar Conta</a></Button>
                  <Button sx={{ width: '10rem' }}><a href="/login" className="button ghost w-button">Realizar Login</a></Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div >
    </>
  );
}

export const getServerSideProps = undefined;
