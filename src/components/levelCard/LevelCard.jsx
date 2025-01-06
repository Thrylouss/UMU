import styles from './styles.module.css'
import {Link} from "react-router-dom";
import beginner from '../../assets/levels/begginer.png'
import elementary from '../../assets/levels/elementry.png'
import preInter from '../../assets/levels/pre-intermidite.png'
import inter from '../../assets/levels/intermidite.png'
import upperInter from '../../assets/levels/upper-intermidete.png'
import advanced from '../../assets/levels/Advanced.png'
import ielts from '../../assets/levels/IELTS.png'
import pressAudio from '../../assets/audio/pressAudio.mp3'
import {useRef} from "react";

// eslint-disable-next-line react/prop-types
export default function LevelCard({ level }) {

    const audio = useRef(new Audio(pressAudio))

    const getImg = () => {
        switch (level.level) {
            case 'A0':
                return beginner
            case 'A1':
                return elementary
            case 'A2':
                return preInter
            case 'B1':
                return inter
            case 'B2':
                return upperInter
            case 'multi':
                return advanced
            case 'IELTS':
                return ielts
            default:
                return beginner
        }
    }

    const playSound = () => {
        if (audio.current) {
            audio.current.play();
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.english}>
                    <img src={getImg()} alt=""/>
                    <h1>{level.level}</h1>
                </div>
                <h1 className={styles.ielts}>{level.title}</h1>
                <Link onClick={playSound} to={`/levels/${level.title}`} state={level.id} className={styles.btn}>ENTER</Link>
            </div>
        </>
    )
}