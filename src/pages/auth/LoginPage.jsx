import logo from '../../assets/logo/logo.png'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import styles from './styles.module.css'

export default function LoginPage() {
    const login = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // не даём форме перезагружать страницу

        try {
            // Замените на вашу логику проверки логина/пароля
            if (login.current.value === 'admin' && password.current.value === 'admin') {
                // Допустим, у нас "admin" — это пользователь с особыми привилегиями
                localStorage.setItem('user', 'admin');
                navigate('/levels');
            } else if (login.current.value === 'user' && password.current.value === 'user') {
                // Обычный пользователь
                localStorage.setItem('user', 'user');
                navigate('/levels');
            } else {
                // При неверных данных очищаем поля или даём ошибку
                alert('Неверный логин или пароль');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img className={styles.img} src={logo} alt="Logo"/>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input ref={login} type="text" placeholder="Login"/>
                    <input ref={password} type="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
