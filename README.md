# Weather Forecasting Application
+ Demo: https://amberpark.site/weather/

  
### **Overview:**
The project encompasses a comprehensive weather forecasting application website designed to deliver crucial meteorological insights. Core functionalities include real-time data for the current date, present weather conditions, and a 5-day forecast, leveraging an Open API for accurate and up-to-date information. The platform intuitively presents the lowest and highest temperatures for the current day and forecasts for the next 5 days.

Additionally, users can input their desired location into an input box, prompting the system to dynamically display the current weather and extended forecasting details for the specified location. This approach enhances user experience by providing personalized and location-specific weather information. The application aims to offer a seamless and informative interface for users seeking reliable weather forecasts.

### **Development Goals:** 
Enhancing Proficiency in Promise Chaining and Open API integration, and utilizing date lLibraries.

### **Sills:** 
+ HTML
+ CSS
+ React.js
+ Styled Components

-------
+ **Challenges:**

Resolving Callback Hell and crafting intuitive yet simple code

+ **Solutions:**

Leveraging Promises and introducing Async/Await patterns

-------
### **Advanced Feature:** 
+ 5-day Forecast
![forecast](https://github.com/ParkAmber/frontend-portfolio-weather/blob/main/forecast.png)


       useEffect(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            axios
              .get(currentUrl)
              .then((res) => {
                setCurrentWeather(res.data);
                if (!weatherMainList.includes(res.data?.weather[0]?.main)) {
                  setWeather("Clear");
                } else {
                  setWeather(res.data?.weather[0]?.main);
                }
                return axios.get(forecastUrl);
              })
              .then((res) => {
                setResult(res.data);
              });
          });
        }, []);

        const searchWeather = async () => {
          if (locationInput === "") {
            alert("please enter location");
            return;
          }
          try {
            const data = await axios({
              method: "get",
              url: url,
            });
            setResult(data.data);
            setCurrentCity(data.data?.city?.name);
            setCurrentCountry(data.data?.city?.country);
      
            const data2 = await axios.get(specificLocationUrl);
            setCurrentWeather(data2.data);
            if (!weatherMainList.includes(data2.data?.weather[0]?.main)) {
              setWeather("Clear");
            } else {
              setWeather(data2.data?.weather[0]?.main);
            }
          } catch (err) {
            alert(err);
          }
        };
