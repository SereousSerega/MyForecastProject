import { forecastService } from './forecastService.js'

class Forecast {
    container
    directory
    items = [];
    weekItem
    isOpen = true;
    metric = '°C'
    metricBtn

    structure = {
        container: `
        <div class="forecast_container roboto-regular" id="forecastContainer">

        <header class="forecast_header roboto-bold f_24">OpenWeather Forecast</header>

        <div class="forecast_directory">

            <div class="forecast_list">
                <div class="f_24">Kyiv</div>
                <div>
                    <span>4</span> <br>
                    <span>overcast clouds</span>
                </div>
                <div><img src="" alt="weather"></div>
            </div>
            
        </div>

        <!-- <div class="forecast_list">
            <div class="f_24">Kyiv</div>
            <div>
                <span>4</span> <br>
                <span>overcast clouds</span>
            </div>
            <div><img src="" alt="weather"></div>
        </div> -->
        <footer class="forecast_footer roboto-bold f_24"></footer>
    </div>
        `,
        item: (v1, v2, v3, v4) => `
        <div class="forecast_list">
            <div class="f_24">${v1}</div>
            <div>
                <span>${v2} ${this.metric}</span> <br>
                <span>${v3}</span>
            </div>
            <div><img src="${v4}" alt="weather"></div>
        </div>
        `,

        headder: `
            <header header class= "forecast_header roboto-bold f_24" > OpenWeather Forecast</header>
        `,

        footer: () => `
        <footer class = "forecast_footer roboto-bold f_24" ><button class="metric-toggle-btn"></button></footer>
    </div >
    `,

        directory: `
    <div div class="forecast_directory" ></div >
        `,

        loading: `
        <div div class="forecast_list" >
                <div class="f_24">Loading...</div>
                <div>
                    <span></span> <br>
                    <span></span>
                </div>
                <div></div>
            </div >
    `,

        weekItem: (date, temp, condition, icon,) => `
            <tr>
                <td>${date}</td>
                <td>${temp} ${this.metric}</td>
                <td>${condition}</td>
                <td><img src="${icon}" alt="weather"></td>
            </tr>
        `
    }

    constructor() {
        this.createForecast()
        forecastService.getAllWeatherData();
    }

    createForecast() {

        this.container = document.createElement('div');
        this.container.id = "forecastContainer"
        this.container.className = "forecast_container roboto-regular"

        this.container.insertAdjacentHTML('beforeend', this.structure.headder)

        this.directory = document.createElement('div');
        this.directory.className = 'forecast_directory'

        this.container.append(this.directory)



        this.container.insertAdjacentHTML('beforeend', this.structure.footer())

        this.metricBtn = this.container.querySelector('.metric-toggle-btn');
        this.metricBtn.addEventListener('click', () => this.toggleMetric());

        document.body.append(this.container)
        console.log(this.container)
        console.log(this.directory)
    }

    createItem(v1, v2, v3, v4) {

        if (this.metric == '°F') {
            v2 = this.convertToFahrenheit(v2)
        }

        const itemHtml = document.createElement('div');

        itemHtml.innerHTML = this.structure.item(v1, v2, v3, v4);

        itemHtml.addEventListener('click', () => this.createWeekItem(v1));

        this.directory.appendChild(itemHtml);

        this.items.push(itemHtml);
    }

    async createWeekItem(city) {
        this.hideItems()
        console.warn(city)
        
        let itemHtml = document.createElement('div')
        itemHtml.className = 'forecast_week'
        itemHtml.innerHTML += `<h2>${city}</h2>`
        let itemTable = document.createElement('table')
        itemHtml.append(itemTable)
        let itemTbody = document.createElement('tbody')
        itemTable.append(itemTbody)

        itemHtml.addEventListener('click', () => this.showItems());

        await forecastService.requestWeek(city)
            .then((obj) => {
                

                obj.forEach(item => {

                    if (this.metric == '°F') {
                        item.temp = this.convertToFahrenheit(item.temp)
                    }
                    itemTbody.innerHTML += this.structure.weekItem(item.date, item.temp, item.description, `https://openweathermap.org/img/wn/${item.icon}.png`);
                });
            })


        this.weekItem = itemHtml
        this.directory.appendChild(itemHtml);


    }

    hideItems() {
        this.items.forEach(item => {
            console.log(item)
            item.remove()
        });
    }

    showItems() {
        if (this.weekItem) {
            this.weekItem.remove()
        }
        forecastService.getAllWeatherData()
    }
    toggleMetric() {
        if (this.metric === '°C') {
            this.metric = '°F';
        } else {
            this.metric = '°C';
        }
        
        this.hideItems()
        this.showItems()
    }
    convertToFahrenheit(celsius) {
        let c = (celsius * 9/5) + 32;
        return parseFloat(c.toFixed(1));
    }
}

const forecast = new Forecast()

export { forecast }