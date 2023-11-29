import { IsNotEmpty, MinLength, min } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty({ message: 'Họ tên không được trống' })

  idUsers?: number;
  address?: string;
  @IsNotEmpty({ message: 'Tỉnh/Thành Phố không được trống' })
  activeProvince?: string;
  @IsNotEmpty({ message: 'Quận/Huyện không được trống' })
  activeDistrict?: string;
  @IsNotEmpty({ message: 'Phường/Xã không được trống' })
  activeWard?: string;
  OrderDate?: string;
  @IsNotEmpty({ message: 'Số điện thoại không được trống' })
  phone?: number;
  userName?: string;
}
