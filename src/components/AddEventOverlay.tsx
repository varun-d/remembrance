import { IconSquareRoundedX } from "@tabler/icons-react";
import { Button } from "./ui/button";

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
      <div className="bg-white p-8 rounded w-4/5 md:w-1/2 lg:w-1/3">
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute -top-6 -right-5 m-1"
            onClick={requestClose}
          >
            <IconSquareRoundedX
              className="text-destructive hover:text-red-700"
              size={20}
            />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
