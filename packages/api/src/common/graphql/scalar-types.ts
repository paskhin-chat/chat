import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { ApolloError, ValidationError } from 'apollo-server';
import { ApolloServerErrorCode } from '@apollo/server/errors';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  /**
   * Scalar description {@see CustomScalar.description}.
   */
  public readonly description = 'Date custom scalar type';

  /**
   * Scalar parser {@see CustomScalar.parseValue}.
   */
  public parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new ValidationError('Date must be a string type');
    }

    return new Date(value);
  }

  /**
   * Scalar serializer {@see CustomScalar.serialize}.
   */
  public serialize(value: unknown): string {
    if (typeof value === 'string') {
      return new Date(value).toISOString();
    }

    if (!(value instanceof Date)) {
      throw new ApolloError(
        'The value for serialization must be a Date object.',
        ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      );
    }

    return value.toISOString();
  }

  /**
   * Scalar literal parser {@see CustomScalar.parseLiteral}.
   */
  public parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.STRING) {
      throw new ValidationError('Date must be a string type');
    }

    return new Date(ast.value);
  }
}
