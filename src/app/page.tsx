'use client';

import Image from 'next/image';
import Navbar from './components/Navbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

// `https://api.openweathermap.org/data/2.5/find?q=agadir&appid=9341fec62fbb53b2c093b49453806797&cnt=2`
interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],

    queryFn: async () => {
      const { data } = await axios.get(
        'https://api.openweathermap.org/data/2.5/find?q=agadir&appid=9341fec62fbb53b2c093b49453806797&cnt=2'
      );
      return data;
    },
    // fetch(
    //   'https://api.openweathermap.org/data/2.5/find?q=agadir&appid=9341fec62fbb53b2c093b49453806797&cnt=2'
    // ).then((res) => res.json()),
  });

  if (isPending) return 'Loading...';
  console.log('DAAAATA', data);
  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
    </div>
  );
}
