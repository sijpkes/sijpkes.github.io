const fs = require('fs');
const path = require('path');

const activityNameMap = {
  'assessment-1-practice-activity-w2-educ6780-t3-1292936314947756539': 'Assessment 1 Practice Activity',
  'kindergarten-interactive-writing-lesson-1292926692681226789': 'Kindergarten Writing Lesson',
  'mentor-text-in-writer-s-workshop-educ6780-t3-2026-1292930317934306819': 'Mentor Text in Writer\'s Workshop',
  'nike-case-study-1292936323094382879': 'Nike Case Study',
  'your-leadership-skills-w6-cmns1031-my-1292911338129535249': 'Your Leadership Skills'
};

function toReadableLabel(folderName) {
  const fallback = folderName
    .replace(/[-_]+/g, ' ')
    .replace(/\b(?:educ|t3|w\d+|my|cmns\d+)\b/gi, '')
    .replace(/\b\d{10,}\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return fallback
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

module.exports = function () {
  const h5pDir = path.resolve(__dirname, '..', '..', 'h5p');

  if (!fs.existsSync(h5pDir)) {
    return [];
  }

  return fs.readdirSync(h5pDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const folderName = entry.name;
      const label = activityNameMap[folderName] || toReadableLabel(folderName);

      return {
        name: folderName,
        label,
        path: `h5p/${folderName}/`
      };
    });
};
