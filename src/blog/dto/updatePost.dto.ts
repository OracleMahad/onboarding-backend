import { IsNotEmpty, Max, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @Max(255)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @Max(1000)
  @IsNotEmpty()
  readonly body: string;
}
