import { useState } from 'react';
import clear from '../images/clear.png';
import humidty from '../images/humidty.jpg';
import humidty3 from '../images/humidty3.jpg';
import wind from '../images/wind.jpg';
import drizzle from '../images/drizzle.png';
import cloud from '../images/cloud.png';
import mist from '../images/mist.png';

import Typewriter from 'typewriter-effect'


import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [data,setData] = useState({
        name:"Phillippines",
        temperature:28,
        humidity:62,
        wind:1.79,
        image:clear
    })

    const [name, setname] = useState('')
    const [error, setError] = useState('')

    


    const handleSearch = (n)=>{

        n.preventDefault()
       if(name !== ''){

        let imgPath = ''

        

        const apiURL = ` https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c185cebd9423b3726dc087550f664d1a&&units=metric `
        axios.get(apiURL).then((res)=>{
            console.log(res)

            if(res.data.weather[0].main === 'Clear'){
                imgPath = clear;
            }else if(res.data.weather[0].main === 'Clouds'){
                imgPath = cloud;
            }else if(res.data.weather[0].main === 'Drizzle'){
                imgPath = drizzle;
            }else if(res.data.weather[0].main === 'Mist'){
                imgPath = mist;
            }else{
                imgPath = clear;
            }

            setData({...data,
                name:res.data.name,
                temperature: res.data.main.temp,
                humidty: res.data.main.humidity,
                wind:res.data.wind.speed,
                image:imgPath
            })

            setError('')
        }).catch((err)=>{
            console.log(err)
            if(err.response.status === 404){
                setError('Invalid City or Country')
            }
        })


       }

    }


    return ( 
        <div className="container text-light py-5 rounded text-center">

            <h1 className='pb-5' style={{color: 'gold'}}>
                <Typewriter options={
                    {
                        loop: true,
                        delay: 50,
                        strings: 'My Weather App ☀️',
                        autoStart: true
                    }
                } />
            </h1>

            <div className="row  justify-content-center">

                <div className="col col-md-6 text-center justify-content-center">

                    <form className="d-flex ">

                        <input type="text" className="form-control rounded-5 text-center fw-bold border-warning border-4" placeholder="Enter Country or City" onChange={(n)=>{ setname(n.target.value)}}/>
                        <button className="btn btn-warning ms-3 rounded-5 align-items-center" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
                    </form>

                    {error && <h2 className='text-danger pt-2'>{error}</h2>}

                    <img src={data.image} className='img-fluid w-25 mt-5' alt="" />

                    <h1 className='text-warning'>{Math.floor(data.temperature)} °C</h1>
                    <h1>{data.name}</h1>

                    <div className="details d-flex align-content-center mt-5 fw-bold justify-content-between px-md-5">
                        <div className="humidty d-flex align-items-center">
                            {/* <img className='img-fluid w-25 rounded-4 text-light me-2' src={humidty3} alt="" /> */}
                            <h1 className='text-light'>💧</h1>
                            <div>
                                <p>{data.humidty}%</p>
                                <p>Humidty</p>
                            </div>
                            
                        </div>
                        <div className="humidty d-flex align-items-center">
                            {/* <img className='img-fluid w-25 rounded-4 me-2' src={wind} alt="" /> */}
                            <h1 className='text-light'>💨</h1>
                            <div>
                                <p>{data.wind} km/hr</p>
                                <p>Wind</p>
                            </div>
                            
                        </div>
                    </div>

                </div>

            </div>

        </div>
     );
}
 
export default Home;