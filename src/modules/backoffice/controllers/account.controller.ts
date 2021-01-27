import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { AccountService } from '../services/account.service';
import { Result } from '../models/result.model';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
  ) {}

  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
    const customer = await this.accountService.authenticate(
      model.username,
      model.password,
    );

    if (!customer)
      throw new HttpException(
        new Result('Invalid user or password', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );

    if (!customer.user.active)
      throw new HttpException(
        new Result('Inactive user', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );

    const token = await this.authService.createToken(
      customer.document,
      customer.email,
      '',
      customer.user.roles,
    );
    return new Result(null, true, token, null);
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      const password = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');
      await this.accountService.update(model.document, { password: password });
      return new Result(
        'A new password has been sent to your E-mail',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result('Your password could not be restored', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() request,
    @Body() model: ChangePasswordDto,
  ): Promise<any> {
    try {
      await this.accountService.update(request.user.document, {
        password: model.newPassword,
      });
      return new Result(
        'Your password has been changed successfully',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result('Your password could not be changed', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(
      request.user.document,
      request.user.email,
      request.user.image,
      request.user.roles,
    );
    return new Result(null, true, token, null);
  }
}
