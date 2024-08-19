import { Request, Response, Router } from "express";
import { Container } from "typedi";

import { CoursePutController, CourseRequest } from "../controllers/CoursePutController";

export const register = (router: Router): void => {
  const coursePutController = Container.get(CoursePutController);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.put("/courses/:id", (req: Request<unknown, unknown, CourseRequest>, res: Response) =>
    coursePutController.run(req, res)
  );
};
