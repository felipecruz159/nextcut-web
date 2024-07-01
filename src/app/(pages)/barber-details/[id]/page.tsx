import BarberInfo from "./_components/barber-info";

const BarberDetails = ({ params }: { params: { id: string } }) => {

   return (
      <>
         <BarberInfo params={params?.id} />
      </>
   );
}

export default BarberDetails;