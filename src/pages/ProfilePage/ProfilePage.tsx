import './ProfilePage.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../App';
import { ApiUserQuery } from '../../data/interfaces';
import updateUser from '../../api/updateUser';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import deleteUser from '../../api/deleteUser';
import { passRegExp, userRegExp } from '../../data/constants';
import UserInfo from '../../components/UserInfo/UserInfo';
import validateUser from '../../api/_validateUser';
import dict from '../../data/dict';

function ProfilePage() {
  const { logoutUser, isAuth, setSpinner, lang } = useContext(AppContext);
  const [isModalOpen, showModal] = useState(false);
  const [currName, setCurrName] = useState('');
  const [currLogin, setCurrLogin] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [currId, setCurrId] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApiUserQuery>();
  const navigate = useNavigate();

  const handleCurrentUser = async () => {
    const res = await validateUser(logoutUser, setSpinner, lang);
    if (res) {
      setValue('name', res.name);
      setValue('login', res.login);
      setCurrName(res.name);
      setCurrLogin(res.login);
      setCurrId(res.id);
    }
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else {
      handleCurrentUser();
    }
  }, [isAuth]);

  const onSubmit = handleSubmit(async ({ name, login, password }) => {
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 1500);
    const result = await updateUser(name, login, password, logoutUser, setSpinner, lang);
    if (result) {
      setCurrName(name);
      setCurrLogin(login);
    }
  });

  const onDelete = async () => {
    await deleteUser(logoutUser, setSpinner, lang);
  };

  return (
    <>
      <div className="narrow-container profile-container">
        <UserInfo name={currName} login={currLogin} id={currId} />
        <div className="form-wrapper">
          <h3>
            <i className="fa-solid fa-pen-to-square prof-icon" />
            {dict[lang].editProfileHeader}
          </h3>
          <form onSubmit={onSubmit} className="user-controls">
            <div className="profile-field">
              <label htmlFor="form-name">
                {dict[lang].forms.nameLabel}
                <input
                  id="form-name"
                  type="text"
                  className="form-name  user-edit-input"
                  placeholder={dict[lang].forms.namePholder}
                  {...register('name', { required: true, pattern: userRegExp })}
                />
              </label>
              {errors.name && <div className="valid-err">{dict[lang].forms.nameLoginValid}</div>}
            </div>
            <div className="profile-field">
              <label htmlFor="form-login">
                {dict[lang].forms.loginLabel}
                <input
                  id="form-login"
                  type="text"
                  className="form-login user-edit-input"
                  placeholder={dict[lang].forms.loginPholder}
                  {...register('login', { required: true, pattern: userRegExp })}
                />
              </label>
              {errors.login && <div className="valid-err">{dict[lang].forms.nameLoginValid}</div>}
            </div>
            <div className="profile-field">
              <label htmlFor="form-password">
                {dict[lang].forms.passwordLabel}
                <input
                  id="form-password"
                  type="password"
                  className="form-password  user-edit-input"
                  autoComplete="on"
                  placeholder={dict[lang].forms.passwordPholder}
                  {...register('password', { required: true, pattern: passRegExp })}
                />
              </label>
              {errors.password && <div className="valid-err">{dict[lang].forms.passwordValid}</div>}
            </div>
            <input
              type="submit"
              value={dict[lang].saveText}
              className={`save-button ${isButtonDisabled ? 'temp-disabled' : ''}`}
            />
          </form>
        </div>
        <button type="button" className="delete-profile" onClick={() => showModal(true)}>
          {dict[lang].deleteAccount}
        </button>
      </div>
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={
            <p>
              {dict[lang].confirmSure1} <br />
              {dict[lang].confirmSure2}
            </p>
          }
          modalCallback={onDelete}
        />
      )}
    </>
  );
}

export default ProfilePage;
