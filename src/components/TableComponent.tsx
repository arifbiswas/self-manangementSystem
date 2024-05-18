"use client";
import { ICollection, IColums } from "@/app/(serverSetupLayout)/setup/page";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { CustomModal } from "./CustomModal";
import axios from "axios";
import toast from "react-hot-toast";
import {
  useDeletePostMutation,
  useGetRowsQuery,
  useSaveNewPostMutation,
  useUpdatePostMutation,
} from "@/redux/feature/rows";
import { resourceLimits } from "worker_threads";
import LoadingPage from "@/app/loading";

const TableComponent = ({ collection }: any) => {
  const { data: rows, isLoading, isSuccess } = useGetRowsQuery(collection?._id);
  const [saveNewPost, postResults] = useSaveNewPostMutation();
  const [updatePost, updateResults] = useUpdatePostMutation();
  const [daletePost, deleteResults] = useDeletePostMutation();
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [row, setRow] = useState({
    collection_id: collection?._id,
  });
  const [selectItem, setSelectItem] = useState<any>({
    _id: "",
  });

  const addAndUpdateRow = async (rowData: any) => {
    if (rowData?._id) {
      updatePost(rowData).then((result) => {
        // console.log(result);
        result.data?.success
          ? toast.success(result.data?.message)
          : toast.error("error");
        setUpdateModal(false);
      });
    } else {
      if (!rowData.collection_id) {
        row.collection_id = collection?._id;
      }
      saveNewPost(rowData).then((result) => {
        result.data?.success
          ? toast.success(result.data?.message)
          : toast.error("error");
        setModal(false);
      });

      setModal(false);
    }
  };
  const deleteRow = async (id: string) => {
    const result = window.confirm("Are you sure remove this row");
    if (!result) {
      return;
    }
    daletePost(id).then((result) => {
      result.data?.success
        ? toast.success("Row deleted successfully")
        : toast.error("error");
      setUpdateModal(false);
    });
  };

  if (isLoading && !isSuccess) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-5 pt-5  w-full flex-1 ">
      <div key={collection?.id} className="mx-auto  ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden w-full ">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              {/* <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    placeholder=" /Search"
                    required
                  />
                </div>
              </form> */}
            </div>
            <div
              onClick={() => setModal(!modal)}
              className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                type="button"
                className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add product
              </button>
            </div>
          </div>
          <div className="max-h-[82vh] max-w-[90vw] md:w-[90vw] lg:w-full xl:w-full no-scrollbar overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {collection?.colums?.map((colum: IColums) => (
                    <th key={colum.id} scope="col" className="px-4 py-3">
                      {colum.colum}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows?.rows?.map((a, i) => (
                  <tr
                    onClick={() => {
                      if (a) {
                        setSelectItem(a);
                      }
                      setUpdateModal(!updateModal);
                    }}
                    key={i}
                    className="border-b dark:border-gray-700 hover:dark:bg-gray-700"
                  >
                    {collection?.colums?.map((cols: any) => (
                      <td key={cols?.id} className="px-4 py-3">
                        {cols.type === "serial"
                          ? i + 1
                          : cols.colum
                          ? cols.colum && a && a[cols.colum]
                          : "empty"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CustomModal openModal={modal} setOpenModal={setModal}>
          <>
            <Modal.Header>{collection?.title}</Modal.Header>
            <Modal.Body className="space-y-5 ">
              {collection?.colums.map((col: IColums) => (
                <div key={col.id}>
                  {col.type !== "serial" && (
                    <>
                      {col.type === "option" ? (
                        <select
                          onChange={(e) =>
                            setRow({ ...row, [col.colum]: e.target.value })
                          }
                          className="mt-2  px-4  dark:bg-gray-700 outline-none border-none rounded-t-lg border-b border-gray-600 dark:text-gray-200 text-gray-800"
                        >
                          {col?.option?.map((opt, index) => (
                            <option key={index}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <FloatingLabel
                          variant="outlined"
                          // name={col.colum}
                          className="dark:bg-gray-800"
                          label={col.colum}
                          onChange={(e) =>
                            setRow({ ...row, [col.colum]: e.target.value })
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer className="flex  justify-end">
              <Button onClick={() => setModal(!modal)} color="failure">
                Cancel
              </Button>
              <Button onClick={() => addAndUpdateRow(row)}>Add New</Button>
            </Modal.Footer>
          </>
        </CustomModal>
        {/* update  */}
        <CustomModal openModal={updateModal} setOpenModal={setUpdateModal}>
          <>
            <Modal.Header>{collection?.title}</Modal.Header>
            <Modal.Body className="space-y-5 ">
              {collection?.colums.map((col: IColums) => (
                <div key={col.id}>
                  {col.type !== "serial" && (
                    <>
                      {col.type === "option" ? (
                        <select
                          onChange={(e) =>
                            setSelectItem({
                              ...selectItem,
                              [col.colum]: e.target.value,
                            })
                          }
                          className="mt-2  px-4  dark:bg-gray-700 outline-none border-none rounded-t-lg border-b border-gray-600 dark:text-gray-200 text-gray-800"
                        >
                          {col?.option?.map((opt, index) => (
                            <option key={index}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <FloatingLabel
                          variant="outlined"
                          // name={col.colum}
                          className="dark:bg-gray-800"
                          label={col.colum}
                          value={col.colum && selectItem?.[col.colum]}
                          onChange={(e) =>
                            setSelectItem({
                              ...selectItem,
                              [col.colum]: e.target.value,
                            })
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer className="flex flex-wrap gap-2 justify-between">
              <Button
                onClick={() => selectItem?._id && deleteRow(selectItem._id)}
                color="failure"
                className="text-xs"
              >
                <HiTrash size={20} />
              </Button>
              <div className="flex flex-wrap gap-2 ">
                <Button
                  onClick={() => setUpdateModal(!updateModal)}
                  color="failure"
                >
                  Cancel
                </Button>
                <Button onClick={() => addAndUpdateRow(selectItem)}>
                  Update
                </Button>
              </div>
            </Modal.Footer>
          </>
        </CustomModal>
      </div>
    </div>
  );
};

export default TableComponent;
