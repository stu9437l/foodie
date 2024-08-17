import { NextResponse } from 'next/server';

const errorHandler = (status: number, error: string) => {
  console.log({ status, error });
  return NextResponse.json(
    {
      error: error,
    },
    {
      status: status,
      statusText: error,
    }
  );
};

export { errorHandler };
