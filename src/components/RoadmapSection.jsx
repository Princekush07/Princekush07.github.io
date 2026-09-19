import { useMemo, useState } from "react";
import {
  DAILY_BLOCKS,
  ORDERED_BLOCKS,
  roadmapMeta,
  SALARY_NOTES,
  SKILL_PILLARS,
  TARGET_ROLES,
  WEEKS,
} from "../data/roadmap.js";
import { useRoadmapProgress } from "../hooks/useRoadmapProgress.js";

export default function RoadmapSection() {
  const {
    completed,
    strictBlocking,
    setStrictBlocking,
    toggleBlock,
    resetProgress,
    exportProgress,
    importProgress,
    stats,
    orderedKeys,
    allDays,
    isDayUnlocked,
    isDayComplete,
    isBlockUnlocked,
  } = useRoadmapProgress();

  const [weekId, setWeekId] = useState("w1");
  const [dayId, setDayId] = useState("w1d1");

  const week = WEEKS.find((w) => w.id === weekId) ?? WEEKS[0];
  const day = week.days.find((d) => d.id === dayId) ?? week.days[0];
  const dayMeta = allDays.find((d) => d.id === day.id);

  const weekProgress = useMemo(() => {
    let done = 0;
    week.days.forEach((d) => {
      if (isDayComplete(d.id)) done += 1;
    });
    return { done, total: week.days.length };
  }, [week, isDayComplete]);

  const handleWeekChange = (id) => {
    setWeekId(id);
    const w = WEEKS.find((x) => x.id === id);
    if (w?.days[0]) setDayId(w.days[0].id);
  };

  return (
    <section id="roadmap" className="section roadmap" data-reveal>
      <div className="section__head">
        <p className="section__index">03 · Roadmap</p>
        <h2>{roadmapMeta.title}</h2>
        <p className="roadmap__intro">{roadmapMeta.subtitle}</p>
      </div>

      <div className="roadmap__stats">
        <article className="roadmap-stat">
          <p className="roadmap-stat__value">{stats.percent}%</p>
          <p className="roadmap-stat__label">Overall progress</p>
        </article>
        <article className="roadmap-stat">
          <p className="roadmap-stat__value">{stats.daysDone}/{stats.totalDays}</p>
          <p className="roadmap-stat__label">Days completed</p>
        </article>
        <article className="roadmap-stat">
          <p className="roadmap-stat__value">{roadmapMeta.deadline}</p>
          <p className="roadmap-stat__label">Target deadline</p>
        </article>
        <article className="roadmap-stat">
          <p className="roadmap-stat__value">{roadmapMeta.ctcGoal}</p>
          <p className="roadmap-stat__label">Package goal</p>
        </article>
      </div>

      <div className="roadmap__progress" role="progressbar" aria-valuenow={stats.percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="roadmap__progress-fill" style={{ width: `${stats.percent}%` }} />
      </div>

      <div className="roadmap-toolbar">
        <label className="roadmap-toggle">
          <input
            type="checkbox"
            checked={strictBlocking}
            onChange={(e) => setStrictBlocking(e.target.checked)}
          />
          <span>Strict mode — unlock days &amp; blocks in order</span>
        </label>
        <div className="roadmap-toolbar__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={exportProgress}>
            Export progress
          </button>
          <label className="btn btn--ghost btn--sm roadmap-import">
            Import
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => e.target.files?.[0] && importProgress(e.target.files[0])}
            />
          </label>
          <button type="button" className="btn btn--ghost btn--sm" onClick={resetProgress}>
            Reset
          </button>
        </div>
      </div>

      <p className="roadmap__saved">
        Progress auto-saves in <code>localStorage</code> on this browser. Use Export before switching devices.
      </p>

      <div className="roadmap-grid">
        <aside className="roadmap-sidebar">
          <h3 className="roadmap-sidebar__title">Program schedule</h3>
          <p className="roadmap-sidebar__meta">{roadmapMeta.dailyHours}</p>
          <table className="roadmap-schedule">
            <thead>
              <tr>
                <th>Block</th>
                <th>Hrs</th>
              </tr>
            </thead>
            <tbody>
              {DAILY_BLOCKS.map((b) => (
                <tr key={b.key}>
                  <td>{b.label}</td>
                  <td>{b.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="roadmap-sidebar__title">Weeks</h3>
          <ul className="roadmap-week-list">
            {WEEKS.map((w) => {
              const wDone = w.days.filter((d) => isDayComplete(d.id)).length;
              return (
                <li key={w.id}>
                  <button
                    type="button"
                    className={`roadmap-week-btn ${weekId === w.id ? "roadmap-week-btn--active" : ""}`}
                    onClick={() => handleWeekChange(w.id)}
                  >
                    <span className="roadmap-week-btn__label">{w.title.split("—")[0].trim()}</span>
                    <span className="roadmap-week-btn__meta">{wDone}/{w.days.length} days</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="roadmap-main">
          <header className="roadmap-day-header">
            <div>
              <p className="roadmap-day-header__dates">{week.dates}</p>
              <h3>{week.title}</h3>
              <p className="roadmap-day-header__outcome">{week.outcome}</p>
            </div>
            <p className="roadmap-day-header__week-pct">
              Week {weekProgress.done}/{weekProgress.total} days
            </p>
          </header>

          <div className="roadmap-day-tabs" role="tablist" aria-label="Days in week">
            {week.days.map((d) => {
              const meta = allDays.find((x) => x.id === d.id);
              const unlocked = meta ? isDayUnlocked(meta.globalIndex) : false;
              const complete = isDayComplete(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={dayId === d.id}
                  disabled={strictBlocking && !unlocked}
                  className={`roadmap-day-tab ${dayId === d.id ? "roadmap-day-tab--active" : ""} ${complete ? "roadmap-day-tab--done" : ""} ${!unlocked && strictBlocking ? "roadmap-day-tab--locked" : ""}`}
                  onClick={() => setDayId(d.id)}
                  title={!unlocked && strictBlocking ? "Complete the previous day first" : undefined}
                >
                  {!unlocked && strictBlocking ? "Locked · " : ""}
                  {d.label.split("—")[0].trim()}
                </button>
              );
            })}
          </div>

          {dayMeta && strictBlocking && !isDayUnlocked(dayMeta.globalIndex) ? (
            <div className="roadmap-locked-panel">
              <h4>Day locked</h4>
              <p>Finish every block on the previous day to unlock this plan, or turn off strict mode above.</p>
            </div>
          ) : (
            <>
              <h4 className="roadmap-checklist-title">Daily checklist — complete blocks in order</h4>
              <ul className="roadmap-checklist">
                {ORDERED_BLOCKS.map((block, index) => {
                  const id = `${day.id}:${block.key}`;
                  const checked = Boolean(completed[id]);
                  const unlocked = isBlockUnlocked(day.id, block.key);
                  const blocked = strictBlocking && !unlocked && !checked;
                  return (
                    <li
                      key={block.key}
                      className={`roadmap-check ${checked ? "roadmap-check--done" : ""} ${blocked ? "roadmap-check--blocked" : ""}`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={blocked}
                          onChange={() => toggleBlock(day.id, block.key)}
                        />
                        <span className="roadmap-check__head">
                          <span className="roadmap-check__step">{index + 1}</span>
                          <span className="roadmap-check__label">
                            {block.label} ({block.hours}h)
                          </span>
                          {blocked && <span className="roadmap-check__lock">Complete step {index} first</span>}
                        </span>
                        <span className="roadmap-check__task">{day[block.field]}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {isDayComplete(day.id) && (
                <p className="roadmap-day-complete" role="status">Day complete — next day unlocked in strict mode.</p>
              )}
            </>
          )}
        </div>
      </div>

      <details className="roadmap-pillars">
        <summary>Skill pillars (AI, DevOps, cloud — not commerce stack)</summary>
        <div className="roadmap-pillars__grid">
          {SKILL_PILLARS.map((p) => (
            <article key={p.id} className="bento__card">
              <h3>{p.title}</h3>
              <ul className="roadmap-pillar-list">
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </details>

      <div className="roadmap-goals">
        <article className="bento__card">
          <h3>Target roles</h3>
          <ul>
            {TARGET_ROLES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </article>
        <article className="bento__card">
          <h3>12 LPA notes</h3>
          <ul>
            {SALARY_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
