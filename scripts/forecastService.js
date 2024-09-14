class ForecastService {
    #url = "https://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f"
    #APIKey = 'c570d99a7b10772384d733cb0c7e08d5'

    codes = {
        Kyiv: 703448,
        London: 2643743,
        NewYork: 5128638,
    }
    constructor() {
        this.requestWeather()
    }

    requestWeather() {

        let url = `https://api.openweathermap.org/data/2.5/weather?id=703448&appid=${this.#APIKey}`

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
            })
            .catch((err)=>{
                console.warn(err.message)
            })
    }
}

const forecastService = new ForecastService()

export { forecastService }