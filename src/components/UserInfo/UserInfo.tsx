import { useContext } from 'react';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import { ApiUserInfo } from '../../data/interfaces';
import s from './UserInfo.module.scss';

export default function UserInfo({ name, login }: ApiUserInfo) {
  const { lang } = useContext(AppContext);
  return (
    <div className={s.ProfDescr}>
      <div className={s.ProfDescrItem}>
        <i className="fa-solid fa-user-large user-big" />
      </div>
      <div className={s.ProfDescrItem}>
        <div className={s.ProfDescrText}>
          <span>{dict[lang].forms.nameLabel}:</span> {name}
        </div>
        <div className={s.ProfDescrText}>
          <span>{dict[lang].forms.loginLabel}:</span> {login}
        </div>
      </div>
    </div>
  );
}
