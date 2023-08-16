import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { CourseDto } from "./";

export class VideoDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    desc: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ required: false, type: () => CourseDto })
    @IsOptional()
    Course?: CourseDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    courseId?: number;
}
