import { CourseDto } from "../../../src/course/dto/course.dto";
import { InstructorDto } from "./instructor.dto";
import { VideoDto } from "./video.dto";

export { CourseDto } from "../../../src/course/dto/course.dto";
export { InstructorDto } from "./instructor.dto";
export { VideoDto } from "./video.dto";
export const extraModels = [
  CourseDto,InstructorDto,VideoDto
];
