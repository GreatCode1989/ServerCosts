import { IsNotEmpty } from 'class-validator';

export class UpdateCostsDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly date: Date;
}
