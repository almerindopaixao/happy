import React, { useState, FormEvent } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import logoLogin from '../../assets/images/logoLogin.svg';
import api from '../../services/api';
import {
  setTokenLocalStorage,
  setTokenSessionStorage,
  token,
} from '../../services/token';

import './styles.css';

export default function Login(): JSX.Element {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('O e-mail informado não existe')
          .required('O e-mail precisa ser informado'),
        password: Yup.string().required('A senha precisa ser informada'),
      });

      await schema.validate(
        { email, password },
        {
          abortEarly: false,
        },
      );

      const response = await api.post('/login', {
        email,
        password,
      });

      const token = response.data.token;

      Object.assign(api.defaults, {
        header: { authorization: `Bearer ${token}` },
      });

      if (remember) {
        setTokenLocalStorage(token);
      } else {
        setTokenSessionStorage(token);
      }

      history.push('/dashboard');
      toast.success('Login realizado com successo');
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        e.errors.forEach((error) => {
          toast.error(error);
        });
      }

      e.response.data.errors.forEach((error: string) => {
        toast.error(error);
      });
    }
  }

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="page-login">
      <aside>
        <img src={logoLogin} alt="Logo" />
        <div className="location">
          <strong>Entre-Rios</strong>
          <span>Bahia</span>
        </div>
      </aside>

      <div className="content-form">
        <Link to="/" className="back-home">
          <FiArrowLeft size={24} color="#29B6D1" />
        </Link>
        <form onSubmit={handleSubmit} className="login-form">
          <fieldset>
            <legend>Fazer Login</legend>

            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-block remember">
              <label htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Lembrar-me
              </label>

              <Link to="/login/retrieve">Esqueci minha senha</Link>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
