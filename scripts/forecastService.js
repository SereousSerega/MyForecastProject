import { forecast } from './forecast.js';

class ForecastService {
    #url = "https://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f"
    #APIKey = 'c570d99a7b10772384d733cb0c7e08d5'

    cities = {
        Kyiv: 703448,
        London: 2643743,
        NewYork: 5128638,
    }

    codes = [
        703448,
        2643743,
        5128638,
        698740,
        756135,
        2950159,
        3128760
    ]

    constructor() {

        // this.getAllWeatherData();

    }

    async getAllWeatherData() {
        for (let code of this.codes) {
            await this.requestWeather(code);
        }
    }

    async requestWeather(code) {

        let url = `https://api.openweathermap.org/data/2.5/weather?id=${code}&lang=uk&units=metric&appid=${this.#APIKey}`

        await fetch(url)
            .then((request) => {
                console.log(request)
                if (!request.ok) {
                    throw new Error(request.status);

                }

                return request.json()

            })
            .then((json) => {
                console.log(json)

                let f = json

                forecast.createItem(f.name, f.main.temp, f.weather[0].description, `https://openweathermap.org/img/wn/${f.weather[0].icon}.png`)
            })
            .catch((err) => {
                console.warn(err.message)
            })
    }

    async requestWeek(city) {

        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=uk&units=metric&appid=c570d99a7b10772384d733cb0c7e08d5`
        let forecast = await fetch(url)
            .then((request) => {
                console.log(request)
                if (!request.ok) {
                    throw new Error(request.status);

                }

                return request.json()
            })
            .then((json) => {

                return json
            })
            .catch((err) => {
                console.warn(err.message)
            })

        const filteredData = forecast.list.filter(item => {
            const time = item.dt_txt.split(' ')[1];
            return time === '15:00:00'
        }).map(item => ({
            date: item.dt_txt.split(" ")[0],
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            pressure: item.main.pressure,
            humidity: item.main.humidity,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            wind_speed: item.wind.speed

        }));

        return filteredData
        console.log(filteredData);

    }

}

const forecastService = new ForecastService()

export { forecastService }