"use client";
import React, { useEffect, useState } from "react";
import {
  useDeletePostMutation,
  useGetCollectoinsQuery,
  useSaveNewPostMutation,
  useUpdatePostMutation,
} from "@/redux/feature/collections";
import axios from "axios";
import { Button, FloatingLabel, Tabs, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
import LoadingPage from "../loading";

export interface ICollection {
  _id?: string;
  id: number;
  title: string;
  colums: Array<IColums>;
}

export interface IColums {
  id: number;
  colum: string;
  type: string;
  option?: Array<any>;
}

const SetupPage = () => {
  const { isLoading, isFetching } = useGetCollectoinsQuery("");
  const [saveNewPost] = useSaveNewPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [collection, setCollection] = useState<Array<ICollection>>([]);

  const addNewCollection = () => {
    setCollection([
      ...collection,
      {
        id: collection.length !== 0 ? collection.slice(-1)![0]?.id + 1 : 1,
        title: `collection${collection.length + 1}`,
        colums: [{ id: 1, colum: "colum1", type: "text" }],
      },
    ]);
  };

  const removeCollection = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this collection? If you remove this collection when delete all rows from the database this collections"
      )
    ) {
      deletePost(id).then((res) => {
        if (res.data?.success) {
          setCollection(collection.filter((c) => c._id !== id));
          toast.success("Collection deleted successfully");
        } else {
          toast.error("Failed to delete collection");
        }
      });
    }
  };

  const addNewColum = (id: number) => {
    const fc = collection.find((c) => c.id === id);
    const withOutFC = collection.filter((c) => c.id !== id);
    if (fc) {
      fc.colums.push({
        id: fc.colums.length + 1,
        colum: `colum${fc.colums.length + 1}`,
        type: "text",
        option: [],
      });
      setCollection([...withOutFC, fc]);
      // ... rest of your code
    }
  };

  const removeColum = (cid: number, did: number) => {
    if (window.confirm("Are you sure you want to remove this column?")) {
      const updatedCollection = collection.map((c) => {
        if (c.id === cid) {
          c.colums = c.colums.filter((col) => col.id !== did);
        }
        return c;
      });
      setCollection(updatedCollection);
    }
  };

  const saveCollections = async (data: ICollection) => {
    if (data._id) {
      updatePost(data).then((result) => {
        if (result.data?.success) {
          toast.success(result.data?.message);
        } else {
          toast.error("Failed to update collection");
        }
      });
    } else {
      saveNewPost(data).then((result) => {
        if (result.data?.success) {
          toast.success(result.data?.message);
        } else {
          toast.error("Failed to save new collection");
        }
      });
    }
  };

  useEffect(() => {
    axios.get("/api/collections").then((res) => {
      // console.log(res);
      if (res.data?.success) {
        setCollection(res.data?.collections);
      }
    });
  }, [isFetching, isLoading]);

  // console.log(collection);

  return (
    <div className="p-10">
      {collection
        ?.sort((a, b) => a.id - b.id)
        ?.map((c) => (
          <div
            key={c.id}
            className="flex justify-center gap-3 items-center flex-col my-5 dark:bg-gray-700 bg-gray-200 p-4 shadow-md"
          >
            <h1 className="text-gray-800 dark:text-gray-300">{c.title}</h1>
            <div className="min-w-[60%]">
              <FloatingLabel
                variant="filled"
                label="Title"
                value={c.title}
                onChange={(e) => {
                  const updatedCollection = collection.map((cl) =>
                    cl._id === c._id ? { ...cl, title: e.target.value } : cl
                  );
                  setCollection(updatedCollection);
                }}
              />
              <Tabs aria-label="Pills" style="pills">
                {c.colums.map((item, i) => (
                  <Tabs.Item
                    key={i}
                    active
                    title={item.colum || `colum ${c.colums.length}`}
                  >
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <FloatingLabel
                        variant="filled"
                        value={item.colum}
                        label="colum"
                        onChange={(e) => {
                          const updatedCollection = collection.map((cl) => {
                            if (cl._id === c._id) {
                              cl.colums[i].colum = e.target.value;
                            }
                            return cl;
                          });
                          setCollection(updatedCollection);
                        }}
                      />
                      <div className="flex gap-2 flex-wrap items-center justify-between">
                        <div className="flex gap-3 flex-wrap items-center">
                          <select
                            defaultValue={item.type}
                            onChange={(e) => {
                              const updatedCollection = collection.map((cl) => {
                                if (cl._id === c._id) {
                                  cl.colums[i].type = e.target.value;
                                }
                                return cl;
                              });
                              setCollection(updatedCollection);
                            }}
                            className="h-12 px-4 dark:bg-gray-700 outline-none border-none rounded-t-lg border-b border-gray-600"
                          >
                            <option value="text">text</option>
                            <option value="serial">serial</option>
                            <option value="number">number</option>
                            <option value="tel">telphone</option>
                            <option value="date">date</option>
                            <option value="time">time</option>
                            <option value="week">week</option>
                            <option value="option">option</option>
                            {/* <option value="checkbox">checkbox</option> */}
                          </select>
                          {/* <input type="week" name="" id="" /> */}
                          {item.type === "option" && (
                            <>
                              {item.option &&
                                item.option.map((p, ind) => (
                                  <TextInput
                                    key={ind}
                                    type="text"
                                    sizing="sm"
                                    className="w-20"
                                    value={p ? p : ""}
                                    onChange={(e) => {
                                      const updatedCollection = collection.map(
                                        (cl) => {
                                          if (cl._id === c._id) {
                                            cl.colums[i].option![ind] =
                                              e.target.value;
                                          }
                                          return cl;
                                        }
                                      );
                                      setCollection(updatedCollection);
                                    }}
                                  />
                                ))}
                              <Button
                                onClick={() => {
                                  const updatedCollection = collection.map(
                                    (cl) => {
                                      if (cl._id === c._id) {
                                        if (!cl.colums[i].option) {
                                          cl.colums[i].option = ["new"];
                                        }
                                        cl.colums[i].option!.push("new");
                                      }
                                      return cl;
                                    }
                                  );
                                  setCollection(updatedCollection);
                                }}
                                size="xs"
                                className="h-7 shadow-md"
                              >
                                Add Options
                              </Button>
                            </>
                          )}
                        </div>
                        <Button
                          onClick={() => removeColum(c.id, item.id)}
                          color="failure"
                          size="xs"
                          className="h-7 shadow-md"
                        >
                          Delete Column
                        </Button>
                      </div>
                    </div>
                  </Tabs.Item>
                ))}
              </Tabs>
              <div className="flex items-center flex-wrap md:flex-nowrap gap-2 justify-center">
                <Button
                  onClick={() =>
                    c._id
                      ? removeCollection(c._id)
                      : setCollection(collection.filter((cc) => cc.id !== c.id))
                  }
                  color="failure"
                  className="shadow-md w-60"
                >
                  Delete Collection
                </Button>
                <Button
                  onClick={() => addNewColum(c.id)}
                  className="w-full flex shadow-md"
                >
                  <HiPlus
                    size={20}
                    className="text-gray-200 dark:text-gray-200"
                  />
                  Add Column
                </Button>
                <Button
                  onClick={() => saveCollections(c)}
                  className="w-60 shadow-md"
                >
                  Save Collection
                </Button>
              </div>
            </div>
          </div>
        ))}
      <div className="flex flex-col justify-center items-center gap-5 md:flex-row">
        <Button onClick={addNewCollection} className="w-60 shadow-md">
          Add New Collection
        </Button>
      </div>
    </div>
  );
};

export default SetupPage;
