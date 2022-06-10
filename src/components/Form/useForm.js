import { useState } from 'react';
import {settings} from '../../settings.js';
import {PIZZA, SOUP, SANDWICH} from '../../consts.js';

const useForm = () => {

    const [name, setName] = useState(settings.name);
    const [duration, setDuration] = useState(settings.duration);
    const [dish, setDish] = useState(settings.dish);
    const [noOfSlices, setNoOfSlices] = useState(settings.noOfSlices);
    const [diameter, setDiameter] = useState(settings.diameter);
    const [spicinessScale, setSpicinessScale] = useState(settings.spicinessScale);
    const [slicesOfBread, setSlicesOfBread] = useState(settings.slicesOfBread);

    const conditionalStates = {
        noOfSlices: noOfSlices,
        setNoOfSlices: setNoOfSlices,
        diameter: diameter,
        setDiameter: setDiameter,
        spicinessScale: spicinessScale,
        setSpicinessScale: setSpicinessScale,
        slicesOfBread: slicesOfBread,
        setSlicesOfBread: setSlicesOfBread,
    }

    const resetAllConditionalValues= () => {
        setNoOfSlices(settings.noOfSlices);
        setDiameter(settings.diameter);
        setSpicinessScale(settings.spicinessScale);
        setSlicesOfBread(settings.slicesOfBread);
    }

    const onSubmit = e => {
        e.preventDefault();

        const contactAPI = (url, options) => {
            
            fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                    .then(text => {
                        for(let key in text){
                            throw new Error(`${key} ${text[key]}`) 
                        }
                    })
                 } else {
                    return res.json();
                }    
            })
            .catch(err => {
                console.log(err);
              });
        }

        let valid = true; 

        const payload = {
            name: name,
            preparation_time: duration,
            type: dish,
        }

        if (dish === PIZZA) {
            payload.no_of_slices = noOfSlices;
            payload.diameter = diameter;
        } else if (dish === SOUP) {
            payload.spiciness_scale = spicinessScale;
        } else if (dish === SANDWICH) {
            payload.slices_of_bread = slicesOfBread;
        }


        for (let data in payload) {
            if (payload[data] === null || payload[data] === '') {
                valid = false; 
            }
        }

        if (valid) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            }

            contactAPI('https://frosty-wood-6558.getsandbox.com:443/dishes', options);

        } else {
            alert('Wszystkie pola musza byc uzupelnione');
        }
    } 

    return {name, duration, dish, noOfSlices, diameter, spicinessScale, slicesOfBread,
            setName, setDuration, setDish, setNoOfSlices, setDiameter,
            setSpicinessScale, setSlicesOfBread, conditionalStates, resetAllConditionalValues, onSubmit}

}

export default useForm;