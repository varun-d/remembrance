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
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded">
        {children}
        <Button variant="ghost" onClick={requestClose} type="button">
          Cancel
        </Button>
      </div>
    </div>
  );
}
