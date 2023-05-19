import { InputType, PickType } from '@nestjs/graphql';

import { RegisterInput } from './register.input';

@InputType()
export class LoginInput extends PickType(RegisterInput, [
  'login',
  'password',
]) {}
