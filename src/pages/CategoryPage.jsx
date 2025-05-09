import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Kategori: {slug}</h1>
      <p>Her kommer events innenfor {slug}</p>
    </div>
  );
};

export default CategoryPage;
