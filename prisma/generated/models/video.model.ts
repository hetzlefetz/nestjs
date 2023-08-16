import { Prisma } from "@prisma/client";
import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { CourseModel } from "./";

export class VideoModel {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsOptional()
    Course?: CourseModel;

    @IsOptional()
    @IsNumber()
    courseId?: number;
}
