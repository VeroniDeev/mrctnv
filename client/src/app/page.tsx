import Carroussel from '@/components/Carroussel';
import Presentation from '@/components/Presentation';
import '@/styles/section-main.scss';
import Evenement from '@/components/Evenement';
import NewSong from '@/components/NewSong';

const page = () => {
  return (
    <main>
      <section className="part1">
        <Presentation></Presentation>
        <Carroussel></Carroussel>
      </section>
      <section className="part2">
        <Evenement></Evenement>
      </section>
      <section className="part3">
        <NewSong></NewSong>
      </section>
      <section className="part4"></section>
    </main>
  );
};

export default page;
