import { CommentResponse } from 'service/type/response/comment';

export interface CommentModel {
  id: number;
  by: string;
}

export const parsingCommentResponseToCommentModel = (commentResponse: CommentResponse[]): CommentModel[] => {
  try {
    return commentResponse.map((comment: CommentResponse) => {
      return {
        id: comment.id ?? 0,
        by: comment.by ?? 'No Name',
      };
    });
  } catch {
    return [];
  }
};
