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
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded">
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
