import { Prisma } from "@prisma/client";
import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { CourseModel } from "./";

export class InstructorModel {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    courses?: CourseModel[];
}
