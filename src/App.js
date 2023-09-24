import { useEffect, useState } from 'react';
import Categorie from './component/categorie';
import { url } from './utils/constant';
import './App.css';
import Detail from './component/detail';

function App() {
  const [data, setData] = useState([]);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataDetail, setDataDetail] = useState([])

  const splitStringWithQuotes = (str) => {
    const regex = /"[^"]*"|[^,]+/g;
    return str.match(regex).map((match) => match.replace(/(^"|"$)/g, ''));
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const textData = await response.text();
        const lines = textData.split('\n');
        const headers = lines[0].split(/,|\r/).map(header => header.trim()).filter(Boolean);
        const parsedData = [];

        for (let i = 1; i < lines.length; i++) {
          const values = splitStringWithQuotes(lines[i]);
          const item = {};
          for (let j = 0; j < headers.length; j++) {
            item[headers[j]] = values[j];
          }
          parsedData.push(item);
        }
        setData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newDataCategorie = data.map(obj => {
      const newObj = {};
      for (const key in obj) {
        if (key.startsWith('Vous jouez ce jeu depuis combien de temps') || key.startsWith('Pourquoi vous connaissez ce jeu ?') || key.startsWith('Vos raisons de jouer à des jeux')) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });
    const newDataDetail = data.map(obj => {
      const newObj = {};
      for (const key in obj) {
        if (!key.startsWith('Vous jouez ce jeu depuis combien de temps') 
        && !key.startsWith('Pourquoi vous connaissez ce jeu ?') 
        && !key.startsWith('Vos raisons de jouer à des jeux')
        && !key.startsWith('Timestamp')) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });
    setDataCategorie(newDataCategorie)
    setDataDetail(newDataDetail)
  },[data])

  return (
    <div className="App">
      <div className='categorieContainer'>
        <Categorie data={dataCategorie}/> 
      </div>
      
      <div className='detailContainer'>
        {dataDetail.map(obj => (<Detail data={obj}/>))}
      </div>
    </div>
  );
}

export default App;
