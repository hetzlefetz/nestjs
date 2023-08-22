import { Prisma } from "@prisma/client";
import { IsNumber, IsNotEmpty, IsString, IsDate, IsBoolean, IsOptional } from "class-validator";
import { VideoModel, InstructorModel } from "../../../prisma/generated/models";

export class CourseModel {
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
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsBoolean()
    beginner: boolean;

    @IsOptional()
    videos?: VideoModel[];

    @IsOptional()
    Instructor?: InstructorModel;

    @IsOptional()
    @IsNumber()
    instructorId?: number;
}
