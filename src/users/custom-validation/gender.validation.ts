import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class GenderPipe implements PipeTransform<any, any> {
    transform(value: 'Male' | 'Female'): 'Male' | 'Female' {
        if (!['Male', 'Female'].includes(value)) {
            throw new BadRequestException('Invalid Gender');
        }
        return value;
    }
}