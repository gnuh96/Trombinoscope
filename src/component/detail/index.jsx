import React from 'react';
import { listeDetail } from '../../utils/constant';
import './styles.css'
import DonutDet from '../donutDet';

function Detail({data}) {
    const parseImgUrl = (url) => {
        const imgUrl = new URL(data[listeDetail.logo]) 
        const urlParam = new URLSearchParams(imgUrl.search);
        const id = urlParam.get('id');
        return "https://drive.google.com/uc?id="+id+"&export=download";
    }

    const parseGroupe = (group) => {
        const newObj = {};
        for (const key in data) {
            if (key.startsWith(group)) {
                newObj[key] = data[key];
            }
        }
        const outputObject = {};

        for (const key in newObj) {
        if (Object.hasOwnProperty.call(newObj, key)) {
            const newKey = key.match(/\[([^[\]]+)\]/)[1];
            outputObject[newKey] = newObj[key];
        }
        }

        return outputObject
    }
    
    return (
        <div className='detail'>
            <div className='detailContent'>
                <div className='detailImg'>
                    <img src={parseImgUrl(data[listeDetail.logo])} alt='logo_game' />   
                </div>
                <h3 className='textNom'>{data[listeDetail.nom]}</h3>
                <div className='detailDonuts'>
                    <DonutDet data={parseGroupe(listeDetail.critere)} title="Criteres"/>
                    <DonutDet data={parseGroupe(listeDetail.avantage)} title={"Avantages"}/>
                </div>
                <div className='detailMail'>
                    <span>{data[listeDetail.mail]}</span>
                </div> 
            </div>
        </div>
    );
}

export default Detail;