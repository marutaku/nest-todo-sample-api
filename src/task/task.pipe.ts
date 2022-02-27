import { ArgumentMetadata, BadGatewayException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TaskStatusPipe implements PipeTransform {
  readonly ALLOWED_STATUS = [
    "OPEN",
    "PROGRESS",
    "DONE"
  ]
  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toUpperCase()
    if (!this.ALLOWED_STATUS.includes(value)) {
      throw new BadGatewayException(`invalid status: ${value}`)
    }
    return value
  }
}