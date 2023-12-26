import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cost, CostDocument } from 'src/sсhemas/costs.schema';
import { CreateCostsDto } from './dto/create-cost.dto';
import { UpdateCostsDto } from './dto/update-cost.dto';

@Injectable()
export class CostsService {
  constructor(@InjectModel(Cost.name) private costModel: Model<CostDocument>) {}

  async findAll(): Promise<Cost[]> {
    return this.costModel.find();
  }

  async findOne(id: string): Promise<Cost> {
    return this.costModel.findOne({ _id: id });
  }

  async create(createCostDto: CreateCostsDto): Promise<Cost> {
    const createdCost = new this.costModel(createCostDto);
    return createdCost.save();
  }

  async update(updateCostDto: UpdateCostsDto, id: string): Promise<Cost> {
    await this.costModel.updateOne(
      { _id: id },
      {
        $set: {
          ...updateCostDto,
        },
      },
    );

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.costModel.deleteOne({ _id: id });
  }
}
