import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { ValidationError } from 'apollo-server';
import { HttpException, HttpStatus } from '@nestjs/common';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  /**
   * {@see CustomScalar.description}.
   */
  public readonly description = 'Date custom scalar type';

  /**
   * {@see CustomScalar.parseValue}.
   */
  public parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new ValidationError('Date must be a string type');
    }

    return new Date(value);
  }

  /**
   * {@see CustomScalar.serialize}.
   */
  public serialize(value: unknown): string {
    if (typeof value === 'string') {
      return new Date(value).toISOString();
    }

    if (!(value instanceof Date)) {
      throw new HttpException(
        'The value for serialization must be a Date object.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return value.toISOString();
  }

  /**
   * {@see CustomScalar.parseLiteral}.
   */
  public parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.STRING) {
      throw new ValidationError('Date must be a string type');
    }

    return new Date(ast.value);
  }
}