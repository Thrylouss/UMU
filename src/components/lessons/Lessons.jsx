import styles from './styles.module.css'
import {Link, useLocation, useParams} from "react-router-dom";
import loadEffect from "../../assets/loadEffects/loadEffects.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import LessonCard from "../lessonCard/LessonCard.jsx";

export default function Lessons() {
    const levelId = useLocation().state
    const { ieltsLevel } = useParams();
    const [lessons, setLessons] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://www.umumektebi.uz/api/levels/${levelId}/lessons`)
            .then((res) => {
                setLessons(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [levelId]); // Добавление зависимости на уровень

    if (loading) return <div className={loadEffect.cont}>
        <div className={loadEffect.hourglass}></div>
    </div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <Link to={`/levels`} className={styles.back}>&#60; Back</Link>
            <h1 className={styles.title}>{lessons.level} LESSONS</h1>
            <ul className={styles.list}>
                {lessons && lessons.lessons && lessons.lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} ieltsLevel={ieltsLevel}/>
                ))}
            </ul>
        </div>
    );
}
