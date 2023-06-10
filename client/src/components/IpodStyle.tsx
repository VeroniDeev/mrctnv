import { FC } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';

interface PropsIpodStyle {
  image: StaticImageData;
  titre: string;
}

const IpodStyle: FC<PropsIpodStyle> = ({ image, titre }) => {
  return (
    <div className="IpodMaster border-4 rounded-lg border-solid border-white w-3/12 h-2/6 flex flex-col justify-evenly items-center">
      <div className="image-part w-10/12 h-3/6">
        <Image
          src={image}
          alt="salut"
          className="w-full h-full object-cover border-4 border-white border-solid"
        />
      </div>
      <div className="body-part h-2/6 flex flex-row justify-center">
        <p className="text-base w-auto h-auto">{titre}</p>
        <FontAwesomeIcon
          icon={faPlay}
          className="text-white  w-5 h-auto "
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default IpodStyle;
