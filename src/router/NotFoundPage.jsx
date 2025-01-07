import React from "react";
import { Link } from "react-router-dom"; // Если нужно вернуться с помощью роутинга
import styles from './notFound.module.css'

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.notFoundTitle}>404</h1>
            <p className={styles.notFoundText}>
                К сожалению, запрошенная страница не найдена.
            </p>
            <Link to="/" className={styles.notFoundLink}>
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFoundPage;
