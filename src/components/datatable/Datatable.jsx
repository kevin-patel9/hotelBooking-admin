import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config";
import { useEffect } from "react";

const Datatable = ({ columns }) => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  const { data, loading, refetchData } = useFetch();

  useEffect(() => {
    refetchData(`/${path}`);
  },[path])

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/${path}/${id}`);
      refetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            {path == "user" ? (
              <Link
                to="/admin/user/test"
                state={params.row._id}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="viewButton"
                >
                  View
                </button>
              </Link>
            ) : (
              ""
            )}
            <button
              disabled={path == "room"}
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/admin/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <h4 className="loading">Loading... </h4>
      ) : (
        <>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={columns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row.id}
          />
        </>
      )}
    </div>
  );
};

export default Datatable;
