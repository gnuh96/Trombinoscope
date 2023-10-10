import { useEffect, useState } from "react";
import Categorie from "./component/categorie";
import { url } from "./utils/constant";
import "./App.css";
import Detail from "./component/detail";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([]);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await d3.csv(url);

        if (!response) {
          throw new Error("Data not found or inaccessible");
        }

        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data, dataCategorie, dataDetail);
  useEffect(() => {
    const newDataCategorie = data.map((obj) => {
      const newObj = {};
      for (const key in obj) {
        if (
          key.startsWith("Vous jouez ce jeu depuis combien de temps") ||
          key.startsWith("Pourquoi vous connaissez ce jeu ?") ||
          key.startsWith("Vos raisons de jouer à des jeux")
        ) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });
    const newDataDetail = data.map((obj) => {
      const newObj = {};
      for (const key in obj) {
        if (
          !key.startsWith("Vous jouez ce jeu depuis combien de temps") &&
          !key.startsWith("Pourquoi vous connaissez ce jeu ?") &&
          !key.startsWith("Vos raisons de jouer à des jeux") &&
          !key.startsWith("Timestamp")
        ) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });
    setDataCategorie(newDataCategorie);
    setDataDetail(newDataDetail);
  }, [data]);

  return (
    <div className="App">
      <div className="categorieContainer">
        <Categorie data={dataCategorie} />
      </div>

      <div className="detailContainer">
        {dataDetail.map((obj, i) => (
          <Detail key={`detail_response_${i}`} data={obj} />
        ))}
      </div>
    </div>
  );
}

export default App;
