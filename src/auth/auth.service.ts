import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './entity/accessToken.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) { }

  async login({ username, password }: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    try {
      await bcrypt.compare(password, user.password);
    } catch (e) {
      throw new ForbiddenException('Wrong password');
    }
    const accessTokenPayload = {
      username: user.username,
      id: user.id,
    };
    const accessToken = await this.jwtService.signAsync(accessTokenPayload);
    return { accessToken };
  }

  async register(userRegisterDto: RegisterDto) {
    const { password: unhashedPassword, ...userWithoutPassword } =
      userRegisterDto;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(unhashedPassword, salt);

    const user = await this.prismaService.user.create({
      data: {
        password,
        ...userWithoutPassword,
      },
    });
    const payload: AccessTokenPayload = {
      username: user.username,
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
