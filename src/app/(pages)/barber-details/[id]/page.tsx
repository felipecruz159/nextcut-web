import BarberInfo from "./_components/barber-info";

const BarberDetails = ({ params }: { params: { id: string } }) => {
   return (
      <>
         <div className="max-w-screen-md m-auto">
            <BarberInfo params={params} />
         </div>
      </>
   );
};

export default BarberDetails;
