import { forecast } from './forecast.js';

class ForecastService {
    #url = "https://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f"
    #APIKey = 'c570d99a7b10772384d733cb0c7e08d5'

    codes = [
        703448,
        2643743,
        5128638,
    ]
    
    constructor() {
        
        this.codes.forEach(code => {
            this.requestWeather(code);
        });

        // this.requestWeather(703448);
        
        
    }

    requestWeather(code) {

        let url = `https://api.openweathermap.org/data/2.5/weather?id=${code}&appid=${this.#APIKey}`

        fetch(url)
            .then((request) => {
                console.log(request)
                if (!request.ok) {
                    throw new Error("Da suka!");
                    
                }

                return request.json()

            })
            .then((json) => {
                console.log(json)

                let f = json

                forecast.createItem(f.name, f.main.temp, f.weather[0].description, `https://openweathermap.org/img/wn/${f.weather[0].icon}.png`)
            })
            .catch((err)=>{
                console.warn(err.message)
            })
    }
}

const forecastService = new ForecastService()

export { forecastService }