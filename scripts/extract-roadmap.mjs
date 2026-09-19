import fs from "fs";

const src = fs.readFileSync(
  "C:/Users/princ/.cursor/projects/d-Skill-up-Project/canvases/ai-devops-oct-job-roadmap.canvas.tsx",
  "utf8",
);

const daily = src.match(/const DAILY_BLOCKS = (\[[\s\S]*?\]) as const;/)[1];
const pillars = src.match(/const SKILL_PILLARS = (\[[\s\S]*?\]);/)[1];
const weeks = src.match(/const WEEKS: WeekPlan\[\] = (\[[\s\S]*?\]);/)[1];
const roles = src.match(/const TARGET_ROLES = (\[[\s\S]*?\]);/)[1];
const salary = src.match(/const SALARY_NOTES = (\[[\s\S]*?\]);/)[1];

const out = `/** AI + DevOps job sprint — generated from canvas; run: node scripts/extract-roadmap.mjs */

export const roadmapMeta = {
  title: "My learning roadmap",
  subtitle:
    "Personal 6-week sprint toward Cloud, DevOps, and AI platform roles. Checklist progress is saved in your browser on this device.",
  deadline: "31 Oct 2026",
  ctcGoal: "12 LPA CTC",
  dailyHours: "6–7 h (4–5 learn + 2 revision/mock)",
  storageKey: "pk-roadmap-progress-v1",
};

export const DAILY_BLOCKS = ${daily};

export const SKILL_PILLARS = ${pillars};

export const WEEKS = ${weeks};

export const TARGET_ROLES = ${roles};

export const SALARY_NOTES = ${salary};

export const ORDERED_BLOCKS = [
  { key: "deep", label: "Deep learn", hours: 2, field: "deep" },
  { key: "lab", label: "Hands-on lab", hours: 2, field: "lab" },
  { key: "py", label: "Python + DSA", hours: 1, field: "pyDsa" },
  { key: "rev", label: "Revision", hours: 2, field: "revision" },
  { key: "mock", label: "Mock / drill", hours: 1, field: "mock" },
];

export function flattenDays(weeks) {
  return weeks.flatMap((w, wi) =>
    w.days.map((d, di) => ({
      ...d,
      weekId: w.id,
      weekIndex: wi,
      dayIndex: di,
      globalIndex:
        weeks.slice(0, wi).reduce((acc, w2) => acc + w2.days.length, 0) + di,
    })),
  );
}
`;

fs.writeFileSync("D:/Skill-up Project/portfolio/src/data/roadmap.js", out);
console.log("OK", out.length);
