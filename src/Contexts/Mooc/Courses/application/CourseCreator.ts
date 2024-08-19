import { Service } from "typedi";

import { Course } from "../domain/Course";
import { CourseRepository } from "../domain/CourseRepository";

@Service()
export class CourseCreator {
  constructor(private readonly repository: CourseRepository) {}

  async run(id: string, name: string, duration: string): Promise<void> {
    const course = new Course({ id, name, duration });

    return this.repository.save(course);
  }
}
