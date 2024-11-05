import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// TODO: Create the user's booking history
export const History = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estabelecimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="whitespace-nowrap">
            <TableCell className="font-medium">NextBarber</TableCell>
            <TableCell>Pago</TableCell>
            <TableCell>05/11/2024</TableCell>
            <TableCell>Dinheiro</TableCell>
            <TableCell>Barba + Cabelo</TableCell>
            <TableCell className="text-right">R$70.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default History;
