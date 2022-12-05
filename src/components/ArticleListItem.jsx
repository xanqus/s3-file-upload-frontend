import React from 'react';

const ArticleListItem = ({ article }) => {
  const { id, title, body, createDate, updatedDate } = article;
  return (
    <tr>
      <th>{id}</th>
      <td>{title}</td>
      <td>{createDate}</td>
    </tr>
  );
};

export default ArticleListItem;
