import '@/styles/components/evenement.scss';

const Evenement = () => {
  const aha = [1, 2, 3, 4, 5, 6];
  return (
    <div className="all-part">
      <div className="header-part">
        <h2>Événements à venir</h2>
      </div>
      <div className="body-part">
        {aha.map((el, id) => {
          return (
            <div className={'event' + (id + 1) + ' p-5 rounded-lg'} key={id}>
              <p>Michy</p>
              <h3 className="font-bold text-2xl">nom de l'évenement {el}</h3>
              <p className="text-xs float-right">
                10 mai 2023 <br /> 19h00
              </p>
              <p className="text-xs clear-right">
                Lieu: Salle des Fêtes, Paris
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Evenement;
