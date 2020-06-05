## What's this

This is my pet project for learning best practices in building webapps with Laravel + Vue.js + TailwindCSS stack using TDD methodology.

The app allows teachers to create courses consisting of lessons with quizzes. Students can join different courses and track their progress.

## Entities

### Users

Users represent people who use the app. There are three kinds of users, each with different permissions.

**Guests** (unauthorized users) are allowed to see unauthorized courses, but cannot see lessons inside them.

**Students** are allowed to see published courses, join a course, see lessons inside a joined course, complete quizzes in these lessons, see the results of the last attempt to complete a quiz, and see the total grade for a given course.

**Teachers** have the same permissions as students, plus the ability to create a new course, publish, edit and destroy courses they've created.

**Admins** have the same permissions as teachers, except the can publish, edit and destroy any course, and promote users to teachers or downgrade them to students.

### Courses, lessons, and quizzes

Each course has a title, a description, and a cover image. The course consists of lessons.

Each lesson has a title, an optional description and a position within the course. Lesson can include text blocks, videos (uploaded or embedded from external source), images, downloadable files, and a quiz.

A quiz consists of questions and has a weight value. The value of all quizzes in the course adds up to 100%. When a student attempts a quiz, the result is calculated in percents and adds up to course total grade according to quiz weight.

Each question has several answers, one of which should be marked as correct.
