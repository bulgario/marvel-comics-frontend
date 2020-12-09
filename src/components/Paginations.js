import React from 'react';

// refactor: estou fazendo apenas nas 20 primeiras páginas
const Paginations = (props) => {
  const pageLinks = [];

  for (let i = 1; i <= 20 + 1 ; i++) {
    let active = props.currentPage == i ?
    'active': '';
    pageLinks.push(
      <li 
        className={`waves-effect ${active}`} 
        key={i} 
        onClick={() => props.nextPage(i)}
      >
        <a href="#">
          { i }
        </a>
      </li>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <ul 
        style={{ display: 'inline' }}
        className="pagination">
          { props.currentPage > 1 ? 
          <li 
          className={`waves-effect`} 
          onClick={() => props.nextPage(props.currentPage - 1, )}
          >
          <a href="#">
            Prev
          </a>
          </li> 
          : ''}

          { pageLinks }

          { props.currentPage < 20 ? 
          <li 
          className={`waves-effect`} 
          onClick={() => props.nextPage(props.currentPage + 1)}
          >
          <a href="#">
            Next
          </a>
          </li> 
          : ''}
        </ul>
      </div>
    </div>
  );
};

export default Paginations;