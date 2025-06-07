import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFetch } from '../../hooks/useFetch'
import { useEffect } from "react";

const List = () => {

  const { data, loading, refetchData } = useFetch();

  useEffect(() => {
    // refetchData("/auth");
  },[])

  return (
    <TableContainer sx={{ maxHeight: 400 }} component={Paper} className="table">
     { loading ? "Loading..." : 
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Customer ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">City</TableCell>
            <TableCell className="tableCell">Phone Number</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
              <div className="cellWrapper">
                  <img src={row.img} alt="profile" className="image" />
                  {row.username}
                </div>
                </TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">{row.phone}</TableCell>
              <TableCell className="tableCell">Online Payment</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
    </TableContainer>
  );
};

export default List;
