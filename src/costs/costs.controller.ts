import { AuthService } from 'src/auth/auth.service';
import { CostsService } from './costs.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { CreateCostsDto } from './dto/create-cost.dto';

@Controller('cost')
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCosts(@Req() req, @Res() res) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const costs = await this.costsService.findAll();
    const filteredCosts = costs.filter(
      (cost) => cost.userId === user._id.toString(),
    );

    return res.send(filteredCosts);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createCosts(@Body() createCostsDto: CreateCostsDto, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.costsService.create({
      ...createCostsDto,
      userId: user._id as string,
    });
  }
}
