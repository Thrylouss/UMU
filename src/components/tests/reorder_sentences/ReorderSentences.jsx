import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./styles.module.css";

export default function ReorderSentences({ lesson, setUserAnswers, results }) {
    const [questions, setQuestions] = useState(
        lesson.exercise.test.reorder_sentences.rows.map((row, index) => ({
            ...row,
            index, // Сохраняем индекс для уникального ключа
            shuffled: shuffleArray(row.reordered_sentence.split(" ")), // Перемешиваем слова
        }))
    );

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const handleOnDragEnd = (result, questionIndex) => {
        if (!result.destination) return; // Если слово не перенесли в новое место, ничего не делаем

        const updatedQuestions = [...questions];
        const reorderedWords = Array.from(updatedQuestions[questionIndex].shuffled);
        const [movedWord] = reorderedWords.splice(result.source.index, 1);
        reorderedWords.splice(result.destination.index, 0, movedWord);

        updatedQuestions[questionIndex].shuffled = reorderedWords;
        setQuestions(updatedQuestions);

        // Сохраняем текущий ответ пользователя в формате строки
        const userAnswer = reorderedWords.join(" ");
        const questionKey = `reorder_sentences-${questionIndex}`;
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: userAnswer,
        }));
        console.log(userAnswer);
    };

    return (
        <div className={styles.reorderContainer}>
            <h2 className={styles.sectionTitle}>H. Сөзлерди орны орнна коюп га'плерди дурслан</h2>
            {questions.map((question, index) => (
                <div key={index} className={styles.questionBlock}>
                    <DragDropContext
                        onDragEnd={(result) => handleOnDragEnd(result, index)}
                    >
                        <Droppable droppableId={`droppable-${index}`} direction="horizontal">
                            {(provided) => (
                                <div
                                    className={styles.droppableArea}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {question.shuffled.map((word, wordIndex) => (
                                        <Draggable
                                            key={`${index}-${wordIndex}`}
                                            draggableId={`${index}-${wordIndex}`}
                                            index={wordIndex}
                                        >
                                            {(provided) => (
                                                <span
                                                    className={styles.draggableWord}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {word}
                                                </span>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {results[`reorder_sentences-${index}`] !== undefined && (
                                        <span className={results[`reorder_sentences-${index}`] ? "correct" : "incorrect"}>
                                            {results[`reorder_sentences-${index}`] ? "✔" : "✘"}
                                        </span>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                </div>
            ))}
        </div>
    );
}
