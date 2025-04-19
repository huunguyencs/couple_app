/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface UseFetchProps<T> {
  getService: (data?: any) => Promise<T[]>;
  postService?: (data: Omit<T, "id">) => Promise<T>;
  putService?: (id: number, data: Partial<T>) => Promise<T>;
  deleteService?: (id: number) => Promise<void>;
}

const useMutate = <T,>({
  getService,
  postService,
  putService,
  deleteService,
}: UseFetchProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (data?: any) => {
    setFetching(true);
    try {
      const response = await getService(data);
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setFetching(false);
    }
  };

  const createData = async (data: Omit<T, "id">) => {
    setSubmitting(true);
    try {
      await postService(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateData = async (id: number, data: Partial<T>) => {
    setSubmitting(true);
    try {
      await putService(id, data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteData = async (id: number) => {
    setDeleting(true);
    try {
      await deleteService(id);
    } catch (error) {
      setError(error as Error);
    } finally {
      setDeleting(false);
    }
  };

  return {
    data,
    fetching,
    submitting,
    deleting,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  };
};

export default useMutate;
