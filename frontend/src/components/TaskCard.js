import React from "react";

export default function TaskCard({ day, index, onClick, progress, selected }) {
  return (
    <div className={`day-card ${selected ? "active" : ""}`} onClick={onClick}>
      <div className="day-card-header">
        <div className="day-title"><strong>{day.day} День</strong> - {day.title}</div>
      </div>

      <div className="day-meta">
        <div>{day.tasks.length} заданий</div>
        <div className="progress-meta">
          <div className="progress-percent">{progress}%</div>
          <div className="progress-bar-small">
            <div className="progress-fill-small" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Mobile inline tasks: видим внутри карточки, если она выбрана (mobile-only) */}
      {selected && (
        <div className="day-tasks mobile-only">
          {day.tasks.map((task, idx) => (
            <div className="task-item" key={idx}>
              <div className="task-question">{task.question}</div>
              <div className="task-row">
                <input className="answer-input" placeholder="Введите ответ" />
                <button className="check-btn">Проверить</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
