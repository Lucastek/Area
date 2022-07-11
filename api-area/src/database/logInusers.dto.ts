import { IsString } from 'class-validator'

class LogInUserDto {
  @IsString()
  public email: string

  @IsString()
  public password: string
}

export default LogInUserDto
