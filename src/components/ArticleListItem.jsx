import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';

const ArticleListItem = ({ article }) => {
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
    </tr>
  );
};

export default ArticleListItem;
