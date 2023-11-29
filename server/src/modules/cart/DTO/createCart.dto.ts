export class CreateCartDTO {
  idUsers?: number;
  idSize?: number;
  quantity?: number;
}

export class UpdateCartDTO{
  quantity: number;
  idUsers: number[];
}
