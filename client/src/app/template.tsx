'use client';
import '@/styles/index.scss';
import Link from 'next/link';
import Image from 'next/image';
import PulsarInc from '@/../public/assets/Pulsar-inc.png.svg';
import PulsarSansRond from '../../public/assets/Pulsar-sans-rond.png.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHeart,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';

const template = ({ children }: { children: React.ReactNode }) => {
  const logoAnimation = useRef(null);
  return (
    <>
      <header className="">
        <section className="logo-web" ref={logoAnimation}>
          <div className="assembly-rond">
            <Image
              src={PulsarSansRond}
              alt="logo du site"
              className="pulsar-sans-rond"
            />
          </div>
          <Image src={PulsarInc} alt="logo du site" className="pulsar-inc" />
        </section>
        <nav>
          <ul>
            <li className="font-custom">
              <Link href="d" className="font-custom">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="d">Accueil</Link>
            </li>
            <li>
              <Link href="d">Accueil</Link>
            </li>
            <li>
              <Link href="d">Accueil</Link>
            </li>
            <li>
              <Link href="d">Accueil</Link>
            </li>
          </ul>
        </nav>
        <section className="icon-info">
          <div className="contain-icon">
            <FontAwesomeIcon
              icon={faUser}
              className="fai-icon"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faHeart}
              className="fai-icon"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="fai-icon"
            ></FontAwesomeIcon>
          </div>
        </section>
      </header>
      {children}
    </>
  );
};

export default template;
