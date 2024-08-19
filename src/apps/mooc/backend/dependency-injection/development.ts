import { Container, Token } from "typedi";

import { CourseCreator } from "../../../../Contexts/Mooc/Courses/application/CourseCreator";
import { CourseRepository } from "../../../../Contexts/Mooc/Courses/domain/CourseRepository";
import { InMemoryCourseRepository } from "../../../../Contexts/Mooc/Courses/infrastructure/InMemoryCourseRepository";
import { CoursePutController } from "../controllers/CoursePutController";

export const CourseRepositoryToken = new Token<CourseRepository>("CourseRepository");

export function configureDevelopmentContainer(): void {
  Container.set(CourseRepositoryToken, new InMemoryCourseRepository());
  Container.set(CourseCreator, new CourseCreator(Container.get(CourseRepositoryToken)));
  Container.set(CoursePutController, new CoursePutController(Container.get(CourseCreator)));
}
