import { toast } from "react-toastify";
import { typeActionGetTables } from "../../../store/tables/getTables/actions";
import { apiTables } from "../../AxiosInstall";
import { typeActionCreateTables } from "../../../store/tables/createTable/actions";
import { typeActionUpdateTables } from "../../../store/tables/updateTable/actions";
import { typeActionDeleteTables } from "../../../store/tables/deleteTable/actions";
import { typeActionSetStatus } from "../../../store/tables/setStatus/actions";
const getAllTable = async (dispatch) => {
  dispatch(typeActionGetTables.fetchGetTableRequest());
  try {
    const res = await apiTables.getTable();
    if (res?.data?.success || res?.data?.data) {
      dispatch(typeActionGetTables.fetchGetTableSuccess(res?.data));
    }
  } catch (error) {
    dispatch(typeActionGetTables.fetchFailed(error));
    console.log(error, "<<<<<<<<<<<<<<<<<");
    toast.error(error?.response?.data?.status);
  }
};

const postTable = async (dispatch, tableName, setTableNumber) => {
  dispatch(typeActionCreateTables.fetchCreateTableRequest());
  try {
    const res = await apiTables.createTable(tableName);
    console.log(res.data, "[POST]");
    if (res?.data?.status) {
      dispatch(typeActionCreateTables.fetchCreateTableSuccess(res?.data));
      toast.success(res?.data?.status);
      setTableNumber("");
      await getAllTable(dispatch);
    }
  } catch (error) {
    dispatch(typeActionCreateTables.fetchCreateTableFailed(error));
    console.log(error, "<<<<<<<<<<<<<<<<<");
    toast.error(error?.response?.data?.status);
  }
};

const putTable = async (dispatch, id, tableNumber, setTableNumber) => {
  dispatch(typeActionUpdateTables.fetchUpdateTableRequest());
  try {
    const res = await apiTables.updateTable(id, tableNumber);
    if (res?.data?.status) {
      dispatch(typeActionUpdateTables.fetchUpdateTableSuccess(res?.data));
      toast.success(res?.data?.status);
      setTableNumber("");
      dispatch(typeActionSetStatus.setStatusTable(["create"]));
      await getAllTable(dispatch);
    }
  } catch (error) {
    dispatch(typeActionUpdateTables.fetchUpdateTableFailed(error));
    console.log(error, "<<<<<<<<<<<<<<<<<");
    toast.error(error?.response?.data?.status);
  }
};
const destroyTable = async (dispatch, id) => {
  dispatch(typeActionDeleteTables.fetchDeleteTableRequest());
  try {
    const res = await apiTables.deleteTable(id);
    if (res?.data?.status) {
      dispatch(typeActionDeleteTables.fetchDeleteTableSuccess(res?.data));
    }
  } catch (error) {
    dispatch(typeActionDeleteTables.fetchDeleteTableFailed(error));
    console.log(error, "<<<<<<<<<<<<<<<<<");
    toast.error(error?.response?.data?.status);
  }
};

export { getAllTable, postTable, putTable, destroyTable };
