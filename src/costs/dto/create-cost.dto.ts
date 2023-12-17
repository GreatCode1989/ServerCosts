import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCostsDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly date: Date;

  @IsOptional()
  readonly userId: string;
}
