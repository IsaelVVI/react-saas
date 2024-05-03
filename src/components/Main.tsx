import { useState } from 'react'
import style from '../assets/css/first-section.module.css'
import axios from 'axios'

export const Main = () => {
    const [image, setImage] = useState("./images/response.png")
    const [hasimage, setHasImage] = useState(false)

    const [tempImage, setTempImage] = useState<File>()

    const getImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);


        if(!event.target.files || !event.target.files.length){
            return
        }

        const url_img = URL.createObjectURL(event.target.files[0])
        setImage(url_img)

        setTempImage(event.target.files[0])


        setHasImage(true)
    }
    

    const removeBgImage = async () => {
    
        const form = new FormData()

        if(!tempImage){
            return
        }

        // alert(tempImage.size)

        const dataTransfer = new DataTransfer()

        const reduce_img = await compressImage(tempImage,  {
            // 0: is maximum compression
            // 1: is no compression
            quality: 0.5,
            // We want a JPEG file
            type: "image/jpeg",
        })


        dataTransfer.items.add(reduce_img)

        // alert(dataTransfer.files[0].size)

        if(!reduce_img){
            return
        }

        form.append("file", dataTransfer.files[0])

       try {
        const {data} = await axios.post<{message: string, file: string}>("https://goremove.warezap.com/api/v1/removebg", form)
        
        console.log(data.file);
        
        setImage(`data:image/png;base64,${data.file}`)

       } catch (error) {
        console.log("error:", error);
        
       }
        
    }


    const compressImage = async (file: File, { quality = 1, type = file.type }) => {
        // Get as image data
        const imageBitmap = await createImageBitmap(file);
    
        // Draw to canvas
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.drawImage(imageBitmap, 0, 0);
    
        // Turn into Blob
        const blob: any = await new Promise((resolve) =>
            canvas.toBlob(resolve, type, quality)
        );
    
        // Turn Blob into File
        return new File([blob], file.name, {
            type: blob.type,
        });
    };



    return (
        <main>
            <section className={`d-flex flex-column align-items-center justify-content-center mt-5  ${style.title}`}>
                <h1>Sinta o poder da IA: <br /> Simplifique sua vida removendo fundos de imagens <br /> sem esforço.</h1>
                <p className={`mt-4 ${style.p}`}>Nosso software de remoção de fundo produz resultados 10 vezes mais rápido, <br /> com uma qualidade indistinguível do trabalho manual, graças ao seu histórico de processamento de imagens.</p>
                
                <div className={`mt-4 d-flex justify-content-around align-items-center ${style.waitlist}`}>
                    <input onChange={getImageInput} className="bg-dark d-none" type="file" id="floatingInput" placeholder="Selecionar uma imagem" />
                    {
                        !hasimage ? 
                        <label htmlFor='floatingInput' className={style.button}>
                            Selecionar Imagem
                        </label> :
                        <button onClick={removeBgImage} className={style.button}>
                            Remover Fundo
                        </button>
                    }
                </div>
            </section>
            <section className={`d-flex justify-content-center align-items-start ${style.objs}`}>
                <div className={`d-flex flex-column flex-lg-row align-items-center ${style.desc}`}>
                    <div className='d-flex align-items-center m-2'>
                        <img src="https://assets-global.website-files.com/65254e435ff7a913e2cbeac5/65258f659d08abe0b67ef69d_check.svg" loading="lazy" alt="" />
                        <span>Rápido. Preciso. Fácil.</span>
                    </div>
                    <div className='d-flex align-items-center m-2'>
                        <img src="https://assets-global.website-files.com/65254e435ff7a913e2cbeac5/65258f659d08abe0b67ef69d_check.svg" loading="lazy" alt="" />
                        <span>Eficiente. Automático. Profissional.</span>
                    </div>
                    <div className='d-flex align-items-center m-2'>
                        <img src="https://assets-global.website-files.com/65254e435ff7a913e2cbeac5/65258f659d08abe0b67ef69d_check.svg" loading="lazy" alt="" />
                        <span>Simples. Potente. Veloz.</span>
                    </div>
                </div>                
            </section>
            {/* imagem */}
            <section className={`d-flex justify-content-center align-items-center ${style.image}`}>
                <div className={style.shadow}>
                </div>
                <div className={style.shadowr}>
                </div>
                <img className='w-100 d-lg-none mt-4' src={image} alt="urso espacial" />
                <img className='d-none d-lg-block' height={700} src={image} alt="urso espacial" />
            </section>
            {/* preços */}
            <section className='mt-4 col-12 col-lg-7'>
                <div className="row mt-2 mb-4">
                    <h2 className={style.title_plan}>Conheça nossos planos</h2>
                </div>
                <div className={`row ${style.plans}`}>
                    <div className={`col-12 col-lg-4 ${style.plan_card}`}>
                        <div className={style.card_content}>
                            <div>
                                <h6>Plano</h6>
                                <h2>Básico+</h2>
                            </div>
                            <p className="card-text">Remova backgrounds de até 10 imagens por dia</p>
                            <div className='d-flex align-items-center'>
                                <h2>R$ 0,00/</h2>
                                <span>mês</span>
                            </div>
                            <button>
                                Criar conta
                            </button>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 ${style.plan_card}`}>
                        <div className={style.card_content}>
                            <div>
                                <h6>Plano</h6>
                                <h2>Comfort+</h2>
                            </div>
                            <p className="card-text">Remova backgrounds de até 40 imagens por dia e gere novos backgrounds com IA</p>
                            <div className='d-flex align-items-center'>
                                <h2>R$ 20,00/</h2>
                                <span>mês</span>
                            </div>
                            <button>
                                Criar conta
                            </button>
                            <div className='mt-4'>
                                <p>
                                    Plano mais escolhido
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 ${style.plan_card}`}>
                        <div className={style.card_content}>
                            <div>
                                <h6>Plano</h6>
                                <h2>Premium+</h2>
                            </div>
                            <p className="card-text">Remova backgrounds ilimitados e gere novos backgrounds com IA</p>
                            <div className='d-flex align-items-center'>
                                <h2>R$ 45,00/</h2>
                                <span>mês</span>
                            </div>
                            <button>
                                Criar conta
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Comentarios */}
            <section className={`mt-4 col-12 col-lg-7 ${style.comments}`}>
                <div className="row mt-2 mb-4">
                    <h3 className={style.title_plan}>Depoimentos</h3>
                </div>
                <div className={`row ${style.plans}`}>
                    <div className={`col-12 col-lg-4 ${style.plan_card}`}>
                        <div className={style.comment_content}>
                            <div className='d-flex align-items-center'>
                                <img className='mx-2' src="./images/joia.jpg" alt="pessoa"/>
                                <div>
                                    <p className='p-0 m-0'>Roberta Miranda</p>
                                    <div className='d-flex align-items-center'>
                                        {
                                            Array.from(Array(5)).map((_, index) => 
                                                <svg key={index} width="15" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 511.999 511.999">
                                                    <g>
                                                        <path d="m499.167 186.812-158.144-23.105-72.521-143.139c-2.7-5.1-8.103-7.502-13.503-7.502s-10.803 2.402-13.503 7.502l-70.522 143.14-158.142 23.104c-12.3 1.8-17.103 16.805-8.399 25.508l114.329 111.63-27.005 157.242c-2.103 12.304 10.799 21.607 21.905 15.905l141.337-74.421 143.338 74.421c11.107 6.002 24.007-3.601 21.905-15.905L393.238 323.95l114.329-111.63c8.703-8.704 3.9-23.708-8.4-25.508z" fill="#fedb41" data-original="#fedb41"></path><path d="M507.566 212.32 393.238 323.95l27.004 157.242c2.103 12.304-10.799 21.907-21.905 15.905l-143.338-74.421V13.066c5.399 0 10.803 2.402 13.503 7.502l72.523 143.14 158.144 23.105c12.298 1.799 17.101 16.803 8.397 25.507z" fill="#ffcc33" data-original="#ffcc33"></path>
                                                        </g>
                                                </svg>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="card-text mt-2">Este sistema é incrivelmente rápido e fácil, economizando tempo e proporcionando resultados profissionais em segundos.</p>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 ${style.plan_card}`}>
                        <div className={style.comment_content}>
                            <div className='d-flex align-items-center'>
                                <img className='mx-2' src="./images/alcione.jpeg" alt="pessoa"/>
                                <div>
                                    <p className='p-0 m-0'>Alcione Ferreira</p>
                                    <div className='d-flex align-items-center'>
                                        {
                                            Array.from(Array(5)).map((_, index) => 
                                                <svg key={index} width="15" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 511.999 511.999">
                                                    <g>
                                                        <path d="m499.167 186.812-158.144-23.105-72.521-143.139c-2.7-5.1-8.103-7.502-13.503-7.502s-10.803 2.402-13.503 7.502l-70.522 143.14-158.142 23.104c-12.3 1.8-17.103 16.805-8.399 25.508l114.329 111.63-27.005 157.242c-2.103 12.304 10.799 21.607 21.905 15.905l141.337-74.421 143.338 74.421c11.107 6.002 24.007-3.601 21.905-15.905L393.238 323.95l114.329-111.63c8.703-8.704 3.9-23.708-8.4-25.508z" fill="#fedb41" data-original="#fedb41"></path><path d="M507.566 212.32 393.238 323.95l27.004 157.242c2.103 12.304-10.799 21.907-21.905 15.905l-143.338-74.421V13.066c5.399 0 10.803 2.402 13.503 7.502l72.523 143.14 158.144 23.105c12.298 1.799 17.101 16.803 8.397 25.507z" fill="#ffcc33" data-original="#ffcc33"></path>
                                                        </g>
                                                </svg>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="card-text mt-2">A interface intuitiva e a precisão impressionante tornam este sistema uma verdadeira revolução na remoção de fundo de imagens.</p>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 ${style.plan_card}`}>
                        <div className={style.comment_content}>
                            <div className='d-flex align-items-center'>
                                <img className='mx-2' src="./images/anne.jpeg" alt="pessoa"/>
                                <div>
                                    <p className='p-0 m-0'>Anne Hathaway</p>
                                    <div className='d-flex align-items-center'>
                                        {
                                            Array.from(Array(5)).map((_, index) => 
                                                <svg key={index} width="15" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 511.999 511.999">
                                                    <g>
                                                        <path d="m499.167 186.812-158.144-23.105-72.521-143.139c-2.7-5.1-8.103-7.502-13.503-7.502s-10.803 2.402-13.503 7.502l-70.522 143.14-158.142 23.104c-12.3 1.8-17.103 16.805-8.399 25.508l114.329 111.63-27.005 157.242c-2.103 12.304 10.799 21.607 21.905 15.905l141.337-74.421 143.338 74.421c11.107 6.002 24.007-3.601 21.905-15.905L393.238 323.95l114.329-111.63c8.703-8.704 3.9-23.708-8.4-25.508z" fill="#fedb41" data-original="#fedb41"></path><path d="M507.566 212.32 393.238 323.95l27.004 157.242c2.103 12.304-10.799 21.907-21.905 15.905l-143.338-74.421V13.066c5.399 0 10.803 2.402 13.503 7.502l72.523 143.14 158.144 23.105c12.298 1.799 17.101 16.803 8.397 25.507z" fill="#ffcc33" data-original="#ffcc33"></path>
                                                        </g>
                                                </svg>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="card-text mt-2">
                                Finalmente uma solução eficiente! Este sistema proporciona resultados precisos em minutos, graças à sua tecnologia avançada de inteligência artificial.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}