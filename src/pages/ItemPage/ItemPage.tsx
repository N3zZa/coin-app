import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';

type PriceData = {
  time: string;
  priceUsd: number;
};

const ItemPage: React.FC = () => {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1');
        const priceData = response.data.data.map((entry: any) => ({
          time: new Date(entry.time).toLocaleDateString(),
          priceUsd: parseFloat(entry.priceUsd),
        }));
        console.log(priceData)
        setData(priceData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-96 p-4">
      <h1 className="text-xl font-bold mb-4">Bitcoin Price Chart (Daily)</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemPage;
