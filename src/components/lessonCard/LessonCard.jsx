import styles from './styles.module.css'
import start from "../../assets/start.png";
import {Link} from "react-router-dom";
import React from "react";
import pressAudio from "../../assets/audio/pressAudio.mp3";

export default function LessonCard({lesson, ieltsLevel}){
    const audio = React.useRef(new Audio(pressAudio))


    const playSound = () => {
        if (audio.current) {
            audio.current.currentTime = 0;
            audio.current.play();
        }
    };


    return (
        <>
            <Link onClick={playSound} to={`/levels/${ieltsLevel}/lessons/${lesson.order}`} className={styles.listItem} key={lesson.id}>
                <div className={styles.listItemHead}>
                    <img className={styles.img} src={start} alt=""/>
                    <h2>Lesson {lesson.order} </h2>
                </div>
                <div className={styles.listItemDesc}>
                    <p className={styles.listItemTitle}>{lesson.title}</p>
                    <p className={styles.lessonDesc}>{lesson.description}</p>
                </div>
            </Link>
        </>
    )
}