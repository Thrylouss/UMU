import styles from "./styles.module.css";
import microphone from '../../assets/icons/microphone-solid-24.png';
import stop from '../../assets/icons/stop-regular-24.png';
import submit from '../../assets/icons/check-regular-24.png';
import clear from '../../assets/icons/x-regular-24.png';
import 'regenerator-runtime/runtime'
import { useState, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function SpeakingSection({ speakingData }) {
    const [audioBlob, setAudioBlob] = useState(null);
    const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const audioPlayerRef = useRef(null);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    const handleStopRecording = (blobUrl, blob) => {
        setAudioBlob(blob);
        setMediaBlobUrl(blobUrl);
        setIsRecording(false);
        SpeechRecognition.stopListening();
    };

    const handleStartRecording = (startRecording) => {
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
        startRecording();
    };

    const handleStopClick = (stopRecording) => {
        setIsRecording(false);
        stopRecording();
    };

    const handleSubmit = () => {
        if (!audioBlob) return alert("No audio recorded to submit!");

        const formData = new FormData();
        formData.append("audio", audioBlob);
        formData.append("text", transcript);

        fetch("/api/submit-audio", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) alert("Audio submitted successfully!");
                else alert("Failed to submit audio.");
            })
            .catch((error) => {
                console.error("Error submitting audio:", error);
                alert("Error submitting audio.");
            });
    };

    const handleClear = () => {
        resetTranscript();
        setAudioBlob(null);
        setMediaBlobUrl(null);
    };

    return (
        <div className={styles.speakingSection}>
            <div className={styles.dialogue}>
                {speakingData.speaking_text.split("\r\n").map((line, index) => (
                    <p key={index} className={line.startsWith("A:") ? styles.speakerA : styles.speakerB}>
                        {line}
                    </p>
                ))}
            </div>

            <ReactMediaRecorder
                audio
                onStop={handleStopRecording}
                render={({ startRecording, stopRecording }) => (
                    <div className={styles.audioControls}>
                        {!isRecording && !audioBlob && (
                            <img
                                src={microphone}
                                alt="Start Recording"
                                onClick={() => handleStartRecording(startRecording)}
                                className={`${styles.icon} ${styles.microphoneIcon} ${isRecording ? styles.recording : ""}`}
                            />
                        )}

                        {isRecording && (
                            <img
                                src={stop}
                                alt="Stop Recording"
                                onClick={() => handleStopClick(stopRecording)}
                                className={styles.icon}
                            />
                        )}

                        {audioBlob && !isRecording && (
                            <div className={styles.actionButtons}>
                                <img
                                    src={clear}
                                    alt="Clear All"
                                    onClick={handleClear}
                                    className={styles.icon}
                                />
                                <img
                                    src={submit}
                                    alt="Submit Audio"
                                    onClick={handleSubmit}
                                    className={styles.icon}
                                />
                            </div>
                        )}
                    </div>
                )}
            />

            {mediaBlobUrl && (
                <audio
                    ref={audioPlayerRef}
                    controls
                    src={mediaBlobUrl}
                    className={styles.audioPlayer}
                />
            )}

            {transcript && (
                <div className={styles.recordedText}>
                    <h4>Recorded Text:</h4>
                    <textarea
                        value={transcript}
                        readOnly
                        rows={4}
                        className={styles.textArea}
                    ></textarea>
                </div>
            )}
        </div>
    );
}
