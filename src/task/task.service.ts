import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./task.entity";

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) todoRepository: Repository<Todo>) { }
}