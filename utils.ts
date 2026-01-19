
import { Student, Group } from './types';

export const generateRandomId = () => Math.random().toString(36).substr(2, 9);

/**
 * Generates a random number between 1 and max (inclusive).
 */
export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

/**
 * Groups students by their registration number.
 * @param students Array of students
 * @param numGroups The maximum group number expected
 */
export const groupByNumber = (students: Student[], numGroups: number): Group[] => {
  const groups: Group[] = Array.from({ length: numGroups }, (_, i) => ({
    id: i + 1,
    students: [],
  }));

  students.forEach((student) => {
    const groupIdx = student.registrationNumber - 1;
    // Check if group exists (handles case where numGroups might have changed)
    if (groups[groupIdx]) {
      groups[groupIdx].students.push(student);
    } else if (student.registrationNumber > numGroups) {
      // Fallback: if student has a number higher than current groups, 
      // we might want to still show them somewhere or create a temporary group.
      // For now, we assume admin won't decrease groups after registration starts.
    }
  });

  return groups;
};
