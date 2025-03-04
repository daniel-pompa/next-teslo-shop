import { FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export const ErrorComponent = ({ error, reset }: Props) => {
  return (
    <>
      <div className='max-w-[500px] w-full m-auto text-center p-8 rounded-md shadow-md border mt-36'>
        {/* Error icon */}
        <div className='flex justify-center mb-6'>
          <FaExclamationTriangle className='w-20 h-20 text-red-500' />
        </div>
        {/* Title */}
        <h2 className='font-bold mb-4'>Oops! Something went wrong.</h2>
        {/* Error message */}
        <p className='mb-6'>
          We apologize for the inconvenience. Please try again or contact support if the
          problem persists.
        </p>
        {/* Retry button */}
        <button
          onClick={reset}
          className='btn-primary flex items-center justify-center w-full gap-2'
        >
          <FaSyncAlt size={18} />
          Try again
        </button>
        {/* Additional information for developers (optional) */}
        <details className='mt-6 text-left'>
          <summary className='text-sm text-slate-500 cursor-pointer'>
            Error details
          </summary>
          <pre className='mt-2 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 overflow-x-auto'>
            {error.message}
          </pre>
        </details>
      </div>
    </>
  );
};
