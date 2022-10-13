import { FieldMiddleware } from '@nestjs/graphql';
import { AppContext, ViewerRole } from '../../app.module';
import { User } from '../user.type';

export const hasAdminRole: FieldMiddleware<User, AppContext> = async (
  ctx,
  next,
) => {
  const {
    context: { viewer },
  } = ctx;

  return viewer?.role === ViewerRole.ADMIN ? next() : null;
};
