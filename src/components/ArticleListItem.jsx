import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';

const ArticleListItem = ({ article, setArticles }) => {
  const navigate = useNavigate();
  const { id, title, body, createDate, updatedDate } = article;
  return (
    <tr
      className='cursor-pointer'
      onClick={() => {
        navigate(`/detail/${id}`);
      }}
    >
      <th>{id}</th>
      <td>{title}</td>
      <td>{formatDate(createDate)}</td>
      <td
        onClick={async (e) => {
          if (e.currentTarget !== e.target) {
            e.stopPropagation();
            await axios({
              method: 'DELETE',
              url: `http://localhost:8089/article?id=${id}`,
            });
            const articles = await axios({
              method: 'GET',
              url: `http://localhost:8089/article`,
            });
            setArticles(articles.data);
          }
        }}
      >
        <div>❌</div>
      </td>
    </tr>
  );
};

export default ArticleListItem;
