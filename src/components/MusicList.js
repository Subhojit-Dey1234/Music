import React, { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer'
import '../css/player.css'
import axios from 'axios'
//background: linear-gradient(45deg, rgba(29,45,253,1) 0%, rgba(252,69,119,1) 100%);
//"linear-gradient(45deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)"
//background: linear-gradient(45deg, rgba(1,193,0,1) 0%, rgba(242,252,69,1) 100%);

const background = [
    "linear-gradient(45deg, rgba(29,45,253,1) 0%, rgba(252,69,119,1) 100%)",
    "linear-gradient(45deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
    "linear-gradient(45deg, rgba(1,193,0,1) 0%, rgba(242,252,69,1) 100%)"
]

export default function MusicList(props) {

    const [ song,setSong ] = React.useState(null)
	const [ play,setPlay ] = React.useState(true)
    const [ id,setid ] = useState(null)

    const [ list,setList ] = useState(null)
    // const [index,setIndex] = useState(0)
    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/songs/list-artist-top-tracks',
            params: {id: '40008598', locale: 'en-US'},
            headers: {
              'x-rapidapi-host': 'shazam.p.rapidapi.com',
              'x-rapidapi-key': '304675b686msh91c199ed67e8c8ap1f1bbfjsnfd3153b540ee'
            }
          };
        
        axios.request(options).then(function (response) {
            console.log(response.data);

            setList(response.data.tracks)
        }).catch(function (error) {
            console.error(error);
        });
    },[])

    // let index = 0;

    if(!list){
        return <h2>Loading!</h2>
    }
    return (
        <div>
            <MusicPlayer url={song} play={play} id={id}/>
        <div className="music-list">
            {list.map((li,index)=>
            <div className="music" style={{background: background[(index % 3)],color:"white"}} onClick={()=>{
                setSong(li.hub.actions[1].uri)
                setPlay(!play)
                setid(true)
            }}>
                <p style={{display:"none"}}>{index = (index + 1)%3}</p>
                <div className="list-container" style={{marginTop:"25%",marginRight:"10%",marginLeft:"10%"}}>
               <h6 className="list-name" style={{textAlign:"center",fontSize:"15px",marginLeft:"12px",marginRight:"10px",textTransform:"capitalize"}}>{li.title}</h6>
               <p style={{textAlign:"center",fontSize:"12px"}}>By - {li.subtitle}</p>
               </div>
            </div>
            
            )}
        </div>
        </div>
    )
}
