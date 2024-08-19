import { Request, Response } from "express";
import httpStatus from "http-status";
import { Service } from "typedi";

import { CourseCreator } from "../../../../Contexts/Mooc/Courses/application/CourseCreator";
import { Controller } from "./Controller";

export interface CourseRequest {
  id: string;
  name: string;
  duration: string;
}

@Service()
export class CoursePutController implements Controller {
  constructor(private readonly courseCreator: CourseCreator) {}

  async run(req: Request<unknown, unknown, CourseRequest>, res: Response): Promise<void> {
    const { id, name, duration } = req.body;

    await this.courseCreator.run(id, name, duration);

    res.status(httpStatus.CREATED).send();
  }
}
