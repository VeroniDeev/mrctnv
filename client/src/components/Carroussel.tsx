'use client';
import Carroussel1 from '../../public/assets/images-carroussel/carroussel1.jpg';
import Carroussel2 from '../../public/assets/images-carroussel/carroussel2.jpeg';
import Carroussel3 from '../../public/assets/images-carroussel/carroussel3.jpg';
import Carroussel4 from '../../public/assets/images-carroussel/carroussel4.jpg';
import Image from 'next/image';
import '@/styles/components/carroussel.scss';
import { useState, useRef, useEffect } from 'react';

const CarrousselPic = [
  Carroussel1,
  Carroussel2,
  Carroussel3,
  Carroussel4,
  Carroussel1,
];

const Carroussel = () => {
  const [counter, setCounter] = useState<number>(0);
  const [perc, setPerc] = useState<number>(0);
  const allPicRef = useRef<(HTMLDivElement | null)[]>([]);

  const modifyBar = () => {
    if (counter > CarrousselPic.length) setCounter(0);
    else {
      setCounter(counter + 1);
    }
  };

  return (
    <section className="carroussel">
      <div className="image-toggle">
        {CarrousselPic.map((el, i) => {
          return (
            <div
              className={'carroussel' + (i + 1)}
              key={i}
              ref={(ref) => (allPicRef.current[i] = ref)}
            >
              <div className="write-image">
                <h3>non</h3>
                <p>oui</p>
              </div>
              <Image src={el} alt="oui" />
            </div>
          );
        })}
      </div>
      <div className="bar-progress">
        <div className="bar-controls">
          <span>&lt;</span>
          <span onClick={modifyBar}>&gt;</span>
        </div>
        <div className="bar-info">
          <div className="bar-now"></div>
        </div>
        <div className="bar-count">
          <p>{counter}</p>
        </div>
      </div>
    </section>
  );
};

export default Carroussel;
