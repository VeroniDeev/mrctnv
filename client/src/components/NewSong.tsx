import '@/styles/components/newsong.scss';
import IpodStyle from './IpodStyle';
import Image1 from '../../public/assets/new-song/momes-couv.png';

const NewSong = () => {
  return (
    <div className="all-pod w-6/12 flex justify-between">
      <IpodStyle titre="salut" image={Image1} />
      <IpodStyle titre="wsh" image={Image1} />
      <IpodStyle titre="yo" image={Image1} />
    </div>
  );
};

export default NewSong;
