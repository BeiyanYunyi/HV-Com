/* eslint-disable class-methods-use-this */
import { QueryTypes } from 'sequelize';
import ICommentInDB, { ICommentInFrontend, ICommentInserting } from '../../../../types/IComment';
import StorageProvider from '../../../../types/StorageProvider';
import CCommentProvider from '../../../../types/StorageProvider/CCommentProvider';
import NotFoundError from '../../errors/NotFoundError';
import sequelize from './db';
import models from './models';

export default class CommentProvider implements CCommentProvider {
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
    if (comment) return comment.toJSON<ICommentInFrontend>();
    return null;
  }

  async addComment(comment: ICommentInserting): Promise<ICommentInDB> {
    const user = await models.User.findByPk(comment.authorID, {
      include: models.User.associations.comments,
      rejectOnEmpty: true,
    });
    if (user) {
      await sequelize.query(
        'INSERT INTO "comment" ("ID","authorID","replyTime","quotingID","content","route","floor")' +
          ' VALUES ($ID,$authorID,$replyTime,$quotingID,$content,$route,' +
          '(SELECT COUNT(*) FROM "comment" WHERE "route" = $route) + 1)',
        { type: QueryTypes.INSERT, model: models.Comment, mapToModel: true, bind: comment },
      );
      const commentInserted = await models.Comment.findByPk(comment.ID);
      return commentInserted!.toJSON<ICommentInDB>();
    }
    throw new NotFoundError('User not found');
  }

  async countComment(route: string): Promise<number> {
    const count = await models.Comment.count({ where: { route } });
    return count;
  }
}
