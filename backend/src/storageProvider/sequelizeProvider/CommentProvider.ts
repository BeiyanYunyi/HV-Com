/* eslint-disable class-methods-use-this */
import ICommentInDB, { ICommentInFrontend } from '../../../../types/IComment';
import StorageProvider from '../../../../types/StorageProvider';
import Comment from '../../../../types/StorageProvider/Comment';
import NotFoundError from '../../errors/NotFoundError';
import models from './models';

export default class CommentProvider implements Comment {
  constructor(parent: StorageProvider) {
    this.parent = parent;
  }

  private commentInclude = [
    {
      association: models.Comment.associations.author,
      attributes: ['username', 'mail', 'website', 'avatar', 'id'],
    },
    {
      association: models.Comment.associations.quoting,
      as: 'quoting',
      attributes: { exclude: ['authorID', 'quotingID'] },
      include: [
        {
          association: models.Comment.associations.author,
          attributes: ['username', 'mail', 'website', 'avatar', 'id'],
        },
      ],
    },
  ];

  parent: StorageProvider;

  async getComments(route: string, order: 'ASC' | 'DESC' = 'ASC'): Promise<ICommentInFrontend[]> {
    const comments = await models.Comment.findAll({
      where: { route },
      order: [['floor', order]],
      include: this.commentInclude,
      attributes: { exclude: ['authorID', 'quotingID'] },
    });
    return comments.map((comment) => comment.toJSON<ICommentInFrontend>());
  }

  async getComment(ID: string): Promise<ICommentInFrontend | null> {
    const comment = await models.Comment.findByPk(ID, {
      include: this.commentInclude,
      attributes: { exclude: ['authorID', 'quotingID'] },
    });
    if (!comment) return null;
    return comment.toJSON<ICommentInFrontend>();
  }

  async addComment(comment: ICommentInDB): Promise<ICommentInDB> {
    const user = await models.User.findByPk(comment.authorID, {
      include: models.User.associations.comments,
      rejectOnEmpty: true,
    });
    if (user) {
      const commentInserted = await user.createComment(comment);
      return commentInserted.toJSON<ICommentInDB>();
    }
    throw new NotFoundError('user not found');
  }
}
