
const SubmittingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-medium">Spracovávame vaše výsledky...</p>
      </div>
    </div>
  );
};

export default SubmittingOverlay;
