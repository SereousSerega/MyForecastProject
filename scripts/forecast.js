class Forecast {
    container
    directory
    items = [];
    isOpen = true;

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
                <span>${v2}</span> <br>
                <span>${v3}</span>
            </div>
            <div><img src="${v4}" alt="weather"></div>
        </div>
        `,

        headder: `
            <header header class= "forecast_header roboto-bold f_24" > OpenWeather Forecast</header>
        `,

        footer: `
        <footer footer class = "forecast_footer roboto-bold f_24" ></footer>
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
    }

    constructor() {
        // document.body.insertAdjacentHTML("beforeend", this.structure.container)
        this.createForecast()
    }

    createForecast() {
        this.container = document.createElement('div');
        this.container.id = "forecastContainer"
        this.container.className = "forecast_container roboto-regular"

        this.container.insertAdjacentHTML('beforeend', this.structure.headder)

        this.directory = document.createElement('div');
        this.directory.className = 'forecast_directory'
        
        this.container.append(this.directory)


        // this.directory.insertAdjacentHTML('beforeend', this.structure.loading);
        // this.directory.insertAdjacentHTML('beforeend', "<h2>Loading...</h2>")

        this.container.insertAdjacentHTML('beforeend', this.structure.footer)

        document.body.append(this.container)
        console.log(this.container)
        console.log(this.directory)
    }

    createItem(v1, v2, v3, v4) {
        const itemHtml = this.structure.item(v1, v2, v3, v4);
        this.directory.insertAdjacentHTML('beforeend', itemHtml);
        this.items.push(itemHtml);
    }
}

const forecast = new Forecast()

export { forecast }