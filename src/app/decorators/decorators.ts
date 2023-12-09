import { Controller, Get } from "routing-controllers";

@Controller("cats")
export class CatsController {
  @Get()
  findAll() {
    return "This action returns all cats";
  }
}
