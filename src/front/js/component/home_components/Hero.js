import React from 'react'

const Hero = () => {
    return (
        <>
            <div id='hero-body' className="flex justify-center items-center mt-8">

                <div>
                    <img className='mr-8' src="https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_two.svg" alt="Girl in a jacket" margin-left="800px" width="500" height="600" />
                </div>

                <div id='hero' className='d-flex flex-column'  >
                    <h1 className='text-5xl'><strong>! La forma mas divertida y efectiva de aprender ingles!</strong></h1>
                    <button id='boton-hero' type="button" className="btn btn-primary text-center"><strong>Empieza ahora!</strong></button>
                    <button id='boton-hero2' type="button" class="btn btn-primary text-center"><strong>Ya tengo cuenta</strong></button>
                </div>


            </div>



        </>
    )
}

export default Hero