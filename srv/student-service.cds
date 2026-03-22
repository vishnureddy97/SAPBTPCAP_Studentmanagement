using { my.school as db } from '../db/schema';
 
service StudentService {
 
  entity Students as projection on db.Students;
  entity Courses  as projection on db.Courses;
 
}