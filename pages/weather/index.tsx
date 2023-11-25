import axios from "axios";
import Head from "next/head";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import * as S from "../../styles/Main.styles";
import moment from "moment";
interface Coordinates {
  latitude: number;
  longitude: number;
}
const weatherAPiKey = process.env.NEXT_PUBLIC_WEATHER_APP;
const weatherAPiKeyLatLon = process.env.NEXT_PUBLIC_WEATHER_Lat_Lon;
export default function WeatherApp() {
  const [currentCity, setCurrentCity] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [weather, setWeather] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [result, setResult] = useState<any>();

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&appid=${weatherAPiKey}`;
  const [currentWeather, setCurrentWeather] = useState<any>();

  const weatherMainList = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Fog",
    "Mist",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPiKeyLatLon}`
        )
        .then((res) => {
          // console.log(res.data);
          setCurrentWeather(res.data);
          if (!weatherMainList.includes(res.data?.weather[0]?.main)) {
            setWeather("Clear");
            // console.log("weather is clear");
          } else {
            setWeather(res.data?.weather[0]?.main);
            // console.log("weather is res.data?.weather[0]?.main");
          }

          // console.log(`weather: ${res.data?.weather[0]?.main}`);
          return axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${res.data.name}&appid=${weatherAPiKey}`
          );
        })
        .then((res) => {
          // console.log(res.data);
          setResult(res.data);
        });
    });
    // console.log(weatherAPiKey, weatherAPiKeyLatLon);
  }, []);

  // const searchWeather = async (e: KeyboardEvent<HTMLInputElement>) => {
  const searchWeather = async () => {
    if (locationInput === "") {
      alert("please enter location");
      return;
    }
    // if (e.key === "Enter") {
    try {
      const data = await axios({
        method: "get",
        url: url,
      });
      setResult(data.data);
      setCurrentCity(data.data?.city?.name);
      setCurrentCountry(data.data?.city?.country);

      // console.log(data.data);
      const data2 = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.data.city.coord.lat}&lon=${data.data.city.coord.lon}&appid=${weatherAPiKeyLatLon}`
      );
      // console.log(data2.data);
      setCurrentWeather(data2.data);
      if (!weatherMainList.includes(data2.data?.weather[0]?.main)) {
        setWeather("Clear");
        // console.log("weather is clear22");
      } else {
        setWeather(data2.data?.weather[0]?.main);
        // console.log("weather is res.data?.weather[0]?.main22");
      }
    } catch (err) {
      alert(err);
    }
    // }
  };

  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) =>
    setLocationInput(e.target.value);

  const dt = currentWeather?.dt;
  const timezone = currentWeather?.timezone;

  // Convert Unix timestamp to milliseconds and adjust for the timezone offset
  const adjustedTimestamp = (dt + timezone) * 1000;

  // Create a Date object using the adjusted timestamp
  const date = new Date(adjustedTimestamp);

  function formatDate(dateString: string) {
    const date = moment(dateString);
    const formattedHours = date.format("h");
    const ampm = date.format("a");
    // console.log(`${formattedHours}${ampm}`);
    return `${formattedHours}${ampm}`;
  }

  const formattedHour = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      timeZone: "UTC",
    })
    .split(" ");

  const ampm = date
    .toLocaleTimeString("en-US", {
      hour12: true,
      timeZone: "UTC",
    })
    .split(" ");
  // console.log(formattedHour[0]);
  const getPartOfDay = (hour: number, ampm: string) => {
    // console.log(hour, ampm);
    if (hour >= 1 && hour < 7 && ampm === "AM") {
      return "dawn";
    } else if (hour >= 7 && hour < 12 && ampm === "AM") {
      return "morning";
    } else if (hour >= 7 && hour <= 11 && ampm === "PM") {
      return "night";
    } else if (hour === 12 && ampm === "AM") {
      return "night";
    } else if (hour === 12 && ampm === "PM") {
      return "afternoon";
    } else {
      return "afternoon";
    }
  };
  const partOfDay = getPartOfDay(Number(formattedHour[0]), ampm[1]);
  // const [weather, setWeather] = useState(currentWeather?.weather[0]?.main);
  const currentWeatherDate = moment(currentWeather?.dt * 1000);

  return (
    <>
        <Head>
        <meta property='og:title' content='weather forecast website portfolio' />
        <meta
          property='pg:description'
          content='Hello this is weather forecast website portfolio page'
        />
        <meta
          property='og:image'
          content='https://storage.googleapis.com/webportfolio-backend-storage/weather-preview.png'
        />
        <link rel='icon' href='/logo2.png' />
      </Head>
      <S.Wrapper partOfDay={partOfDay} weather={weather || "Clear"}>
        <S.WrapperContent>
          {currentWeather && (
            <S.CurrentWeather>
              <div>
                <S.CurrentWeatherH1>
                  {" "}
                  {Math.round((currentWeather?.main?.temp - 273.15) * 10) / 10}
                  {/* {currentTemp} */}
                  <span> °C</span>
                </S.CurrentWeatherH1>
                <S.CurrentWeatherH2>
                  <span>{currentWeather?.name},</span>
                  <span>{currentWeather?.sys?.country}</span>
                </S.CurrentWeatherH2>

                <S.CurrentWeatherP>
                  <span>
                    {currentWeatherDate.format("dddd")}, &nbsp;
                    {/* {currentWeather?.dt} */}
                  </span>
                  <span>
                    {currentWeatherDate.format("Do")}, &nbsp;
                  </span>
                  <span>
                    {" "}
                    {/* {monthNames[new Date(result?.list?.[0].dt_txt).getMonth()]} */}
                    {moment(result?.list?.[0].dt_txt).format("MMMM")}
                  </span>
                </S.CurrentWeatherP>
              </div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <S.CurrentWeatherInput
                  placeholder='Search Location'
                  // value={location}
                  onChange={onChangeLocation}
                  type='text'
                  // onKeyDown={searchWeather}
                />{" "}
                <S.SearchBtnCon>
                  <S.SearchBtn
                    src='/icons/search.png'
                    onClick={searchWeather}
                  />
                </S.SearchBtnCon>
                {/* <button className='fa fa-search' type='submit'></button> */}
              </div>
              {/* </S.CurrentWeatherCon> */}
            </S.CurrentWeather>
          )}
          {result ? (
            <S.ForecastWeather>
              <S.ForecastWeatherH1>Forecast</S.ForecastWeatherH1>
              <S.ForecastWeatherCon>
                <S.ForecastToday>
                  {result?.list?.slice(0, 4).map((el: any, i: number) => (
                    <S.TodayIcon key={i}>
                      <S.TodayIconH2>{formatDate(el.dt_txt)}</S.TodayIconH2>
                      <div>
                        <S.TodayIConImage
                          src={`/icons/${el.weather[0].main}.png`}
                        />
                      </div>
                    </S.TodayIcon>
                  ))}{" "}
                </S.ForecastToday>
                <div>
                  {new Array(5).fill(0).map((a, i) => (
                    <S.ForecastIconCon key={i}>
                      <S.ForecastIconP>
                        {moment(result?.list?.[i * 8].dt_txt).format("ddd")}
                      </S.ForecastIconP>

                      <div>
                        <S.ForecastIconImage
                          src={`/icons/${
                            result?.list?.[i * 8].weather[0].main
                          }.png`}
                        />
                      </div>
                      <S.ForecastIconP>
                        {/* Min:{" "} */}
                        {Math.round(
                          (result?.list?.[i * 8].main.temp_min - 273.15) * 10
                        ) / 10}
                        °C
                      </S.ForecastIconP>
                      <S.ForecastIconP>
                        {/* Max:{" "} */}
                        {Math.round(
                          (result?.list?.[i * 8].main.temp_max - 273.15) * 10
                        ) / 10}
                        °C
                      </S.ForecastIconP>
                      {/* </S.ForecastIcon> */}
                    </S.ForecastIconCon>
                  ))}
                </div>
                {/* <div>User's address: {userAddress}</div> */}
              </S.ForecastWeatherCon>
            </S.ForecastWeather>
          ) : (
            <h1 style={{ color: "#fff" }}>LOADING...</h1>
          )}
        </S.WrapperContent>
        <div>
          {result && (
            <S.Footer>
              <div>
                <S.FooterLink
                  target='_blank'
                  href='https://icons8.com/icon/41144/cloud-lightning'>
                  Thunderstorm
                </S.FooterLink>{" "}
                <S.FooterLink target='_blank' href='https://icons8.com'>
                  icon by Icons8
                </S.FooterLink>
              </div>
              <div>
                <S.FooterLink
                  target='_blank'
                  href='https://icons8.com/icon/7358/light-rain'>
                  Drizzle
                </S.FooterLink>{" "}
                <S.FooterLink target='_blank' href='https://icons8.com'>
                  icon by Icons8
                </S.FooterLink>
              </div>
              <div>
                <S.FooterLink
                  target='_blank'
                  href='https://icons8.com/icon/648/sun'>
                  Sun
                </S.FooterLink>{" "}
                <S.FooterLink target='_blank' href='https://icons8.com'>
                  icon by Icons8
                </S.FooterLink>
              </div>
              <div>
                <S.FooterLink
                  target='_blank'
                  href='https://icons8.com/icon/1E11WDDBLkSt/light-snow'>
                  Snow
                </S.FooterLink>{" "}
                <S.FooterLink target='_blank' href='https://icons8.com'>
                  icon by Icons8
                </S.FooterLink>
              </div>
              <div>
                <S.FooterLink
                  target='_blank'
                  href='https://icons8.com/icon/656/rain'>
                  Rain
                </S.FooterLink>{" "}
                <S.FooterLink target='_blank' href='https://icons8.com'>
                  icon by Icons8
                </S.FooterLink>
              </div>
              <div>
                <S.FooterLink
                  target='_blank'
                  href='https://icons8.com/icon/650/clouds'>
                  Clouds
                </S.FooterLink>{" "}
                <S.FooterLink target='_blank' href='https://icons8.com'>
                  icon by Icons8
                </S.FooterLink>
              </div>
            </S.Footer>
          )}
        </div>
      </S.Wrapper>
    </>
  );
}
