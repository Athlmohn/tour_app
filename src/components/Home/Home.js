import React,{useState,useEffect} from 'react'
import { getAllTourData } from '../../ApiService';
import Tour from '../Tours/Tour';
import Loader from '../Loader/Loader';
function Home() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);
    
    const removeTour = (id) =>{
       const newTours = tours?.filter((tours)=> tours.id !== id)
       setTours(newTours)
    }

    async function fetchTourData(){ 
        try{
            const response = await getAllTourData();
            setLoading(false)
            setTours(response);
        }
        catch(error){
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        setTimeout(()=>{
            fetchTourData();
        },1000)
    }, [])
    
  if (loading){
    return(
    <main>
        <Loader/>
    </main>
    )
  }

  return (
   <section>
    {
        tours?.length === 0 ?
    <>
    <main>
        <div className="title">
            <h2>No Tours Left</h2>
            <button className='btn' onClick={()=>fetchTourData()}>refresh</button>
        </div>
    </main>
    </> 
    :
    <>
    <div className="title">
        <h2>Tour Application</h2>
        <div className="underline"></div>
    </div>
    <div>
      
      {
 
      tours.map((tour)=>(
        <Tour  key={tour.id} {...tour} removeTour={removeTour}/>
      ))      
 
      }
    </div>
    </>
    }
   </section>
  );
};

export default Home