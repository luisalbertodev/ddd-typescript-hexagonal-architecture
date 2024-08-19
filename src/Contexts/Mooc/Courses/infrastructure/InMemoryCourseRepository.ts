import { Service } from "typedi";

import { Course } from "../domain/Course";
import { CourseRepository } from "../domain/CourseRepository";

@Service("InMemoryCourseRepository")
export class InMemoryCourseRepository implements CourseRepository {
  private readonly courses: Map<string, Course> = new Map();

  async save(course: Course): Promise<void> {
    this.courses.set(course.id, course);

    await Promise.resolve();
  }
}
