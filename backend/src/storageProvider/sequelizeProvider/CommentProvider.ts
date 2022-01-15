/* eslint-disable class-methods-use-this */
import ICommentInDB from '../../../../types/IComment';
import StorageProvider from '../../../../types/StorageProvider';
import Comment from '../../../../types/StorageProvider/Comment';
import NotFoundError from '../../errors/NotFoundError';
import models from './models';

export default class CommentProvider implements Comment {
  constructor(parent: StorageProvider) {
    this.parent = parent;
  }

  parent: StorageProvider;

  async getComments(route: string): Promise<ICommentInDB[]> {
    const comments = await models.Comment.findAll({
      where: { route },
      order: [['replyTime', 'ASC']],
    });
    return comments;
  }

  async getComment(ID: string): Promise<ICommentInDB | null> {
    const comment = await models.Comment.findByPk(ID);
    if (!comment) return null;
    return comment.toJSON();
  }

  async addComment(comment: ICommentInDB): Promise<ICommentInDB> {
    const user = await models.User.findByPk(comment.authorID, {
      include: models.User.associations.comments,
      rejectOnEmpty: true,
    });
    if (user) {
      const commentInserted = await user.createComment(comment);
      return commentInserted.toJSON();
    }
    throw new NotFoundError('user not found');
  }
}
