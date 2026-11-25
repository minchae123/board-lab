
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, deletePost } from '../api.jsx';

function PostItem({ post }) {
  const queryClient = useQueryClient();

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['posts'] });

  const like = useMutation({
    mutationFn: likePost,
    onSuccess: refresh
  });

  const remove = useMutation({
    mutationFn: deletePost,
    onSuccess: refresh
  });

  return (
    <li className="post-item">
      <div className="post-info">
        <strong>{post.title}</strong>
        <p>작성자 {post.author} · {post.date}</p>
      </div>
      <div className="post-actions">
        <button type="button" onClick={() => like.mutate(post)} disabled={like.isPending}>좋아요 {post.likes}</button>
        <button type="button" onClick={() => remove.mutate(post.id)} disabled={remove.isPending}>{remove.isPending ? '삭제 중...' : '삭제'}</button>
      </div>
    </li>
  );
}

export default PostItem;
