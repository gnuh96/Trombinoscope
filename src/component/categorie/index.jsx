import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import { titleTabs } from '../../utils/constant';
import DonutCat from '../donutCat';
import './styles.css';

function Categorie({data}) {
    const [value, setValue] = useState('0');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const filterData = (question) => {
        const newData = data.map(obj => {
            const newObj = {};
            for (const key in obj) {
              if (key.startsWith(question)) {
                newObj[key] = obj[key];
              }
            }
            return newObj;
        });
        return newData
    }
    return (
        <div className="categorie">
            <div className='categorieText'>
                <h1 className="display-3">Loisirs et jeux-vidéos</h1>
                <h2>Master 2 THYP : Promotion  2023 - 2024</h2>
            </div>
            
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {Object.entries(titleTabs).map(([key, value], index) => (
                            <Tab label={value} value={index.toString()}/>
                        ))}
                    </TabList>
                    </Box>
                    {Object.entries(titleTabs).map(([key, value], index) => (
                        <TabPanel value={index.toString()}>
                            <DonutCat data={filterData(key)} title={value}/>    
                        </TabPanel>
                    ))}
                </TabContext>
            </Box>
      </div>
    );
}

export default Categorie;