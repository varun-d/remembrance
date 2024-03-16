import { IconSquareRoundedX } from "@tabler/icons-react";

interface propsInterface {
  requestClose: () => void;
  children?: React.ReactNode;
}

export default function AddEventOverlay({
  requestClose,
  children,
}: propsInterface) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-10">
      <div className="bg-white p-8 rounded w-4/5 md:w-1/2 lg:w-1/4">
        <div className="relative">
          <IconSquareRoundedX
            className="absolute -top-6 -right-5 m-1 text-red-800 hover:text-red-700 cursor-pointer"
            size={24}
            onClick={requestClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
