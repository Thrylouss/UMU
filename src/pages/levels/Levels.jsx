import styles from './styles.module.css'
import LevelCard from "../../components/levelCard/LevelCard.jsx";
import logo from '../../assets/logo/logo.png'
import {useEffect, useState} from "react";
import axios from "axios";

export default function Levels(){
    const [levels, setLevels] = useState([])

    useEffect(() => {
        axios.get('https://www.umumektebi.uz/api/levels')
            .then((res) => {
                setLevels(res.data)
            })
    }, []);



    return (
        <>
           <div className={styles.container}>
               <img className={styles.logo} src={logo} alt=""/>
               {levels && levels.map(
                   (level) => <LevelCard key={level.id} level={level}/>
               )}
           </div>
        </>
    )
}