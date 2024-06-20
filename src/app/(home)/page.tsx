const axios = require('axios');

const getData = async () => {
  const response = await axios.get('http://localhost:3333/api/service')
  return response.data
}

type service = {
  id: string,
  barbershopId: string,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
}

export default async function Home() {
  const getServices = await getData();
  console.log({ getServices });


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {getServices.map((item: service) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </main>
  );
}
