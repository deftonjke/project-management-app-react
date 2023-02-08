import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.scss';
import { AppContext } from '../../App';
import getAllTasks from '../../api/getAllTasks';
import { SearchTaskResponse } from '../../data/interfaces';
import SearchTaskInfo from '../../components/SearchTaskInfo/SearchTaskInfo';
import dict from '../../data/dict';

export default function SearchPage() {
  const { isAuth, logoutUser, setSpinner, lang } = useContext(AppContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<SearchTaskResponse[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
  }, [isAuth]);

  const loadTasks = async () => {
    if (searchVal.length !== 0) {
      const res = await getAllTasks(logoutUser, setSpinner, lang);
      const searchValue = searchVal.toLocaleLowerCase();
      const filtered = res.filter(
        (i) =>
          i.title.toLocaleLowerCase().includes(searchValue) ||
          i.description.toLocaleLowerCase().includes(searchValue)
      );
      setTasks(filtered);
    } else {
      setTasks([]);
    }
  };

  const handleChange = (e: React.FormEvent) => {
    setSearchVal((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 1500);
    loadTasks();
  };

  return (
    <div className="narrow-container">
      <h1 className="title">{dict[lang].searchTasks}</h1>
      <div className="search-form-wrapper">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder={dict[lang].searchTasksPholder}
            className="search-res-query"
            value={searchVal}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`search-res-button ${isButtonDisabled ? 'temp-disabled' : ''}`}
          >
            {dict[lang].search}
          </button>
        </form>
      </div>
      <div className="search-tasks-wrapper">
        {tasks.length === 0 && <h3>{dict[lang].searchHeader}</h3>}
        {tasks.length !== 0 && (
          <h3>
            {dict[lang].searchResults} {tasks.length}
          </h3>
        )}
        {tasks.map((i) => (
          <SearchTaskInfo
            id={i.id}
            title={i.title}
            order={i.order}
            description={i.description}
            userId={i.userId}
            user={i.user}
            boardId={i.boardId}
            columnId={i.columnId}
            key={i.id}
            loadTasks={loadTasks}
          />
        ))}
      </div>
    </div>
  );
}
