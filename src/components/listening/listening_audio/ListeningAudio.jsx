import styles from "../styles.module.css";

export default function ListeningAudio({ audio }) {
    return (
        <div className={styles.audioContainer}>
            <h3 className={styles.sectionTitle}>Listen to the Audio</h3>
            {audio && audio.length > 0 ? (
                <audio controls>
                    <source src={audio[0]} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>No audio available.</p>
            )}
        </div>
    );
}
