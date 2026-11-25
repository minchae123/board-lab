import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts } from '../api.jsx'
import Panel from './Panel.jsx';

function QuickView() {
  const [input, setInput] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { data: posts = [] } = useQuery({
    queryKey: ['posts', 'all'],
    queryFn: fetchAllPosts,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSelectedId(input);
  }

  return (
    <Panel title="글 번호로 바로 보기">
      <form className="form-row" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="글 번호"
        />
        <button type="submit">보기</button>
      </form>
      {selectedId && <p>{posts.find((post) => post.id === selectedId).title}</p>}
    </Panel>
  );
}

export default QuickView;